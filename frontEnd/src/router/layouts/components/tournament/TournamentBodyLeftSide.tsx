import PlayerHolder from './PlayerHolder'

const TournamentBodyLeftSide = (props) => {
	return (
		<div className="TournamentBodyLeftSide">
			<PlayerHolder id={1} winner={false} joinable={true} FriendsData={props.FriendsData} focusedId={props.focusedId} setFocusedId={props.setFocusedId}/>
			<PlayerHolder id={2} winner={false} joinable={true} FriendsData={props.FriendsData} focusedId={props.focusedId} setFocusedId={props.setFocusedId}/>
		</div>
	)
}

export default TournamentBodyLeftSide;
