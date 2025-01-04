import Paddle from "./Paddle";
import Ball from "./Ball";
// import Score from './Score';

interface GameBoardProps {
  gameStarted: boolean;
  score1?: number;
  score2?: number;
  paddle1Pos: number;
  paddle2Pos: number;
  ballPos: {
    x: number;
    y: number;
  };
  onStart: () => void;
}

const GameBoard = ({
  gameStarted,
  // score1,
  // score2,
  paddle1Pos,
  paddle2Pos,
  ballPos,
  onStart,
}: GameBoardProps) => {
  return (
    <div className="game-board">
      {!gameStarted ? (
        <button className="start-button" onClick={onStart}>
          Start Game
        </button>
      ) : (
        <>
          {/* <Score player1Score={score1} player2Score={score2} /> */}
          <div className="board-divider"></div>
          <Paddle position={paddle1Pos} side="left" />
          <Paddle position={paddle2Pos} side="right" />
          <Ball position={ballPos} />
        </>
      )}
    </div>
  );
};

export default GameBoard;
