import { tournamentLayout } from "../styles";
import StartButton from "./components/tournament/StartButton";
import TournamentBody from "./components/tournament/TournamentBody";
import TournamentLogo from "./components/tournament/TournamentLogo";

const TournamentLayout = () => {
  return (
    <div className={`${tournamentLayout}`}>
      <TournamentLogo />
      <TournamentBody />
      <StartButton />
    </div>
  );
};

export default TournamentLayout;
