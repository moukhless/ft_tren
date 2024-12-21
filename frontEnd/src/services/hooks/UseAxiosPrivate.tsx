import { RootState } from "@/src/states/store";
import { axiosPrivate } from "../api/axios";
import refreshToken from "./refreshToken";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const UseAxiosPrivate = () => {
  const accessToken = useSelector(
    (state: RootState) => state.accessToken.value
  );
  const refresh = refreshToken();
  useEffect(() => {
    const requestInterceptor = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${accessToken}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    const responseInterceptor = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 401 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const newAccessToken = await refresh();
          prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return axiosPrivate(prevRequest);
        }
        return Promise.reject(error);
      }
    );
    return () => {
      axiosPrivate.interceptors.request.eject(requestInterceptor);
      axiosPrivate.interceptors.request.eject(responseInterceptor);
    };
  }, [accessToken, refresh]);

  return axiosPrivate;
};

export default UseAxiosPrivate;
