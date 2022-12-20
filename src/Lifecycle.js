import {useEffect} from 'react'
import * as d3 from 'd3'

const Lifecycle = ({bioData,nestType,eggCapacity}) => {
	useEffect(() => {

		if (document.querySelector("#lifecycle g")){
			return;
		}

		const lifecycleSvg = d3.select("#lifecycle")
		const lifecycleColor = ""


		const lifecycleData = [
			{stage: "birth", time:1,text:`Clutch Size: ${bioData['Clutch Size']}`},
			{stage: "incubation", time:bioData['Incubation Period'],text:`Egg Description: ${bioData['Egg Description']}`},
			{stage: "nestling", time:bioData['Nestling Period'],text:`Hatchling Description: ${bioData['Hatchling description']}`},
			{stage: "adulthood", time:bioData['Mating age'],text:`Monogamous: ${bioData['Monogamous']}`},
			{stage: "death", time:bioData['Lifespan'],text:``}
			];

		const maxAge = lifecycleData[lifecycleData.length-1].time;

		function lifecycleScale(i) {return Math.log2(i)*20+25;};

		// Axis
		const axisScale = d3.scaleLog()
				.domain([1, maxAge]) 
				.range([lifecycleScale(1), lifecycleScale(maxAge)]); 

		const axis = d3.axisLeft()
				.scale(axisScale) 
				.ticks(0);

		lifecycleSvg.append("g")
				.attr("class", "axis") 
				.attr("transform", "translate(175,0)")
				.call(axis);

		//Nodes
		lifecycleSvg.selectAll("circle")
			.data(lifecycleData)
			.enter()
			.append("circle")
			.attr("cx",(d) => 175)
			.attr("cy",(d) => lifecycleScale(d.time)) 
			.attr("r",8) 
			.attr("fill",d=>d.time>0?"red":"none");

		//Text
		lifecycleSvg.selectAll("text")
			.data(lifecycleData)
			.enter()
			.append("text")
	        .attr("x", (d, i) => i % 2 ? 25 : 200)
	        .attr("y", (d) => lifecycleScale(d.time)+10) 
	        .text((d) => d.time<365 ? `${d.stage}: ${d.time} days` : `${d.stage}: ${d.time/365} years`)
	        .style("cursor","pointer")

	        .on('click',(event, d) =>{
	        	console.log(event)
                d3.select("#lifecycleTooltip")
                .transition()
                .duration(300)
                .style("opacity", 1)
                .style('display','block')
                .style("left", `${event.offsetX}px`)
                .style("top", `${event.offsetY}px`)

                d3.select("#lifecycleTooltip")
                .html(`${d.text}`);
	        });
	}, [])

	return (
		<div className='module' id="lifecyleModule">
            <div className='moduleTitle'>
	            <p>Lifecycle</p>
	            <p>{`Nest: ${nestType}, Clutch: ${eggCapacity} egg(s)`}</p>
            </div>
			<svg id='lifecycle' width="25vw" height="max(calc(50vh - 67px), 343px)"/>
			<div id='lifecycleTooltip'></div>
		</div>
	)
}

export default Lifecycle