import {useEffect} from 'react'
import * as d3 from 'd3'

const Wingspan = ({wingspan}) => {
    useEffect(() => {
    	if (document.querySelector("#wingspan g")){
    		return;
    	}

		const wingspanSvg = d3.select("#wingspan")
		const wingspanImage = ["M0.5,99.2c0,0,15.3,3.1,46.1-2.4c29.3-5.2,40-8.6,41.4-16.1c0,0-11.1,0.8-13.1,0.8c0,0,27.4-4.7,30.8-7.2 c3.4-2.5,14-9.6,7.8-9.3s-14.3,1.1-17,1.1c0,0,49.3-9.2,56.1-13.1c6.8-3.9,20.4-13.9,13.2-12.3S139,46.1,137,46.1 c0,0,47.1-13.1,49.2-14.5c2-1.4,20-15.9,12.6-14.1c-7.5,1.8-25.1,6.7-29.3,7.3s5.6-2.2,11.3-5.5s20-19.6,13.9-17.1 c-6.1,2.4-39.1,14.3-42.8,14.1c0,0,8.3-3.4,10.2-6.1c2.4-3.5,7.1-12,0.3-9.8S63.1,30.2,54.5,36.9S27.9,64.2,10.3,75.5 C0.1,82,0.5,99.2,0.5,99.2"]

		// Max Images
		wingspanSvg.append('g')
			.append('path')
			.attr("d", wingspanImage)
			.attr("stroke", "white")
			.attr("stroke-width", "1px")
			.attr("fill", "blue")
			.style('opacity',0)
			.style("z-index",99)
			.attr("class","Condor")
			.attr("transform",`translate(175,100) scale(-${277/2/200},1.5)`);

		wingspanSvg.append('g')
			.append('path')
			.attr("d", wingspanImage)
			.attr("stroke", "white")
			.attr("stroke-width", "1px")
			.attr("fill", "blue")
			.style("z-index",99)
			.style('opacity',0)
			.attr("class","Condor")
			.attr("transform",`translate(175,100) scale(${277/2/200},1.5)`);

		// Data Image
		wingspanSvg.append('g')
			.append('path')
			.attr("d", wingspanImage)
			.attr("stroke", "white")
			.attr("stroke-width", "1px")
			.attr("fill", "black")
			.attr("transform",`translate(175,100) scale(-${wingspan/2/200},${wingspan/200})`);

		wingspanSvg.append('g')
			.append('path')
			.attr("d", wingspanImage)
			.attr("stroke", "white")
			.attr("stroke-width", "1px")
			.attr("fill", "black")
			.attr("transform",`translate(175,100) scale(${wingspan/2/200},${wingspan/200})`);

		// wingspanSvg.append("line")
		// 	.attr("x1",175-wingspan/2)
		// 	.attr("x2",175+wingspan/2)
		// 	.attr("y1",275)
		// 	.attr("y2",275)
		// 	.attr("stroke", "#000000")
		// 	.attr("stroke-width", ".5px");

		// wingspanSvg.append("text")
		// 	.attr("x", 175) 
		// 	.attr("y", 290) 
		// 	.attr("text-anchor", "middle")
		// 	.attr("class", "moduleTitle")
		// 	.text(`${wingspan} cm`);

		// Min Image
		wingspanSvg.append('g')
			.append('path')
			.attr("d", wingspanImage)
			.attr("stroke", "white")
			.attr("stroke-width", "1px")
			.attr("fill", "red")
			.style('opacity',0)
			.style("z-index",-99)
			.attr("class","Hummingbird")
			.attr("transform",`translate(175,100) scale(-${10/2/200},0.1)`);

		wingspanSvg.append('g')
			.append('path')
			.attr("d", wingspanImage)
			.attr("stroke", "white")
			.attr("stroke-width", "1px")
			.attr("fill", "red")
			.style('opacity',0)
			.style("z-index",-99)
			.attr("class","Hummingbird")
			.attr("transform",`translate(175,100) scale(${10/2/200},0.1)`);

        d3.selectAll(".wingspanCheckbox")
        	.on("change", (event, d) => {
        		const birdChecked = event.target.checked

	          	d3.selectAll(`.${event.target.value}`)
	          	.style("opacity",(d)=> birdChecked ? 1 : 0)
        	})
	// eslint-disable-next-line react-hooks/exhaustive-deps
	},[])

	return (
		<div className='module wingspanModule'>
            <div className='moduleTitle'>
	            <p>Wingspan</p>
	            <p>{wingspan}cm</p>
            </div>
			<div className='wingspanFilter'>
				{/*<p>Compare:</p> */}
				<div>
					<input type="checkbox" className='wingspanCheckbox' name="birdWingspan1" value="Condor"/>
					<label htmlFor="birdWingspan1"> Condor (277cm)</label>
				</div>
				<div>
					<input type="checkbox" className='wingspanCheckbox' name="birdWingspan2" value="Hummingbird"/>
					<label htmlFor="birdWingspan2"> Hummingbird (10cm)</label>
				</div>
			</div>
			<svg id='wingspan' width="25vw" height="max(calc(50vh - 88px), 322px)"/>

		</div>
	)
}

export default Wingspan