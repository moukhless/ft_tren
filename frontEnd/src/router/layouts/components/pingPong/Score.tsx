const Score = ({ player1Score, player2Score } : any) => {
  return (
    <div className="score">
      <span>{player1Score}</span>
      <span>-</span>
      <span>{player2Score}</span>
    </div>
  );
};

export default Score;