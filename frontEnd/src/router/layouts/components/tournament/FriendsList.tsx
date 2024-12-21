import {useState} from 'react'
import { tournamentRobot } from '@/media-exporting'
import { inviteFriend } from '@/media-exporting'
import Svg from './Svg'
import { UserDataType } from '@/src/states/authentication/userSlice'

interface FriendProps{
	index: any,
	name: string,
	online: boolean
}

const Friend = ({index, name, online=false}: FriendProps) => {
	let color = "#ff4d02"
	if (online)
		color = "#02ff39"

	return (
		<div className="Friend">
			<div className="FriendInfo">
				<div className="FriendPfpContainer">
					<img className='image' style={{display: "inline"}}src={tournamentRobot}/>
				</div>
				<div className="FriendOnline" style={{backgroundColor: `${color}`}}></div>
				<div key={index}>{name}</div>
			</div>
			<div className="InviteFriend">
				<Svg src={inviteFriend} width={15}/>
			</div>

		</div>
	)
}

const FriendsList = (props) => {
	const [joined, setJoined] = useState(false)

	console.log(props.FriendsData)

	const handleJoin = () => {
		setJoined(true)
	}
	let color = "#B87EA5";
	if (joined)
		color = "#656565"
	return (
		<div className="FriendsList">
			<button style={{background: `${color}`}} className="JoinButton" onClick={handleJoin}>JOIN</button>
			{props.FriendsData && props.FriendsData.map((friend : UserDataType , index:number) => (
				<Friend index={index} name={friend.username+""} online={friend.is_online ? true : false} key={friend.username}/>
			))}

		</div>
	)
}

export default FriendsList;
