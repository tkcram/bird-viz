import {useEffect} from 'react'
import * as d3 from 'd3'
import * as topojson from 'topojson'

const Range = ({commonName, isWetland,isGrassland,isForest}) => {
	useEffect(() => {
		if (document.querySelector("#range g")){
				return;
			}
		
		const rangeSvg = d3.select("#range")

		//Map
		const rangeG = rangeSvg.append("g");

		const projection = d3.geoAlbersUsa()
							.scale(400) 
							.translate([180, 150]); 

		const geoPath = d3.geoPath(projection);

		// let data = new Map(); 

		Promise.all([
			d3.json("/data/counties-10m.json"),
			d3.json("/data/rangeData.json")
		])
		.then(function(files) {

			let geodata = files[0];
			const counties = topojson.feature(geodata, geodata.objects.counties).features;

			const rangeMax = 10000
			const rangeColor = d3.scaleSequential() 
				.domain([0, Math.log(rangeMax)])
				.interpolator(d3.interpolateGreens);

			rangeG.selectAll("path")
				.data(counties)
				.join("path") 
				.attr("d", geoPath)
				.attr("stroke","black")
				.attr("stroke-width","0")
				.attr("fill", function (d) {
					d.pop = 0
					if (files[1][d.id]){
						d.pop = files[1][d.id][commonName] || 0;
					}
					return rangeColor(Math.log(d.pop));
				})
				.on("mouseover", function(event, d) {
		            d3.select(this)
		            .attr("stroke-width","1px");

		            const rangeInnertext = `Sightings in ${d.properties.name} county (2021): ${d.pop}`
		            document.querySelector('#rangeText').innerText = rangeInnertext
		        }) 
		        .on("mouseout", function(event, d) {
		            d3.select(this)
					.attr("stroke-width","0");
		        });

		    const rangeScaleSvg = d3.select("#rangeScaleText")

    		const rangeAxisScale = d3.scaleLog()
				.domain([1, rangeMax]) 
				.range([0, 140]); 

			const rangeAxis = d3.axisBottom()
				.scale(rangeAxisScale) 
				.tickValues([10,100,1000,rangeMax]);

			rangeScaleSvg.append("g")
				.attr("class", "axis") 
				.call(rangeAxis);
		});
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<div className='module rangeModule'>
            <div className='moduleTitle'>
	            <p>Range</p>
	            <p>Habitat: {isForest && "Forest"}{isGrassland && " Grassland"}{isWetland && " Wetland"}</p>
            </div>
			<p id='rangeText'>Hover over for count</p>
			<svg id='range' width="25vw" height="max(calc(50vh - 67px), 343px)"/>
			<div id='rangeScale'>
				<img id='rangeScaleImg' src='/assets/greens.png' alt=""/>
				<svg id='rangeScaleText' height="25" width="10vw"></svg>
			</div>
		</div>
	)
}

export default Range