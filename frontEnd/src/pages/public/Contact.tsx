import { w3cwebsocket } from "websocket";
import { useSelector } from "react-redux";
import { RootState } from "@/src/states/store";
const Contact = () => {
  console.log("contact rendered");
  const AccessToken = useSelector(
    (state: RootState) => state.accessToken.value
  );
  const userData = useSelector((state: RootState) => state.user.value);
  let client: w3cwebsocket;
  if (AccessToken) {
    client = new w3cwebsocket(
      `${process.env.BACKEND_API_SOCKETS}/ws/notification/?token=${AccessToken}`
    );
    // if (client.readyState == 1) {
      console.log(client);
      client.onopen = () => {
        console.log("hello client connected");
        // console.log(data.textMessage);
      };
      // socket.emit("message")
      // console.log(message);
      client.onmessage = (data) => {
        console.log("this message recieved in client side");
        console.log(data);
      };
      client.onclose = () => {
        console.log("hello client disconnected");
        // console.log(data.textMessage);
      };
    // }
  }
  const sendMessage = () => {
    const data = {
      Sender: userData.username,
      Reciever: "receiverUserName",
      message: `hello this is a message from the user[${userData.username}]`,
    };
    client.send(JSON.stringify(data));
    console.log(data);
  };

  return (
    <div>
      <div className="btn btn-info" onClick={sendMessage}>
        {" "}
        send Message{" "}
      </div>
      Contact
    </div>
  );
};

export default Contact;
