import {useEffect, useState} from 'react'
import { useParams, useNavigate } from "react-router-dom";
import * as d3 from 'd3'
import Biography from './Biography'
import Diet from './Diet'
import Lifecycle from './Lifecycle'
import Range from './Range'
import Wingspan from './Wingspan'

const Bird = () => {
	const { name } = useParams();
	const [gameData, setGameData] = useState(null)
	const [bioData, setBioData] = useState(null)
	const navigate = useNavigate();

	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(() => {
		const getGameData = () => {
			d3.csv("/data/gameData.csv").then(dataset => {
				const dataKeyedByName = {}
				dataset.forEach((bird) => {
					dataKeyedByName[bird["Common name"].toLowerCase()] = bird
				})

				const searchedBird = dataKeyedByName[name.toLowerCase()];

				if (searchedBird) {
					setGameData(searchedBird);
				} else {
					navigate('/error');
				}
			})
		}

		const getBioData = () => {
			d3.csv("/data/bioData.csv").then(dataset => {
				const dataKeyedByName = {}
				dataset.forEach((bird) => {
					dataKeyedByName[bird["Common name"].toLowerCase()] = bird
				})

				const searchedBird = dataKeyedByName[name.toLowerCase()];
				if (searchedBird) {
					setBioData(searchedBird);
				}
			})
		}

		if (!gameData) {
			getGameData()
		}
		if (!bioData) {
			getBioData();
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	
	if (!gameData || !bioData) {
		return <p>Loading...</p>
	}

	return (
		<main>
			<div className='row'>
				<div className='module' id='hero'>
					<img src={bioData["Hero Href"]}/>
				</div>
				<Biography gameData={gameData} description={bioData["Description"]}/>
			</div>
			<div className='row'>
				<Diet commonName={gameData["Common name"]} invertebrate={gameData["Invertebrate"]} seed={gameData["Seed"]} fish={gameData["Fish"]} fruit={gameData["Fruit"]} rodent={gameData["Rodent"]} nectar={gameData["Nectar"]} wild={gameData["Wild (food)"]}/>
				<Lifecycle bioData={bioData} nestType={gameData["Nest type"]} eggCapacity={gameData["Egg capacity"]}/>
				<Range commonName={gameData["Common name"]} isWetland={gameData.Wetland === "X"} isGrassland={gameData.Grassland === "X"} isForest={gameData.Forest === "X"}/>
				<Wingspan wingspan={gameData.Wingspan}/>
			</div>
		</main>
	)
}

export default Bird;
