import MainRoutingComponent from "@router/MainRoutingComponent.tsx";
import { RootState } from "./states/store";
import { useEffect } from "react";
import UseAxiosPrivate from "./services/hooks/UseAxiosPrivate";
import setAuthenticatedData, {
  setBlockedData,
  setFriendsData,
  setUserData,
} from "./pages/modules/setAuthenticationData";
import { AxiosInstance } from "axios";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";
import { UserDataType } from "./states/authentication/userSlice";
import { BlockerUsersType } from "./states/authentication/blockedSlice";

const getUsersInfo = async (axiosPrivateHook: AxiosInstance) => {
  await axiosPrivateHook
    .get("user_info")
    .then((res) => {
      setUserData(res.data);
    })
    .catch((err) => {
      console.log("error in getUsersInfo");
      console.log(err);
    });
};

const getFriendsData = async (axiosPrivateHook: AxiosInstance) => {
  axiosPrivateHook
    .get("friends")
    .then((res) => {
      setFriendsData(res.data.friends);
    })
    .catch((err) => {
      console.log("error in getFriendsInfo");
      console.log(err);
    });
};

const getBlockedData = async (axiosPrivateHook: AxiosInstance) => {
  axiosPrivateHook
    .get("block_user")
    .then((res) => {
      setBlockedData(
        res.data.blocked.map((user: UserDataType): BlockerUsersType => {
          return { username: user.username! };
        })
      );
    })
    .catch((err) => {
      console.log("error in getBlockedInfo");
      console.log(err);
    });
};

function App() {
  const axiosPrivateHook = UseAxiosPrivate();
  const isAuthenticated = useSelector(
    (state: RootState) => state.authenticator.value
  );
  useEffect(() => {
    if (!isAuthenticated) {
      if (Cookies.get("accessToken") !== undefined) {
        setAuthenticatedData(Cookies.get("accessToken")!);
      }
    } else {
      getUsersInfo(axiosPrivateHook);
      getFriendsData(axiosPrivateHook);
      getBlockedData(axiosPrivateHook);
    }
  }, [isAuthenticated]);
  return (
    <>
      <MainRoutingComponent />
    </>
  );
}

export default App;
