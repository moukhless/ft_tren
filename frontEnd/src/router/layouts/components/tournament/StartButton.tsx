import {useState} from 'react'


const StartButton = () => {
	const [activated, setActivated] = useState(false)

	const handleStartColorChange = () => {
		setActivated(true)
	}
	return (
		<div className='StartTournament'>
			<button className="StartButton">
				{!activated && <span className="StartButtonText" onClick={handleStartColorChange}>START</span> }
				{activated && <span style={{color: "white", backgroundColor: "#b30683"}} className="StartButtonText" onClick={handleStartColorChange}>START</span> }
			</button>
		</div>
	)
}

export default StartButton;