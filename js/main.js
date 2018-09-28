
var margin = {left: 100, right: 10, top: 10, bottom: 100}
var width = 600 - margin.left - margin.right;
var height = 400 - margin.top - margin.bottom;

var svg= d3.select("#chart-area").append("svg")
.attr("width", width +  margin.left + margin.right)
.attr("height",height + margin.top + margin.bottom);
var g = svg.append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

var data = d3.json("data/buildings.json").then((data)=>{
    //console.log(data);
    data.forEach(item => {
        item.height = +item.height   //convert string to number using +
    });

        var x = d3.scaleBand()
                  .domain(data.map((d) => {return d.name} ))
                  .range([0, 400])
                  .paddingInner(0.2)
                  .paddingOuter(0.2);

       var y = d3.scaleLinear()
                 .domain([0, d3.max(data, (d) => {return d.height})])
                 .range([0,400]); 
        var bars = g.selectAll("rect").data(data);

            bars.enter()
                .append("rect")
                .attr("x", (d, i) => {
                        console.log( x(d.name))
                    return x(d.name);

                })
                .attr("y", 10)
                .attr("width", x.bandwidth)
                .attr("height", (d) => {
                    return y(d.height);
                })
                .attr("fill", "orange")
    }).catch((error)=>{
    console.log(error);
})


    
