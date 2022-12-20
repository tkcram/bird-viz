import {useEffect} from 'react'
import * as d3 from 'd3'

const Biography = ({ gameData, description }) => {
	const commonName = gameData["Common name"];
	const sciName = gameData["Scientific name"];
	const points = gameData["Victory points"];
	const powerText = gameData["Power text"];
	const isPredator = gameData.Predator === "X";
	const isFlocking = gameData.Flocking === "X";
	const isBonus = gameData["Bonus card"] === "X";

    useEffect(() => {
        if (document.querySelector("#diet g")){
            return;
        }  
              
    }, [])

    return (
		<div className='module' id='bioModule'>
			<div id="titleBox">
				<div className='bioTitles' id="bioTitle1">
					<h2>{commonName}</h2>
				</div>
				<div className='bioTitles' id="bioTitle2">
					<div>
						<h3><em>{sciName}</em></h3>
					</div>
{/*					<div>
						<h3>Order: <span>Accipitriformes</span></h3>
					</div>
					<div>
						<h3>Family: <span>Accipitridae</span></h3>
					</div>*/}
				</div>
				<div className='bioTitles' id='bioTitle3'>
					<p>{points} Points {isPredator && "Pred"} {isFlocking && "Flock"} {isBonus && "Bonus"}</p>
				</div>
				<div className='bioTitles' id='bioTitle4'>
					<p>{powerText}</p>
				</div>
			</div>
			<div id="bioBox">
				<p>{description}</p>
			</div>
		</div>
		)
}

export default Biography