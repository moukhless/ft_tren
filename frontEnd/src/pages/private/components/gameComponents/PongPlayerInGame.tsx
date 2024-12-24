import { pongPlayer } from "@/media-exporting";
import { pongPlayerInGame } from "../../styles";
import { useSelector } from "react-redux";
import { RootState } from "@/src/states/store";

import { useEffect, useRef, useState } from "react";

const PongPlayerInGame = () => {
  const {username} = useSelector((state:RootState) => state.user.value)
  const ws = useRef<WebSocket | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [inviteData, setInviteData] = useState<{ message: string; game: string; invite_id: number} | null>(null);

  useEffect(() => {
    // Create WebSocket connection
    ws.current = new WebSocket(`ws://localhost:8000/ws/matchmaking`);
    
    ws.current.onopen = () => {
      console.log('Connected to matchmaking service');
    };
    
    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log('data:', data);
      
      switch (data.type) {
        case 'notify_invite':
          console.log('Received invite:', data);
          setInviteData({
            message: data.message,
            game: data.game_name,
            invite_id: data.invite_id,
          });
          setShowPopup(true);
          break;
        case 'match_found':
          console.log('Match found:', data.message);
          break;
        case 'error':
          console.error('Matchmaking error:', data.message);
          break;
      }
    };
    
    ws.current.onclose = () => {
      console.log('Disconnected from matchmaking service');
    };
    
    ws.current.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
    
    // Cleanup function
    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, []);

  const handlePlayButtonClick = () => {
    // Check if websocket is available and open
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      const inviteMessage = {
        type: "send_invite",
        receiver_id: "2", // should be dynamic
        game_name: "pong",
      };

      // Send the "send_invite" message to the server
      ws.current.send(JSON.stringify(inviteMessage));
      console.log("Invite sent to server:", inviteMessage);
    } else {
      console.error("WebSocket is not connected");
    }
  };

  const handlePopupResponse = (response: "accepted" | "rejected") => {
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      const responseMessage = {
        type: "respond_invite",
        response: response,
        game_name: inviteData?.game,
        invite_id: inviteData?.invite_id,
      };

      ws.current.send(JSON.stringify(responseMessage));
      console.log(`Response sent to server: ${response}`);
    }
    setShowPopup(false); // Hide the popup
    setInviteData(null); // Clear invite data
  };

  return (
    <>
      <div className={pongPlayerInGame}>
        <div className="pong-player-text-vector">
          <div className="user-welcoming-play-button">
            <div className="user-welcoming">
              <span className="">HI {!username? "user":  username}!</span>
              ENJOY YOUR TIME
            </div>
            <button className="play-button" onClick={handlePlayButtonClick}>PLAY NOW</button>
          </div>
          <div className="pong-player-vector">
            <img src={pongPlayer} alt="pong player" className="" />
          </div>
        </div>
      {/* Popup Component */}
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <p>
              {inviteData?.message}.
            </p>
            <div className="popup-buttons">
              <button onClick={() => handlePopupResponse("accepted")}>Yes</button>
              <button onClick={() => handlePopupResponse("rejected")}>No</button>
            </div>
          </div>
        </div>
      )}
      </div>

    </>
  );
};

export default PongPlayerInGame;
