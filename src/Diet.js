import {useEffect} from 'react'
import * as d3 from 'd3'

const Diet = ({commonName,invertebrate,seed,fish,fruit,rodent,nectar,wild}) => {
    useEffect(() => {
        if (document.querySelector("#diet g")){
            return;
        }

        const dietSvg = d3.select("#diet");
        const dietColor = d3.scaleOrdinal(d3.schemeSpectral[9]);

        //Donut Chart
        d3.csv("/data/avianDietTable.csv").then(dataset => {
            dataset.forEach(function(d) {
                if (d.species.toLowerCase() === commonName.toLowerCase() && d.prey_level === "Class"){
                    d.value = +d.pct_wt_or_vol;
                }
            });

            const outerRadius = 100;
            const innerRadius = 60;

            const arcs = d3.arc()  
            .innerRadius(innerRadius) 
            .outerRadius(outerRadius)

            const pie = d3.pie()
            .value((d)=> d.value)

            const groups = dietSvg.selectAll("g.arc")
            .data(pie(dataset))
            .enter()
            .append("g")
            .attr("class", "arc")
            .attr("transform", `translate(${outerRadius+70},${outerRadius+50})`);

            groups.append("path")
            .attr("fill", (d,i)=> dietColor(i))
            .attr("stroke","black")
            .attr("d", arcs)
            .attr("class","dietSegments")
            .style("cursor","crosshair")
            .on("mouseover", function(event, d) {          
                d3.select("#dietTooltip")
                .transition()
                .duration(300)
                .style("opacity", 1)
                .style('display','block')
                .style("left", `${event.offsetX+5}px`)
                .style("top", `${event.offsetY+5}px`)

                console.log(this.getAttribute("fill"))

                d3.select(this).style("stroke", "red");

                d3.select("#dietTooltip")
                .html(`${d.data.taxon} <br> ${d.value}%`);
            }) 
            .on("mouseout", function (event, d, i){
                d3.select("#dietTooltip")
                .transition()
                .style("opacity", 0);

                d3.select(this).style("stroke", "black");
            })
            .on("mousemove", (event, d) =>{
                d3.select("#dietTooltip")
                .style("left", `${event.offsetX+5}px`)
                .style("top", `${event.offsetY+5}px`)
            })
            // .on("click",(event, d) =>{
            //     const taxon = d.data.taxon;
            //     d3.selectAll(`.dietNode:not([data-type="${taxon}"])`)
            //         .style("display","none")

            //     d3.selectAll(`[data-type="${taxon}"]`)
            //         .style("display","block")
            // });
        });

        // Nodes
        const preyData = {
            nodes: [
              {id:0, name:"Oliver",r:60, taxonSpecies: "Yeti"},
              {id:1, name:"Charlotte",taxonClass:"Teleostei [teleost fishes]", taxonSpecies: "Ariopsis felis"},
              {id:2, name:"Ava",taxonClass:"Teleostei [teleost fishes]",taxonSpecies: "Ameiurus nebulosus"},
              {id:3, name:"Liam",taxonClass:"Mammalia [mammals]",taxonSpecies: "Ovis aries"},
              {id:4, name:"Ethan",taxonClass:"Aves [birds]",taxonSpecies: "Anas platyrhynchos"},
              {id:5, name:"Amelia",taxonClass:"Aves [birds]",taxonSpecies: "Fulica americana"}
              ],
            links: [
              {source: 0, target: 1},
              {source: 0, target: 2},
              {source: 0, target: 3},
              {source: 0, target: 4},
              {source: 0, target: 5}
              ]
            };

        const nodeImage = (taxon, element) => {
            taxon = taxon.replace(" ","_")
            fetch(`https://en.wikipedia.org/w/api.php?action=query&origin=*&format=json&titles=${taxon}&redirects=1`)
                .then(response => response.json())
                .then(data => {
                    const pageId = Object.keys(data.query.pages)[0]
                    fetch(`https://en.wikipedia.org/w/api.php?action=query&origin=*&format=json&pageids=${pageId}&prop=pageimages`)
                        .then(response2 => response2.json())
                        .then(data2 => element.setAttribute("href", data2.query.pages[pageId].thumbnail.source));
                });
        };
        
        const simulation = d3.forceSimulation(preyData.nodes)
                            .force("charge", d3.forceManyBody().strength(-4000))
                            .force("link", d3.forceLink(preyData.links))
                            .force("center", d3.forceCenter().x(177).y(167));

        const nodes = dietSvg.selectAll("circle")
                        .data(preyData.nodes)
                        .enter()
                        .append("svg")
                        .attr("class","dietNode")
                        .attr("data-type", d => d.taxonClass)
                        .style("fill", (d,i)=>"none")
                        .style("stroke", "black")
                        .style("display","none")
                        .style("stroke-width", 1);

        nodes.append("clipPath")
            .attr("id", d => `circleView-${d.name}`)
            .append("circle") 
            .attr("r", d=> 20)
            .attr("cx", 25)
            .attr("cy", 25);

        nodes.append("image")
            .attr("width", 50)
            .attr("height", 50)
            .attr("dummy", function(d) {
                nodeImage(d.taxonSpecies, this)
            })
            .attr("clip-path",d => `url(#circleView-${d.name})`)
            .on("mouseover", (event, d)=> {          
                d3.select("#dietTooltip")
                .transition()
                .duration(300)
                .style("opacity", 1)
                .style('display','block')
                .style("left", `${event.offsetX+5}px`)
                .style("top", `${event.offsetY+5}px`)

                d3.select("#dietTooltip")
                .html(`Value: <br> ${d.name}`);
            }) 
            .on("mouseout", (event, d)=>{
                d3.select("#dietTooltip")
                .transition()
                .style("opacity", 0);
            })
            .on("mousemove", (event, d) =>{
                d3.select("#dietTooltip")
                .style("left", `${event.offsetX+5}px`)
                .style("top", `${event.offsetY+5}px`)
            })

        simulation.on("tick", (event,d)=>{
            nodes.attr("x", d=>d.x - 20)
                .attr("y", d=>d.y - 20)
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className='module' id='dietModule'>
            <div className='moduleTitle'>
                <p>Diet</p>
                <p>{invertebrate && `Invertebrate: ${invertebrate}`} {seed && `Seed: ${seed}`} {fish && `Fish: ${fish}`} {rodent && `Rodent: ${rodent}`} {fruit && `Fruit: ${fruit}`} {wild && `Wild: ${wild}`}</p>
            </div>
            <svg id='diet' width="25vw" height="max(calc(50vh - 67px), 343px)"/>
            <div id='dietTooltip'></div>
        </div>
    )
}

export default Diet