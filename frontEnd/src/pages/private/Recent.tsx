import { recent } from "./styles";

const data = [
  { user: "alvares1111", state: "lose", against: "user1" },
  { user: "alvares222", state: "win", against: "user1" },
  { user: "alvares3333", state: "lose", against: "user1" },
  { user: "alvares", state: "win", against: "user1" },
  { user: "alvares", state: "lose", against: "user1" },
  { user: "alvares", state: "win", against: "user1" },
  { user: "alvares", state: "lose", against: "user1" },
  { user: "alvares", state: "win", against: "user1" },
  { user: "alvares", state: "lose", against: "user1" },
  { user: "alvares", state: "win", against: "user1" },
  { user: "alvares", state: "lose", against: "user1" },
  { user: "alvares", state: "win", against: "user1" },
  { user: "alvares", state: "lose", against: "user1" },
  { user: "alvares", state: "win", against: "user1" },
  { user: "alvares", state: "lose", against: "user1" },
  { user: "alvares", state: "win", against: "user1" },
  { user: "alvares", state: "lose", against: "user1" },
  { user: "alvares", state: "win", against: "user1" },
  { user: "alvares", state: "lose", against: "user1" },
  { user: "alvaressssss", state: "win", against: "user1" },
];

const Recent = () => {
  return (
    <div className={`${recent}`}>
      <div className="">
        {data &&
          data.length &&
          data.map((match, index) => (
            <p className="" key={index}>
              <span className={`${match.state}`}>{match.user + " "}</span>
              {match.state} against
              <span className={match.state === "win" ? "lose" : "win" }> {" " + match.against}</span>
            </p>
          ))}
        {/* <div className=""></div> */}
      </div>
    </div>
  );
};

export default Recent;
