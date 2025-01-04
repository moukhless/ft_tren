import { useState, useEffect, useCallback } from 'react';
import GameBoard from './components/pingPong/GameBoard';
import WindowFrame from './components/pingPong/WindowFrame';
import { pingPongLayout } from '../styles';
import { GAME_CONSTANTS } from '@/src/pages/modules/gameConstants';

const PingPongLayout = () => {
  const [ballPos, setBallPos] = useState(GAME_CONSTANTS.INITIAL_BALL_POS);
  const [paddle1Pos, setPaddle1Pos] = useState(GAME_CONSTANTS.BOARD_HEIGHT / 2 - GAME_CONSTANTS.PADDLE_HEIGHT / 2);
  const [paddle2Pos, setPaddle2Pos] = useState(GAME_CONSTANTS.BOARD_HEIGHT / 2 - GAME_CONSTANTS.PADDLE_HEIGHT / 2);
  const [score1, setScore1] = useState(0);
  const [score2, setScore2] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);

  const [ws, setWs] = useState<WebSocket | null>(null);

  // Initialize WebSocket connection
  useEffect(() => {
    const socket: WebSocket = new WebSocket('ws://localhost:8000/ws/game/');

    socket.onopen = () => {
      console.log('WebSocket connection established');
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);

      // Update ball position and scores from the server
      if (data.ballPos) {
        setBallPos(data.ballPos);
      }
      if (data.score1 !== undefined) {
        setScore1(data.score1);
      }
      if (data.score2 !== undefined) {
        setScore2(data.score2);
      }
    };

    socket.onclose = () => {
      console.log('WebSocket connection closed');
    };

    setWs(socket);

    return () => {
      if (socket.readyState === WebSocket.OPEN)
        socket.close();
    };
  }, []);

  const handleKeyPress = useCallback(
    (e: KeyboardEvent) => {
      if (!gameStarted || !ws) return;

      let move = null;

      switch (e.key) {
        case 'w':
          move = { paddle: 1, direction: 'up' };
          break;
        case 's':
          move = { paddle: 1, direction: 'down' };
          break;
        case 'ArrowUp':
          move = { paddle: 2, direction: 'up' };
          break;
        case 'ArrowDown':
          move = { paddle: 2, direction: 'down' };
          break;
        default:
          break;
      }

      if (move) {
        ws.send(JSON.stringify({ action: 'move_paddle', ...move }));
      }
    },
    [gameStarted, ws]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  const startGame = () => {
    if (ws) {
      ws.send(JSON.stringify({ action: 'start_game' }));
    }
    setGameStarted(true);
  };

  return (
    <div className={pingPongLayout}>
      <WindowFrame>
        <GameBoard
          gameStarted={gameStarted}
          score1={score1}
          score2={score2}
          paddle1Pos={paddle1Pos}
          paddle2Pos={paddle2Pos}
          ballPos={ballPos}
          onStart={startGame}
        />
      </WindowFrame>
    </div>
  );
}
export default PingPongLayout;
