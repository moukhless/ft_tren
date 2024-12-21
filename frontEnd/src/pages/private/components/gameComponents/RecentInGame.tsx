import { profileIcon } from "@/media-exporting";
import { gameRecentInGame, gameRecentInGameImageAndName } from "../../styles";

const data = [
  {
    player1: { name: "alvares", scored: 6 },
    player2: { name: "negredo", scored: 7 },
  },
  {
    player1: { name: "alvares1", scored: 6 },
    player2: { name: "negredo1", scored: 3 },
  },
  {
    player1: { name: "alvares4", scored: 6 },
    player2: { name: "negredo4", scored: 3 },
  },
  {
    player1: { name: "alvares5", scored: 6 },
    player2: { name: "negredo5", scored: 3 },
  },
  {
    player1: { name: "alvares2", scored: 12 },
    player2: { name: "negredo2", scored: 10 },
  },
  {
    player1: { name: "negredoooo3", scored: 9 },
    player2: { name: "alvaresssss3", scored: 6 },
  },
  {
    player1: { name: "alvares2", scored: 12 },
    player2: { name: "negredo2", scored: 10 },
  },
  {
    player1: { name: "negredoooo3", scored: 9 },
    player2: { name: "alvaresssss3", scored: 6 },
  },
  {
    player1: { name: "alvares2", scored: 12 },
    player2: { name: "negredo2", scored: 10 },
  },
  {
    player1: { name: "negredoooo3", scored: 9 },
    player2: { name: "alvaresssss3", scored: 6 },
  },
  {
    player1: { name: "alvares2", scored: 12 },
    player2: { name: "negredo2", scored: 10 },
  },
  {
    player1: { name: "negredoooo3", scored: 9 },
    player2: { name: "alvaresssss3", scored: 6 },
  },
];

type PlayerInfoProps = {
  player: {
    name: string;
    scored: number;
  };
  isWinner: boolean;
};

const NameAndImageIcon = ({ player, isWinner }: PlayerInfoProps) => {
  return isWinner ? (
    <div className="winner">
      <div className="user-image">
        <img src={profileIcon} alt="playerIcon" className="" />
      </div>
      <div className="user-name" title={player.name}>
        {player.name.length > 8 && player.name.substring(0, 6).concat("...")}
        {player.name.length <= 8 && player.name}
      </div>
    </div>
  ) : (
    <div className="loser">
      <div className="user-name" title={player.name}>
        {player.name.length > 8 && player.name.substring(0, 6).concat("...")}
        {player.name.length <= 8 && player.name}
      </div>
      <div className="user-image">
        <img
          src={profileIcon}
          alt="playerIcon"
          className=""
        />
      </div>
    </div>
  );
};

interface GamesType {
  player1: {
    name: string;
    scored: number;
  };
  player2: {
    name: string;
    scored: number;
  };
}

const RecentInGame = () => {
  let matches: GamesType[] | undefined = data;

  return (
    <>
      <div className={gameRecentInGame}>
        <div className="title">Recent</div>
        <div className="recent-board">
          {!matches ||
            (!matches.length && (
              <div className="h4 text-warning"> No matches yet</div>
            ))}
          {matches &&
            matches?.map((match, index) =>
              index < 10 ? (
                <div
                  key={index}
                  className={gameRecentInGameImageAndName}
                >
                  {match.player1.scored >= match.player2.scored ? (
                    <>
                      <NameAndImageIcon
                        player={match.player1}
                        isWinner={true}
                      />
                      <div className="vs-container">VS</div>
                      <NameAndImageIcon
                        player={match.player2}
                        isWinner={false}
                      />
                    </>
                  ) : (
                    <>
                      <NameAndImageIcon
                        player={match.player2}
                        isWinner={true}
                      />
                      <div className="vs-container">VS</div>
                      <NameAndImageIcon
                        player={match.player1}
                        isWinner={false}
                      />
                    </>
                  )}
                </div>
              ) : (
                <span key={index}></span>
              )
            )}
        </div>
      </div>
    </>
  );
};

export default RecentInGame;
