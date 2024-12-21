import { goldenMedalIcon, profileIcon, selverMedalLevel1Icon } from "@/media-exporting";
import { gameLeaderBoardInGame } from "../../styles";

const data = [
  {
    rank: 1,
    image: profileIcon,
    name: "alvares",
    score: 120.23,
    level: 12.2,
    medal: selverMedalLevel1Icon,
  },
  {
    rank: 2,
    image: profileIcon,
    name: "alvares",
    score: 120.23,
    level: 12.2,
    medal: goldenMedalIcon,
  },
  {
    rank: 3,
    image: profileIcon,
    name: "alvares",
    score: 120.23,
    level: 12.2,
    medal: selverMedalLevel1Icon,
  },
  {
    rank: 4,
    image: profileIcon,
    name: "alvares",
    score: 120.23,
    level: 12.2,
    medal: selverMedalLevel1Icon,
  },
  {
    rank: 5,
    image: profileIcon,
    name: "alvares",
    score: 120.23,
    level: 12.2,
    medal: selverMedalLevel1Icon,
  },
  {
    rank: 6,
    image: profileIcon,
    name: "alvares",
    score: 120.23,
    level: 12.2,
    medal: selverMedalLevel1Icon,
  },
  {
    rank: 7,
    image: profileIcon,
    name: "alvares",
    score: 120.23,
    level: 12.2,
    medal: selverMedalLevel1Icon,
  },
  {
    rank: 8,
    image: profileIcon,
    name: "alvares",
    score: 120.23,
    level: 12.2,
    medal: selverMedalLevel1Icon,
  },
  {
    rank: 9,
    image: profileIcon,
    name: "alvares",
    score: 120.23,
    level: 12.2,
    medal: selverMedalLevel1Icon,
  },
  {
    rank: 10,
    image: profileIcon,
    name: "alvares",
    score: 120.23,
    level: 12.2,
    medal: selverMedalLevel1Icon,
  },
];

interface PlayerData {
  rank: number;
  image: string;
  name: string;
  score: number;
  level: number;
  medal: string;
}

const LeaderBordInGame = () => {
  const players: PlayerData[] = data;
  return (
    <>
      <div className={gameLeaderBoardInGame}>
        <table className="">
          <thead className="">
            <tr className="">
              <th className="">RANK</th>
              <th className="" style={{visibility:"hidden"}}>Image</th>
              <th className="">NAME</th>
              <th className=" ">SCORE</th>
              <th className="">LEVEL</th>
              <th>MEDAL</th>
            </tr>
          </thead>
          <tbody className="">
            {!players || !players.length ? (
              <tr className="">
                <td colSpan={6}> No data in Leader board!!</td>
              </tr>
            ) : (
              players.map((player, index) =>
                index < 6 ? (
                  <tr
                    key={index}
                    className=""
                  >
                    <th scope="col" className="">
                      {player.rank}
                    </th>
                    <td className="">
                      <img
                        src={player.image}
                        className="user-image"
                        alt="user image"
                      />
                    </td>
                    <td className="">{player.name}</td>
                    <td className="">{player.score}xp</td>
                    <td className="">{player.level}</td>
                    <td className="">
                      <img
                        src={player.medal}
                        className="medal-image"
                        alt="medal image"
                      />
                    </td>
                  </tr>
                ) : (
                  <tr key={index} className="d-none"></tr>
                )
              )
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default LeaderBordInGame;
