const width = 500;
const height = 400;
onoffstate = 0



let delta = 0;
let A = 0;
let B = 0
let a = 0;
let b = 0;

var fullhalf = 0;
let svg = d3.select('#graph')
        .attr('width', width)
        .attr('height', height)
        .style('background-color', 'black');

        var screen = svg.append("g");


//////////////////function generator
document.getElementById("Aslider").oninput = function() {
        if (onoffstate === 1) {
                document.getElementById("Avalue").innerHTML = document.getElementById("Aslider").value;
                A = document.getElementById("Aslider").value;
                d3.select('.locus').remove();
                addFigure();       
        }
      };
document.getElementById("Avalue").innerHTML = document.getElementById("Aslider").value;






document.getElementById("Bslider").oninput = function() {

        if (onoffstate === 1) {
                document.getElementById("Bvalue").innerHTML = document.getElementById("Bslider").value;
                B = document.getElementById("Bslider").value;
                d3.select('.locus').remove();
                addFigure();  
        }
      };
document.getElementById("Bvalue").innerHTML = document.getElementById("Bslider").value;






document.getElementById("aslider").oninput = function() {

        if (onoffstate === 1) {
                document.getElementById("avalue").innerHTML = document.getElementById("aslider").value;
                a = document.getElementById("aslider").value;
                d3.select('.locus').remove();
                addFigure();  
        }
      };
document.getElementById("avalue").innerHTML = document.getElementById("aslider").value;


document.getElementById("assign").onclick = () => {
        if (onoffstate == 1) {
                b = Number((Math.random()*3.14).toPrecision(2));
                d3.select('.locus').remove();
                addFigure();
                console.log(b);
        }
          
        
}
document.getElementById("enterReading").disabled = true;

let enteredValue = 233;
let error;
let table =  document.getElementById("observation");



/////////////observations/////////////////////
document.getElementById("checkAnswer").onclick = ()=>{
        enteredValue = Number(document.getElementById("calculated").value).toPrecision(2);
        error = ((enteredValue-b)*100/b).toPrecision(2)
        if (onoffstate == 1) {
                if (error >10) {
                        document.getElementById("result").innerHTML = "Error is very high =" + error.toString() + "%";
                }  
                else {
                        document.getElementById("result").innerHTML = "Error in calculation =" + error.toString() + "%" +"\n"+"you may enter the reading";
                        document.getElementById("enterReading").disabled = false;
                }
                
        }
}
var sno = 1;
document.getElementById("enterReading").onclick = ()=> {
    var newRow = table.insertRow();
    var newCellsno  = newRow.insertCell(0);
    var newCellFrequency  = newRow.insertCell(1);
    var newCellCalculated  = newRow.insertCell(2);
    var newCellActual  = newRow.insertCell(3);
    var newCellError  = newRow.insertCell(4);
        
    newCellsno.innerHTML = sno.toString();
    newCellFrequency.innerHTML = a.toString();

    newCellCalculated.innerHTML = enteredValue.toString();
    newCellActual.innerHTML = b.toString();
    newCellError.innerHTML = error.toString();
    sno++;
    document.getElementById("enterReading").disabled = true;

    }






document.getElementById("power").onclick = ()=>{
        if(onoffstate === 0) {
                document.getElementById("power").innerHTML = "Turn Off";        
                addFigure();
                onoffstate = 1;
        }
        else {
                
                document.getElementById("power").innerHTML = "Turn On";    
                
                onoffstate = 0;
                d3.select('.locus').remove();
        }
        
}




////oscilloscope
screen.append("rect")
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", width)
        .attr("height", height)
        .style("stroke", "lightgreen")
        .style("fill", "grey")
        .style("stroke-width", 5);
                        
for (i = 0; i<10; i++) {
    screen.append("line")
          .attr("x1",50*i)
          .attr("x2",50*i)
          .attr("y1",0)
          .attr("y2",height)
          .style("stroke", "white");
}
for (i = 0; i<8; i++) {
    screen.append("line")
            .attr("x1",0)
            .attr("x2",width)
            .attr("y1",50*i)
            .attr("y2",50*i)
            .style("stroke", "white");
}
let scaleX = d3.scaleLinear().domain([0,width]).range([0, width]);
let xAxis = d3.axisTop(scaleX).ticks(50).tickFormat("");

let scaleY = d3.scaleLinear().domain([0,height]).range([0, height]);
let yAxis = d3.axisLeft(scaleY).ticks(40).tickFormat("");

screen.append("g").attr("transform", "translate(250,0)")      // This controls the vertical position of the Axis
.call(yAxis);

screen.append("g").attr("transform", "translate(0,200)").call(xAxis);





///figure
let locus = d3.range(-100*Math.PI, 100*Math.PI)
          .map((x) => {
            return {x: A*Math.sin(a*0.01*x + delta), y: B*Math.sin(b*0.01*x)
            }
        });


          
let xScaleAxis =  d3.scaleLinear().domain([-Math.PI,Math.PI]).range([(width/2 -height/2),(width/2+height/2)]);
let yScaleAxis =  d3.scaleLinear().domain([-Math.PI,Math.PI]).range([(height/2+height/2),(height/2-height/2)]);


let scaling = d3.line()
        .x( (d) => {return xScaleAxis(d.x);})
        .y( (d) => {return yScaleAxis(d.y);})
        .curve(d3.curveMonotoneX);


function addFigure() {                
        locus = d3.range(-100*Math.PI, 100*Math.PI)
          .map((x) => {
            return {x: A*Math.sin(a*0.01*x), y: B*Math.sin(b*0.01*x)
            }
        });

        screen.append('path')
        .datum(locus)
        .attr('d', scaling)
        .attr('class', 'locus')
        .attr('stroke', 'yellow')
        .attr('stroke-width',2)
        .attr("fill","none");

}




