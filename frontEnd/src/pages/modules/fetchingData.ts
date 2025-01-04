import { store } from "@/src/states/store";
import { AxiosInstance } from "axios";
import {
  setAllUsersData,
  setBlockedData,
  setFriendsData,
} from "./setAuthenticationData";
import axios from "@/src/services/api/axios";
import refreshToken from "@/src/services/hooks/refreshToken";
import { AllUsersDataType } from "@/src/states/authentication/allUsersSlice";
import { UserDataType } from "@/src/states/authentication/userSlice";

export const sendFriendRequest = (
  axiosPrivateHook: AxiosInstance,
  username: string
) => {
  axiosPrivateHook
    .post("friend_req/", { username: username })
    .then((res) => {
      console.log("friend request sent to " + username);
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const removeFriend = (
  axiosPrivateHook: AxiosInstance,
  username: string,
  setUsers?: React.Dispatch<React.SetStateAction<AllUsersDataType[]>>
) => {
  axiosPrivateHook
    .delete("friends", { data: { username: username } })
    .then((res) => {
      console.log("remove Friend " + username + " ");
      console.log(res);
      setFriendsData(
        store
          .getState()
          .friends.value.filter((friend) => friend.username !== username)
      );
      setUsers &&
        setUsers((prev) =>
          prev.map((user) => {
            return user.username === username
              ? { ...user, is_friend: false }
              : user;
          })
        );
    })
    .catch((err) => {
      console.log(username);
      console.log(err);
    });
};
export type FriendRequestsType = UserDataType & { type: string };

interface FetchedData {
  created_at: string;
  from_user: FriendRequestsType;
  to_user: FriendRequestsType;
}

export async function getReceivedFriendRequests(
  axiosPrivateHook: AxiosInstance
) {
  let receivedFriendRequests: FriendRequestsType[] | null = null;
  try {
    const res = await axiosPrivateHook.get("friend_req", {
      params: { type: "received" },
    });
    console.log("response in getReceivedFriendRequests received data");
    console.log(res);
    if (res.data.friend_requests && res.data.friend_requests.length) {
      receivedFriendRequests = res.data.friend_requests.map(
        (friendReq: FetchedData) => ({
          ...friendReq.from_user,
          type: "received",
        })
      );
      console.log(receivedFriendRequests);
    }
  } catch (err) {
    console.log("error in fetchReceivedFriendRequests received");
    console.log(err);
  } finally {
    if (!receivedFriendRequests) receivedFriendRequests = [];
  }
  return receivedFriendRequests;
}

export async function getSentFriendRequests(axiosPrivateHook: AxiosInstance) {
  let sentFriendRequests: FriendRequestsType[] | null = null;
  try {
    const res = await axiosPrivateHook.get("friend_req", {
      params: { type: "sent" },
    });
    console.log("response in fetchSentFriendRequests sent data");
    console.log(res);
    if (res.data.friend_requests && res.data.friend_requests.length) {
      sentFriendRequests = res.data.friend_requests.map(
        (friendReq: FetchedData) => ({
          ...friendReq.to_user,
          type: "sent",
        })
      );
      console.log(sentFriendRequests);
    }
  } catch (err) {
    console.log("error in fetchSentFriendRequests sent");
    console.log(err);
  } finally {
    if (!sentFriendRequests) sentFriendRequests = [];
  }
  return sentFriendRequests;
}

export const rejectFriendRequest = async (
  axiosPrivateHook: AxiosInstance,
  username: string,
  setFriendRequestsList?: React.Dispatch<React.SetStateAction<any[]>>
) => {
  axiosPrivateHook
    .delete("friend_req/", { data: { username: username } })
    .then((res) => {
      console.log(res);
      setFriendRequestsList &&
        setFriendRequestsList((prev) => {
          return prev.filter((friendReq) => friendReq.username !== username);
        });
    })
    .catch((err) => console.log(err))
    .finally(() => {
      return;
    });
};

export const acceptFriendRequest = async (
  axiosPrivateHook: AxiosInstance,
  username: string,
  setFriendRequestsList?: React.Dispatch<React.SetStateAction<any[]>>,
  friendRequestsList?: any[]
) => {
  axiosPrivateHook
    .put("friend_req/", { username: username })
    .then((res) => {
      let temp_data;
      console.log(res);
      setFriendRequestsList &&
        setFriendRequestsList((prev) => {
          return prev.filter((friendReq) => friendReq.username !== username);
        });
        if (friendRequestsList)
        {
          temp_data = friendRequestsList.find((friendReq) => friendReq.username === username);
          console.log(temp_data);
          temp_data && setFriendsData([...store.getState().friends.value, temp_data])
        }
        console.log(temp_data);
    })
    .catch((err) => console.log(err))
    .finally(() => {
      return;
    });
};

export const isValidAccessToken = () => {
  axios
    .post("Verify_token", {
      token: store.getState().accessToken.value,
    })
    .then(() => true)
    .catch(() => {
      const refresh = refreshToken();
      let tmpAccessTokenFrom = refresh();
      if (!tmpAccessTokenFrom) return false;
    });
  return true;
};

export const getAllUsersData = async (axiosPrivateHook: AxiosInstance) => {
  axiosPrivateHook
    .post("search_user")
    .then((response) => {
      console.log("response in Search Friends in Game");
      console.log(response);
      setAllUsersData(response.data.user);
      console.log(response.data.user);
    })
    .catch((err) => {
      console.log("error in Search Friends in Game");
      console.log(err);
      setAllUsersData([]);
    });
};

export const blockUser = (
  axiosPrivateHook: AxiosInstance,
  username: string,
  setUsers?: React.Dispatch<React.SetStateAction<any[]>>
) => {
  axiosPrivateHook
    .post("block_user", { username: username })
    .then((res) => {
      console.log("you block user " + username + " ");
      console.log(res);
      setBlockedData([
        ...store.getState().blocked.value,
        { username: username },
      ]);
      setAllUsersData(
        store.getState().allUsers.value.map((user) => {
          return user.username === username
            ? { ...user, is_blocked: true }
            : user;
        })
      );
      setUsers &&
        setUsers((prev) =>
          prev.map((user) => {
            return user.username === username
              ? { ...user, is_blocked: true }
              : user;
          })
        );
    })
    .catch((err) => {
      console.log("error in blocking a user ");
      console.log(err);
    });
};

export const unblockUser = (
  axiosPrivateHook: AxiosInstance,
  username: string,
  setUsers?: React.Dispatch<React.SetStateAction<any[]>>
) => {
  axiosPrivateHook
    .delete("block_user", { data: { username: username } })
    .then((res) => {
      console.log("removed block to user " + username + " ");
      console.log(res);
      setBlockedData(
        store
          .getState()
          .blocked.value.filter((blocked) => blocked.username !== username)
      );
      setAllUsersData(
        store.getState().allUsers.value.map((user) => {
          return user.username === username
            ? { ...user, is_blocked: false }
            : user;
        })
      );
      setUsers &&
        setUsers((prev) =>
          prev.map((user) => {
            return user.username === username
              ? { ...user, is_blocked: false }
              : user;
          })
        );
    })
    .catch((err) => {
      console.log("error in removing block to a user ");
      console.log(err);
    });
};
