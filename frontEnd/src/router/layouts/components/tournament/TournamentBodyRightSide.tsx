import PlayerHolder from './PlayerHolder'

const TournamentBodyRightSide = (props) => {
	return (
		<div className="TournamentBodyRightSide">
			<PlayerHolder id={3} winner={false} joinable={true} FriendsData={props.FriendsData} focusedId={props.focusedId} setFocusedId={props.setFocusedId}/>
			<PlayerHolder id={4} winner={false} joinable={true} FriendsData={props.FriendsData} focusedId={props.focusedId} setFocusedId={props.setFocusedId}/>
		</div>
	)
}

export default TournamentBodyRightSide;
