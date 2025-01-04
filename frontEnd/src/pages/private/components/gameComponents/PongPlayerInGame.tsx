import { pongPlayer } from "@/media-exporting";
import { pongPlayerInGame } from "../../styles";
import { useSelector } from "react-redux";
import { RootState } from "@/src/states/store";

const PongPlayerInGame = () => {
  const {username} = useSelector((state:RootState) => state.user.value)
  return (
    <>
      <div className={pongPlayerInGame}>
        <div className="pong-player-text-vector">
          <div className="user-welcoming-play-button">
            <div className="user-welcoming">
              <span className="">HI {!username? "user":  username}!</span>
              ENJOY YOUR TIME
            </div>
            <button className="play-button">PLAY NOW</button>
          </div>
          <div className="pong-player-vector">
            <img src={pongPlayer} alt="pong player" className="" />
          </div>
        </div>
      </div>
    </>
  );
};

export default PongPlayerInGame;
