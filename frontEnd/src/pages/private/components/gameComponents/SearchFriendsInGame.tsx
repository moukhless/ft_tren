import { BiBlock, BiSearch } from "react-icons/bi";
import { searchFriendsInGame } from "../../styles";
import { ChangeEvent, memo, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { profileIcon } from "@/media-exporting";
import { RiUserAddFill } from "react-icons/ri";
import UseAxiosPrivate from "@/src/services/hooks/UseAxiosPrivate";
import { AxiosInstance } from "axios";
import { useSelector } from "react-redux";
import { RootState, store } from "@/src/states/store";
import { AllUsersDataType } from "@/src/states/authentication/allUsersSlice";
import {
  setAllUsersData,
  setBlockedData,
  setFriendsData,
} from "@/src/pages/modules/setAuthenticationData";
import { MdPersonRemoveAlt1 } from "react-icons/md";
import { CgUnblock } from "react-icons/cg";

let isInputFocused: boolean = false;
let isDevFocused: boolean = false;
const hideSearchList = () => {
  let selectSearchList = document.querySelector(".searched-friends-list");
  if (isInputFocused === false && isDevFocused === false) {
    if (!selectSearchList?.classList.contains("d-none"))
      selectSearchList?.classList.add("d-none");
  }
};
const showSearchList = () => {
  let selectSearchList = document.querySelector(".searched-friends-list");
  if (selectSearchList?.classList.contains("d-none"))
    selectSearchList?.classList.remove("d-none");
};

const sendFriendRequest = (
  axiosPrivateHook: AxiosInstance,
  username: string
) => {
  axiosPrivateHook
    .post("friend_req", { username: username })
    .then((res) => {
      console.log("friend request sent to " + username);
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};

const removeFriend = (
  axiosPrivateHook: AxiosInstance,
  username: string,
  users: AllUsersDataType[],
  setUsers: React.Dispatch<React.SetStateAction<AllUsersDataType[]>>
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
      setUsers(
        users.map((user) => {
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

const removeBlockToUser = (
  axiosPrivateHook: AxiosInstance,
  username: string,
  users: AllUsersDataType[],
  setUsers: React.Dispatch<React.SetStateAction<AllUsersDataType[]>>
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
      setUsers(
        users.map((user) => {
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

const blockUser = (
  axiosPrivateHook: AxiosInstance,
  username: string,
  users: AllUsersDataType[],
  setUsers: React.Dispatch<React.SetStateAction<AllUsersDataType[]>>
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
      setUsers(
        users.map((user) => {
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

function searchForUser(
  event: ChangeEvent<HTMLInputElement>,
  users: AllUsersDataType[],
  setUsers: React.Dispatch<React.SetStateAction<AllUsersDataType[]>>
) {
  event.preventDefault();
  let userField = event.currentTarget.value;
  let globalData = store.getState();
  let filteredUsers = globalData.allUsers.value.filter((filteredUser) => {
    let filteredUserToLowerCase = filteredUser.username?.toLowerCase();
    return (
      filteredUserToLowerCase?.includes(userField.toLowerCase()) &&
      filteredUserToLowerCase !== globalData.user.value.username?.toLowerCase()
    );
  });
  if (filteredUsers.length) setUsers(filteredUsers);
  else if (users.length) setUsers([]);
}

// const getAllFriendRequest = () => {};

// const fetchAllUsers = async (axiosPrivateHook: AxiosInstance) => {
//   const response = await axiosPrivateHook.post("search_user");
//   if (response.statusText != "OK") throw new Error("Failed to get Users data");
//   return response;
// };

const SearchFriendsInGame = () => {
  const [users, setUsers] = useState<AllUsersDataType[]>([]);
  const userData = useSelector((state: RootState) => state.user.value);
  const allUsersData = useSelector((state: RootState) => state.allUsers.value);
  const axiosPrivateHook = UseAxiosPrivate();
  useEffect(() => {
    if (!allUsersData || !allUsersData.length) {
      axiosPrivateHook
        .post("search_user")
        .then((response) => {
          console.log("response in Search Friends in Game");
          console.log(response);
          setAllUsersData(response.data.user);
          console.log(allUsersData);
        })
        .catch((err) => {
          console.log("error in Search Friends in Game");
          console.log(err);
          setAllUsersData([]);
        });
    }
  }, [allUsersData, userData]);

  return (
    <div className={searchFriendsInGame}>
      <div className="input-field">
        <label htmlFor="searchUsers">
          <BiSearch size={22} color="white" className="search-add-on" />
        </label>
        <input
          type="text"
          name="searchUsers"
          id="searchUsers"
          className="searchUsers"
          placeholder="Search for users....."
          onChange={(event) => {
            searchForUser(event, users, setUsers);
          }}
          onFocus={() => {
            isInputFocused = true;
            showSearchList();
          }}
          onBlur={() => {
            isInputFocused = false;
            hideSearchList();
          }}
        />
      </div>
      <div
        className="searched-friends-list"
        tabIndex={0}
        onMouseEnter={() => (isDevFocused = true)}
        onMouseLeave={() => (isDevFocused = false)}
        onFocus={() => showSearchList()}
        onBlur={() => {
          isDevFocused = false;
          hideSearchList();
        }}
      >
        {users && users.length ? (
          users.map((user) => (
            <div className="searched-friends-cards" key={user.username}>
              <Link
                to={`/profile/` + user.username}
                className="user-image-first-last-name"
              >
                <div className="user-image">
                  <div className="">
                    <img
                      src={user.avatar ? user.avatar : profileIcon}
                      alt=""
                      className="rounded-5 bg-info"
                    />
                  </div>
                </div>
                <div className="user-first-last-name">
                  <div className="first-last-name">
                    {user.first_name + " " + user.last_name}
                  </div>
                  <div className="user-name">{user.username}</div>
                </div>
              </Link>
              <div className="block-addFriend-buttons">
                {user.is_friend ? (
                  <div
                    className="unfriend-button"
                    onClick={() =>
                      removeFriend(
                        axiosPrivateHook,
                        user.username,
                        users,
                        setUsers
                      )
                    }
                  >
                    <MdPersonRemoveAlt1 />
                  </div>
                ) : (
                  <div
                    className="add-button"
                    onClick={() =>
                      sendFriendRequest(axiosPrivateHook, user.username)
                    }
                  >
                    <RiUserAddFill />
                  </div>
                )}
                {user.is_friend ? (
                  user.is_blocked ? (
                    <div
                      className="remove-block"
                      onClick={() =>
                        removeBlockToUser(
                          axiosPrivateHook,
                          user.username,
                          users,
                          setUsers
                        )
                      }
                    >
                      <CgUnblock />
                    </div>
                  ) : (
                    <div
                      className="block-button"
                      onClick={() =>
                        blockUser(
                          axiosPrivateHook,
                          user.username,
                          users,
                          setUsers
                        )
                      }
                    >
                      <BiBlock />
                    </div>
                  )
                ) : (
                  ""
                )}
              </div>
            </div>
          ))
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default memo(SearchFriendsInGame);
