import { profileIcon } from "@/media-exporting";
import { useParams } from "react-router-dom";
import { chatConversationContent } from "../../styles";

const data = {
  conversation: [
    {
      timestamp: "2024-11-15T08:00:00Z",
      sender: "user2",
      message: "Hey, how are you?",
    },
    {
      timestamp: "2024-11-15T08:00:05Z",
      sender: "alvares",
      message: "I'm doing great, thanks for asking! How about you?",
    },
    {
      timestamp: "2024-11-15T08:00:30Z",
      sender: "user2",
      message:
        "I'm good, just trying to figure out something. Can you help me?",
    },
    {
      timestamp: "2024-11-15T08:00:45Z",
      sender: "alvares",
      message: "Of course! What do you need help with?",
    },
    {
      timestamp: "2024-11-15T08:01:00Z",
      sender: "user2",
      message:
        "I'm trying to format a conversation into JSON, but I'm not sure how to structure it.",
    },
    {
      timestamp: "2024-11-15T08:01:20Z",
      sender: "alvares",
      message:
        "Got it! Here's an example of how a conversation can be structured in JSON format...",
    },
    {
      timestamp: "2024-11-15T08:01:50Z",
      sender: "alvares",
      message:
        "Got it! Here's an example of how a conversation can be structured in JSON format...",
    },
    {
      timestamp: "2024-11-15T08:02:00Z",
      sender: "user2",
      message: "That looks perfect! Thanks for your help!",
    },
    {
      timestamp: "2024-11-15T08:02:15Z",
      sender: "alvares",
      message: "You're welcome! Feel free to reach out if you need anything.",
    },
    {
      timestamp: "2024-11-15T08:02:15Z",
      sender: "alvares",
      message:
        "You're welcome! Feel free to reach out if you need anything else.",
    },
    {
      timestamp: "2024-11-15T08:02:15Z",
      sender: "alvares",
      message: "You're welcome! Feel free to reach out",
    },
    {
      timestamp: "2024-11-15T08:02:15Z",
      sender: "alvares",
      message:
        "You're welcome! Feel free to reach out if you need anything else.",
    },
    {
      timestamp: "2024-11-15T08:02:15Z",
      sender: "user2",
      message:
        "You're welcome! Feel free to reach out if you need anything else.",
    },
    {
      timestamp: "2024-11-15T08:00:00Z",
      sender: "user2",
      message: "Hey, how are you?",
    },
    {
      timestamp: "2024-11-15T08:00:05Z",
      sender: "alvares",
      message: "I'm doing great, thanks for asking! How about you?",
    },
    {
      timestamp: "2024-11-15T08:00:30Z",
      sender: "user2",
      message:
        "I'm good, just trying to figure out something. Can you help me?",
    },
    {
      timestamp: "2024-11-15T08:00:45Z",
      sender: "alvares",
      message: "Of course! What do you need help with?",
    },
    {
      timestamp: "2024-11-15T08:01:00Z",
      sender: "user2",
      message:
        "I'm trying to format a conversation into JSON, but I'm not sure how to structure it.",
    },
    {
      timestamp: "2024-11-15T08:01:20Z",
      sender: "alvares",
      message:
        "Got it! Here's an example of how a conversation can be structured in JSON format...",
    },
    {
      timestamp: "2024-11-15T08:01:50Z",
      sender: "alvares",
      message:
        "Got it! Here's an example of how a conversation can be structured in JSON format...",
    },
    {
      timestamp: "2024-11-15T08:02:00Z",
      sender: "user2",
      message: "That looks perfect! Thanks for your help!",
    },
    {
      timestamp: "2024-11-15T08:02:15Z",
      sender: "alvares",
      message:
        "You're welcome! Feel free to reach out if you need anything else.",
    },
    {
      timestamp: "2024-11-15T08:02:15Z",
      sender: "alvares",
      message:
        "You're welcome! Feel free to reach out if you need anything else.",
    },
    {
      timestamp: "2024-11-15T08:02:15Z",
      sender: "alvares",
      message:
        "You're welcome! Feel free to reach out if you need anything else.",
    },
    {
      timestamp: "2024-11-15T08:02:15Z",
      sender: "alvares",
      message:
        "You're welcome! Feel free to reach out if you need anything else.",
    },
    {
      timestamp: "2024-11-15T08:02:15Z",
      sender: "user2",
      message:
        "You're welcome! Feel free to reach out if you need anything else.",
    },
    {
      timestamp: "2024-11-15T08:00:00Z",
      sender: "user2",
      message: "Hey, how are you?",
    },
    {
      timestamp: "2024-11-15T08:00:05Z",
      sender: "alvares",
      message: "I'm doing great, thanks for asking! How about you?",
    },
    {
      timestamp: "2024-11-15T08:00:30Z",
      sender: "user2",
      message:
        "I'm good, just trying to figure out something. Can you help me?",
    },
    {
      timestamp: "2024-11-15T08:00:45Z",
      sender: "alvares",
      message: "Of course! What do you need help with?",
    },
    {
      timestamp: "2024-11-15T08:01:00Z",
      sender: "user2",
      message:
        "I'm trying to format a conversation into JSON, but I'm not sure how to structure it.",
    },
    {
      timestamp: "2024-11-15T08:01:20Z",
      sender: "alvares",
      message:
        "Got it! Here's an example of how a conversation can be structured in JSON format...",
    },
    {
      timestamp: "2024-11-15T08:01:50Z",
      sender: "alvares",
      message:
        "Got it! Here's an example of how a conversation can be structured in JSON format...",
    },
    {
      timestamp: "2024-11-15T08:02:00Z",
      sender: "user2",
      message: "That looks perfect! Thanks for your help!",
    },
    {
      timestamp: "2024-11-15T08:02:15Z",
      sender: "alvares",
      message:
        "You're welcome! Feel free to reach out if you need anything else.",
    },
    {
      timestamp: "2024-11-15T08:02:15Z",
      sender: "alvares",
      message:
        "You're welcome! Feel free to reach out if you need anything else.",
    },
    {
      timestamp: "2024-11-15T08:02:15Z",
      sender: "alvares",
      message:
        "You're welcome! Feel free to reach out if you need anything else.",
    },
    {
      timestamp: "2024-11-15T08:02:15Z",
      sender: "alvares",
      message:
        "You're welcome! Feel free to reach out if you need anything else.",
    },
    {
      timestamp: "2024-11-15T08:02:15Z",
      sender: "user2",
      message:
        "You're welcome! Feel free to reach out if you need anything else.",
    },
  ],
};

const ConversationContent = () => {
  const { userName } = useParams();
  console.log("conversation Content re-rendered");
  let previousMsgOwner = " ";
  return (
    <>
      {data.conversation.map((convers, index) => (
        <div
          key={index}
          className={
            chatConversationContent +
            " " +
            `${(previousMsgOwner !== convers.sender).toString()}`
          }
        >
          {convers.sender === userName && (
            <div className="MessagesOfOther">
              {previousMsgOwner !== userName ? (
                <img
                  src={profileIcon}
                  alt={`img of ${userName}`}
                  className=""
                />
              ) : (
                <div className=""></div>
              )}
              <p className="">{convers.message}</p>
            </div>
          )}
          {convers.sender !== userName && (
            <div className="MessagesOfOwner">
              <p className="">{convers.message}</p>
            </div>
          )}
          {(previousMsgOwner = convers.sender) && <></>}
        </div>
      ))}
    </>
  );
};

export default ConversationContent;
