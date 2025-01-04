import { profileIcon } from "@/media-exporting";
import { friends } from "./styles";
import { BsThreeDots } from "react-icons/bs";
import { Link } from "react-router-dom";
import UseAxiosPrivate from "@/src/services/hooks/UseAxiosPrivate";
import { RootState } from "@/src/states/store";
import { AxiosInstance } from "axios";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { UserDataType } from "@/src/states/authentication/userSlice";
import { MdOutlineBlock, MdPersonRemoveAlt1 } from "react-icons/md";
import { CgUnblock } from "react-icons/cg";
import { blockUser, removeFriend, unblockUser } from "../modules/fetchingData";

const inviteToGame = (AxiosPrivateHook: AxiosInstance, username: string) => {
  console.log("handle invite to game ");
};

const Friends = () => {
  const AxiosPrivateHook = UseAxiosPrivate();
  const friendsData = useSelector((state: RootState) => state.friends.value);
  const blockedList = useSelector((state: RootState) => state.blocked.value);
  const [friendsList, setFriendsList] = useState<UserDataType[]>([]);
  useEffect(() => {
    setFriendsList(friendsData);
  }, [friendsData]);
  if (!friendsList || !friendsList.length) {
    return (
      <div className={`${friends}`}>
        <p className="no-friends">
          You have no friends yet !!!!
          <br />
          go to{" "}
          <Link to="/game" className="">
            dashboard
          </Link>{" "}
          to search for them
        </p>
      </div>
    );
  }
  console.log("friends ")
  return (
    <div className={`${friends}`}>
      <div className="">
        {friendsList &&
          friendsList.length &&
          friendsList.map((friend, index) => (
            <div className="friends-card" key={index}>
              <Link
                to={`/profile/` + friend.username}
                className="user-image-name-level"
              >
                <div className="user-image">
                  <div className="">
                    <img
                      src={
                        friend.avatar
                          ? process.env.BACKEND_API_URL + "" + friend.avatar
                          : profileIcon
                      }
                      alt=""
                      className="rounded-5 bg-info"
                    />
                  </div>
                </div>
                <div className="user-name-level">
                  <div className="user-name">
                    {friend?.first_name?.length
                      ? friend.first_name
                      : "?????????"}{" "}
                    {friend?.last_name?.length ? friend.last_name : "?????????"}
                  </div>
                  <div className="user-level">
                    lvl. {friend.level ? friend.level : 0}
                  </div>
                </div>
              </Link>
              <div className="invite-remove-button">
                <div
                  className="invite-button"
                  onClick={() =>
                    inviteToGame(AxiosPrivateHook, friend.username!)
                  }
                >
                  invite
                </div>
                <div
                  className="remove-button"
                  title="unfriend"
                  onClick={() =>
                    removeFriend(AxiosPrivateHook, friend.username!)
                  }
                >
                  <MdPersonRemoveAlt1 size={17} />
                </div>
              </div>
              <div
                className="collapse-button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <BsThreeDots size={30} color="white" />
              </div>
              <div className="dropdown-menu">
                {blockedList.find(
                  (user) => user.username === friend.username
                ) ? (
                  <div
                    className="block"
                    onClick={() =>
                      unblockUser(AxiosPrivateHook, friend.username!)
                    }
                  >
                    <span className="">
                      <CgUnblock color="green" size={25} />
                    </span>
                    unblock {friend.username}
                  </div>
                ) : (
                  <div
                    className="block"
                    onClick={() =>
                      blockUser(AxiosPrivateHook, friend.username!)
                    }
                  >
                    <span className="">
                      <MdOutlineBlock color="red" size={25} />
                    </span>
                    block {friend.username}!
                  </div>
                )}
                <Link
                  to={`/profile/` + friend.username}
                  className="view-profile"
                >
                  <span className="">
                    <img
                      src={
                        friend.avatar
                          ? process.env.BACKEND_API_URL + "" + friend.avatar
                          : profileIcon
                      }
                      width={20}
                      alt=""
                    />
                  </span>
                  view profile
                </Link>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Friends;
