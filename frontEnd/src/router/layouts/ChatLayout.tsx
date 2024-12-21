import { Outlet } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";
import { chatLayout } from "../styles";
import { useState } from "react";
import ConversationsList from "@/src/pages/private/components/chatComponents/ConversationsList";
import "@router/styles/chatGlobalOverridingStyles.css";
import Profile from "./components/chat/Profile";

const ChatLayout = () => {
  const [isProfileVisible, setProfileVisible] = useState<boolean>(false);
  console.log("chat layout reloaded");
  return (
    <Fragment>
      <div className={`${chatLayout}`}>
        <div className="bg-dangerr d-none d-sm-block p-5"></div>
        <main className="bg-infos" id="main">
          <section className="section1 d-n" id="section1">
            {/* the component of the chat previous conversations */}
            <ConversationsList />
          </section>
          <section className="" id="sectionOfChat">
            {/* the component of the chat content */}
            <Outlet context={setProfileVisible} />
          </section>
          <section className={`${!isProfileVisible && "d-none"} `} id="section2">
            <Profile isProfileVisible={isProfileVisible} />
          </section>
        </main>
      </div>
    </Fragment>
  );
};

export default ChatLayout;
