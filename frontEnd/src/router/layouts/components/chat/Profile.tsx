import { gameIcon, profileIcon } from "@/media-exporting";
import { chatProfileStyles } from "@/src/router/styles";
import { MdBlock } from "react-icons/md";
import { useLocation } from "react-router-dom";

interface ProfileProps {
  isProfileVisible: boolean;
}

const Profile = ({ isProfileVisible }: ProfileProps) => {
  const location = useLocation();
  console.log("pathname = "+location.pathname)
  if (!isProfileVisible || location.pathname === "/chat" || location.pathname === "/chat/") return <></>;
  return (
    <>
      <div className={`${chatProfileStyles}`}>
        <div className="profileImage">
          <img src={profileIcon} width={12} alt="" />
        </div>
        <button>
          <div className="">
            <img src={profileIcon} alt="" />
          </div>
          <p className="">Profile</p>
        </button>
        <button>
          <div className="">
            <img src={gameIcon} width={28} alt="" />
          </div>
          <p className="">Invite Game</p>
        </button>
        <button>
          <div className="">
            <img src={profileIcon} alt="" />
          </div>
          <p className="">Invite Tournament</p>
        </button>
        <button>
          <div className="" >
            <MdBlock size={"28"}/>
          </div>
          <p className="">Block "User Name"</p>
        </button>
      </div>
    </>
  );
};

export default Profile;
