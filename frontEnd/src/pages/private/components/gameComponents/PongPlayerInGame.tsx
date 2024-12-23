import { pongPlayer } from "@/media-exporting";
import { pongPlayerInGame } from "../../styles";
import { useSelector } from "react-redux";
import { RootState } from "@/src/states/store";

import { useEffect, useRef } from "react";

const PongPlayerInGame = () => {
  const {username} = useSelector((state:RootState) => state.user.value)
  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    // Create WebSocket connection
    ws.current = new WebSocket(`wss://${window.location.hostname}:8000/ws/matchmaking`);
    
    ws.current.onopen = () => {
      console.log('Connected to matchmaking service');
    };
    
    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      
      switch (data.type) {
        case 'invite_received':
          console.log('Received invite:', data);
          break;
        case 'match_found':
          console.log('Match found:', data.match_details);
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
        recever_id: "2",
        game_name: "pong",
      };

      // Send the "send_invite" message to the server
      ws.current.send(JSON.stringify(inviteMessage));
      console.log("Invite sent to server:", inviteMessage);
    } else {
      console.error("WebSocket is not connected");
    }
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
      </div>
    </>
  );
};

export default PongPlayerInGame;
