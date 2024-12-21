import PlayerHolder from './PlayerHolder'
import MiddleLeftLines from './MiddleLeftLines'
import MiddleRightLines from './MiddleRightLines'

const TournamentBodyMiddleSide = () => {
	return (
		<div className="TournamentBodyMiddleSide">
			<MiddleLeftLines />

			{/* TODO : might refractor this to an own component*/}
			<div className="PlayerHolders">
				<PlayerHolder   joinable={false} id={0} winner={false}/>
				<PlayerHolder   joinable={false} id={0} winner={false}/>
			</div>

			<MiddleRightLines />
		</div>
	)
}

export default TournamentBodyMiddleSide;
