import { redirect } from "react-router-dom";
import Cookies from "js-cookie";
import { store } from "@/src/states/store";
import { setUnauthenticated } from "@/src/states/authentication/authenticatorSlice";
import { setAccessToken } from "@/src/states/authentication/accessTokenSlice";
import axios from "@/src/services/api/axios";
const logOut = async () => {
  try {
    const res = await axios.post(
      "logout",
      {},
      { headers: { 'Authorization': `Bearer ${store.getState().accessToken.value}` } }
    );
    console.log("response in logout.ts");
    console.log(res);
    const dispatch = store.dispatch;
    Cookies.remove("accessToken");
    dispatch(setAccessToken(undefined));
    dispatch(setUnauthenticated());
  } catch (err) {
    console.log("error in logout.ts");
    console.log(err);
  }
  // console.log("here i need to send a request to backend to logout");
  return redirect("/sign-in");
};

export default logOut;
