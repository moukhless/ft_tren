import { Outlet } from "react-router-dom";
import NotificationsComponent from "./components/notifications/NotificationsComponent";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { ICloseEvent, IMessageEvent, w3cwebsocket } from "websocket";
import { store } from "@/src/states/store";
import { rootLayout } from "../styles";
import UseAxiosPrivate from "@/src/services/hooks/UseAxiosPrivate";
import { AxiosInstance } from "axios";
import {
  acceptFriendRequest,
  isValidAccessToken,
  rejectFriendRequest,
} from "@/src/pages/modules/fetchingData";

function openSocket(accessToken: string | undefined): w3cwebsocket {
  console.log("oppening socket");
  return new w3cwebsocket(
    `${process.env.BACKEND_API_SOCKETS}/ws/notification/?token=${accessToken}`
  );
}

let axiosPrivateHook: AxiosInstance;

type JsonValue = string | number | boolean | null | JsonValue[] | any;

const launchToast = (
  data: JsonValue,
  accept?: () => void,
  reject?: () => void
) => {
  toast(
    <NotificationsComponent
      message={data.message}
      reject={reject}
      accept={accept}
    />,
    {
      autoClose: 8000,
      toastId: data.sender.username,
    }
  );
};

const trigerRightEvent = (json_data: JsonValue) => {
  switch (json_data.type) {
    case "friend_request": {
      launchToast(
        json_data,
        () =>
          acceptFriendRequest(
            axiosPrivateHook,
            json_data.sender.username,
            undefined,
            [json_data.sender]
          ).then(() => toast.dismiss(json_data.username)),
        () =>
          rejectFriendRequest(axiosPrivateHook, json_data.sender.username).then(
            () => toast.dismiss(json_data.sender.username)
          )
      );
      break;
    }
    case "accept_request": {
      console.log("here is the block of accepted request ");
      console.log(json_data);
      break;
    }

    default: {
      console.log("default switch case");
      console.log(json_data);
      break;
    }
  }
};

const watchSocket = (client: w3cwebsocket) => {
  client.onmessage = (dataEvent: IMessageEvent): JsonValue => {
    let json_data: JsonValue = null;
    json_data = JSON.parse(dataEvent.data as string);
    console.log(json_data);
    trigerRightEvent(json_data);
  };
  client.onclose = (closeEvent: ICloseEvent) => {
    console.log("close event in socket ");
    console.log(closeEvent);
  };
  client.onerror = (errorEvent: Error) => {
    console.log("error in socket ");
    console.log(errorEvent);
  };
};
let client: w3cwebsocket | null = null;

const RootLayout = () => {
  axiosPrivateHook = UseAxiosPrivate();
  useEffect(() => {
    const handleSockets = async () => {
      console.log("json_data");
      if (isValidAccessToken()) {
        console.log("json_data2");
        if (!client || client.readyState === w3cwebsocket.CLOSED)
          client = openSocket(store.getState().accessToken.value + "");
        watchSocket(client);
        if (client.readyState === w3cwebsocket.CLOSING) {
          console.log("socket closing");
        }
        if (client.readyState === w3cwebsocket.CLOSED) {
          console.log("socket closed");
        }
      }
    };
    handleSockets();
    return () => {
      console.log("cleaning funtion in APPPPPPPPPPPPPPPPPPPPPP");
      if (client && client?.readyState === w3cwebsocket.OPEN) {
        console.log("befor cleaning the funciton APPPPPPPPPPPPPPPPPPPPPP");
        client.close(3001, "cleaning in useEffect");
        client = null;
      }
    };
  }, []);
  return (
    <>
      <div className={rootLayout}>
        <ToastContainer
          draggable={true}
          closeOnClick={false}
          pauseOnFocusLoss={false}
          className="toast-container-style"
          toastClassName="toast-component-style"
          progressClassName="toast-progress-bar-style"
          pauseOnHover={true}
          autoClose={2000}
          limit={5}
        />
        {/* <ToastContainer enableMultiContainer containerId={"requests"} position={"bottom-right"}/> */}
        <Outlet />
      </div>
    </>
  );
};
export default RootLayout;
