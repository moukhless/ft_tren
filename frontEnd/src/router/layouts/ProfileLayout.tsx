import { Fragment, useEffect, useState } from "react";
import { profileLayout } from "../styles";
import { NavLink, Outlet, useParams } from "react-router-dom";
import Stats from "./components/profile/Stats";
import { profileIcon } from "@/media-exporting";
import WaletState from "./components/profile/WaletStats";
import UseAxiosPrivate from "@/src/services/hooks/UseAxiosPrivate";
import { UserDataType } from "@/src/states/authentication/userSlice";
import { RootState, store } from "@/src/states/store";
import { useSelector } from "react-redux";
const matchesData = {
  data: [
    {
      //aiStates
      matches: 27,
      win: 24,
      lose: 3,
    },
    {
      //tournament states
      matches: 20,
      win: 17,
      lose: 3,
    },
    {
      //classic states
      matches: 15,
      win: 12,
      lose: 3,
    },
  ],
};

enum statsType {
  AISTATS,
  TOURNAMENTSTATS,
  CLASSICSTATS,
}

const ProfileLayout = () => {
  const { userName } = useParams();
  const currentUserData = useSelector((state: RootState) => state.user.value);
  const [data, setData] = useState<UserDataType>(currentUserData);
  const axiosPrivateHook = UseAxiosPrivate();
  useEffect(() => {
    if (userName && userName !== currentUserData) {
      axiosPrivateHook
        .post("search_username", {
          username: userName,
        })
        .then((res) => {
          setData(res.data.user);
        })
        .catch((error) => {
          console.log(error);
          setData(currentUserData);
        });
    } else {
      setData(currentUserData);
    }
  }, [userName, currentUserData]);

  return (
    <Fragment>
      <div className={`${profileLayout}`}>
        <div className="aiStats">
          <Stats
            title={"AI STATS"}
            data={matchesData.data[statsType.AISTATS]}
          />
        </div>
        <div className="classicTournamentStats">
          <div className="classicStats">
            <Stats
              title={"CLASSIC STATS"}
              data={matchesData.data[statsType.CLASSICSTATS]}
            />
          </div>
          <div className="tournamentStats">
            <Stats
              title={"TOURNAMENT STATS"}
              data={matchesData.data[statsType.TOURNAMENTSTATS]}
            />
          </div>
        </div>
        <div className="profileStatsLayout">
          <div className="profile-side-bar">
            <NavLink
              className=""
              to={(userName ? userName + "/" : "") + "recent"}
            >
              Recent
            </NavLink>
            <NavLink
              className=""
              to={(userName ? userName + "/" : "") + "details"}
            >
              Profile
            </NavLink>
            {(!userName ||
              userName === store.getState().user.value.username) && (
              <>
                <NavLink className="" to="friends">
                  Friends
                </NavLink>
                <NavLink className="" to="requests">
                  requests
                </NavLink>
              </>
            )}
          </div>
          <div className="user-image-link-content">
            <div className="user-image">
              <div className="bg-dangesr">
                <img
                  src={
                    data.avatar
                      ? process.env.BACKEND_API_URL + "" + data.avatar
                      : profileIcon
                  }
                  alt="user image"
                />
              </div>
            </div>
            <div className="link-content">
              <Outlet context={data} />
            </div>
          </div>
        </div>
        <div className="waletStats">
          <WaletState data={data} />
        </div>
      </div>
    </Fragment>
  );
};

export default ProfileLayout;
