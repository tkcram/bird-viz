import { useState } from 'react';
import { useNavigate } from "react-router-dom";

const Home = () => {
	const [searchTerm, setSearchTerm] = useState('');
	const navigate = useNavigate();

	const updateSearch = (event) => {
		setSearchTerm(event.target.value);
	}

	const onSearch = () => {
		navigate(`/bird/${searchTerm}`);
	}

	return (
		<div id='homepage'>
			<h1 class="title">Birds of Wingspan</h1>
			<div>
				<p class="question">Have you ever wanted to know more about a bird you've drawn during a game of Wingspan?</p>
				<p class="question">Ever wondered if what they eat in the game is what they eat in real life?</p>
				<p class="question">Maybe you wanted a higher fidelity map than the little icon in the bottom?</p>
				<p class="question">Well look no further! Just enter it's common name below and discover a trove of data!</p>
			</div>
			<div>
				<input class="search" name="class" onChange={updateSearch} placeholder="pick a bird, any bird..."/>
				<button class="searchBtn" onClick={onSearch}>Search</button>
				<p class="hint">(Hint: Try Bald Eagle, Osprey, or Atlantic Puffin. We actually tested those...)</p>
			</div>
		</div>
	)
}

export default Home;
