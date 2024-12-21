import { useSelector } from "react-redux";
import TournamentBodyLeftSide from "./TournamentBodyLeftSide";
import TournamentBodyMiddleSide from "./TournamentBodyMiddleSide";
import TournamentBodyRightSide from "./TournamentBodyRightSide";
import { RootState } from "@/src/states/store";
import { useEffect, useState } from "react";
import { UserDataType } from "@/src/states/authentication/userSlice";

interface FriendsDataType extends UserDataType {
  joined: boolean;
}

const TournamentBody = () => {
  const friendsDataGlobal = useSelector(
    (state: RootState) => state.friends.value
  );

  const [friendsData, setFriendsData] = useState<FriendsDataType[]>([]);
  useEffect(() => {
    if (!friendsData || !friendsData.length)
      setFriendsData(
        friendsDataGlobal.map((friend) => {
          return { ...friend, joined: false };
        })
      );
    else {
      setFriendsData(
        friendsDataGlobal.map((friend) => {
          return {
            ...friend,
            joined: friendsData.find((object) => {
              return object.username === friend.username;
            })?.joined
              ? true
              : false,
          };
        })
      );
    }
    friendsData.map((friend) => {
      return { ...friend, joined: !friend?.joined ? false : true };
    });
  }, [friendsDataGlobal]);


	const [focusedId, setFocusedId] = useState(0)

  return (
    <div className="TournamentBody">
      <TournamentBodyLeftSide FriendsData={friendsDataGlobal} focusedId={focusedId} setFocusedId={setFocusedId}/>
      <TournamentBodyMiddleSide />
      <TournamentBodyRightSide FriendsData={friendsDataGlobal} focusedId={focusedId} setFocusedId={setFocusedId}/>
    </div>
  );
};

export default TournamentBody;
