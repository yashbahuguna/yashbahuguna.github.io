//const { values } = require("d3");

const width = 500;
const height = 400;
var fullhalf = 0;
let svg = d3.select('#graph')
        .attr('width', width)
        .attr('height', height)
        .style('background-color', 'black');

        var screen = svg.append("g");
    //    .attr("transform", function(d, i) {
      //           return "translate(0,0)";
        //});
let dials = d3.select("#dials")
.attr('width', width)
.attr('height', height/2)
.style('background-color', 'black');

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

let scaleY = d3.scaleLinear().domain([0,400]).range([0, height]);
let yAxis = d3.axisLeft(scaleY).ticks(40).tickFormat("");

screen.append("g").attr("transform", "translate(250,0)")      // This controls the vertical position of the Axis
.call(yAxis);

screen.append("g").attr("transform", "translate(0,200)").call(xAxis);

const halfsineData = d3.range(-100, 100)
          .map((x) => {
            return {x: 0.2*x, y: Math.sin(0.2*x)<0?Math.sin(0.2*x):0
            }
          });

          let v_max = 7;
          let y_dial = 1;
          let x_dial = 1;

const fullsineData = d3.range(-100, 100)
          .map((x) => {
            return {x: 0.2*x, y: Math.sin(0.2*x)<0?Math.sin(0.2*x):-1*Math.sin(0.2*x)
            }
          });

let xScaleAxis =  d3.scaleLinear().domain([-1*Math.PI*x_dial,Math.PI*x_dial]).range([(width/2)-width/10, (width/2)+width/10]);
let yScaleAxis =  d3.scaleLinear().domain([-1*y_dial/v_max,y_dial/v_max]).range([height/2 - (height/8), height/2 + (height/8)]);

let sine = d3.line()
                .x( (d) => {return xScaleAxis(d.x);})
                .y( (d) => {return yScaleAxis(d.y);})
                .curve(d3.curveMonotoneX);


////first dial                     
dials.append("circle")
                .attr("r", 20 )
                .attr("cx",50)
                .attr("cy",50)
                .attr("stroke","white")
                .attr("fill", "black")
                .on("click",function() {
                    if (x_dial < 1) x_dial = x_dial*2;
                    else if (x_dial >=1 && x_dial < 5) x_dial++;
                    else x_dial = 0.25;
                    d3.select('.xdialtext').text(x_dial.toString())

                    if (fullhalf == 2) {
                        clearScreen();
                        xScaleAxis =  d3.scaleLinear().domain([-1*Math.PI*x_dial,Math.PI*x_dial]).range([(width/2)-width/10, (width/2)+width/10]);
                        screen.append('path')
                        .datum(fullsineData)
                        .attr('class','full')
                        .attr('d', sine)
                        .attr('stroke', 'yellow')
                        .attr('stroke-width',4)
                        .attr("fill","none");
                        
                    }
                    else if (fullhalf == 1) {
                        clearScreen();
                        xScaleAxis =  d3.scaleLinear().domain([-1*Math.PI*x_dial,Math.PI*x_dial]).range([(width/2)-width/10, (width/2)+width/10]);
                        screen.append('path')
                            .datum(halfsineData)
                            .attr('d', sine)
                            .attr('class', 'half')
                            .attr('stroke', 'yellow')
                            .attr('stroke-width',4)
                            .attr("fill","none");
                    }
                }
                );
                
let xdialtext = dials.append("text")
.attr("x",415)
.attr("y",100)
.attr('class', 'xdialtext')
 .text("1").attr("fill","white");
 
dials.append("text")
.attr("x",30)
.attr("y",100)
 .text("x-scale").attr("fill","white");


////2nd dial                     
dials.append("circle")
.attr("r", 20 )
.attr("cx",200)
.attr("cy",50)
.attr("stroke","white")
.attr("fill", "black")
.on("click",function() {
    if (y_dial < 1) y_dial = y_dial*2;
    else if (y_dial >=1 && y_dial < 5) y_dial++;
    else y_dial = 0.25;
    d3.select('.ydialtext').text(y_dial.toString())

    if (fullhalf == 2) {
        clearScreen();
        yScaleAxis =  d3.scaleLinear().domain([-1*y_dial/v_max,y_dial/v_max]).range([height/2 - (height/8), height/2 + (height/8)]);
        screen.append('path')
        .datum(fullsineData)
        .attr('class','full')
        .attr('d', sine)
        .attr('stroke', 'yellow')
        .attr('stroke-width',4)
        .attr("fill","none");
        
    }
    else if (fullhalf == 1) {
        clearScreen();
        yScaleAxis =  d3.scaleLinear().domain([-1*y_dial/v_max,y_dial/v_max]).range([height/2 - (height/8), height/2 + (height/8)]);
        screen.append('path')
            .datum(halfsineData)
            .attr('d', sine)
            .attr('class', 'half')
            .attr('stroke', 'yellow')
            .attr('stroke-width',4)
            .attr("fill","none");
    }
}
);

let ydialtext = dials.append("text")
.attr("x",375)
.attr("y",50)
.attr('class', 'ydialtext')
.text("1").attr("fill","white");

dials.append("text")
.attr("x",150)
.attr("y",100)
.text("y-scale(Volts)").attr("fill","white");


dials.append("rect")
    .attr("x", 400)
    .attr("y",20)
    .attr("width",50)
    .attr("height",50)
    .attr("fill","none")
    .attr("stroke", "white");


//function generator
const g_width = 400;
const g_height = 800;
generator = d3.select("#generator").attr("width",g_width).attr("height",g_height);

               generator.append("rect")
               .attr("x",0)
               .attr("y",0)
               .attr("width",400)
               .attr("height",200)
               .attr("stroke","black")
               .attr("fill", "lightblue")
               .attr("stroke-width", 4);

let g_state = 0;
let m_readac = 0;
let m_readdc = 0;

generator.append("rect")
               .attr("x",90)
               .attr("y",70)
               .attr("width",100)
               .attr("height",50)
               .attr("stroke","black")
               .attr("fill", "grey")
               .attr("stroke-width", 4)
               .on("click", function() {
                    if(g_state == 1) {
                        fullhalf = 1;
                        clearScreen();
                        m_readdc = (v_max/3.14).toFixed(3); 
                        m_readac = (Math.sqrt((v_max*v_max/4) - (m_readdc*m_readdc))).toFixed(3);
                           
                        
                        xScaleAxis =  d3.scaleLinear().domain([-1*Math.PI*x_dial,Math.PI*x_dial]).range([(width/2)-width/10, (width/2)+width/10]);
                        yScaleAxis =  d3.scaleLinear().domain([-1*y_dial/v_max,y_dial/v_max]).range([height/2 - (height/8), height/2 + (height/8)]);
                    
                        screen.append('path')
                        .datum(halfsineData)
                        .attr('d', sine)
                        .attr('class', 'half')
                        .attr('stroke', 'yellow')
                        .attr('stroke-width',4)
                        .attr("fill","none");

                        d3.select('.multimeterreadingac').text(m_readac.toString()+ "V");
                        d3.select('.multimeterreadingdc').text(m_readdc.toString()+ "V");

                        d3.select('.halfbuttontext').attr("fill", "green");
                        d3.select('.fullbuttontext').attr("fill", "black");

                        document.getElementById("vmaxcheck").disabled = false;
                        document.getElementById("vcheck").disabled = false;
                        document.getElementById("vcheckm").disabled = false;
                        enter.disabled = true;
                        document.getElementById("result").innerHTML = "";
                        document.getElementById("resultm").innerHTML = "";
                        
                   }
               });

halfwavebuttonlabel = generator.append("text")
               .attr("x",100)
               .attr("y",150)
               .attr("class","halfbuttontext")
               .text("Half-Wave")
               .attr("fill","black");



 generator.append("rect")
               .attr("x",190)
               .attr("y",70)
               .attr("width",100)
               .attr("height",50)
               .attr("stroke","black")
               .attr("fill", "grey")
               .attr("stroke-width", 4)
               .on("click", function() {
                    if (g_state == 1) {
                        fullhalf = 2;
                        clearScreen();

                        
                        m_readdc = (2*v_max/3.14).toFixed(3);
                        m_readac = (Math.sqrt((v_max*v_max/2) - (m_readdc*m_readdc))).toFixed(3);

                        xScaleAxis =  d3.scaleLinear().domain([-1*Math.PI*x_dial,Math.PI*x_dial]).range([(width/2)-width/10, (width/2)+width/10]);
                        yScaleAxis =  d3.scaleLinear().domain([-1*y_dial/v_max,y_dial/v_max]).range([height/2 - (height/8), height/2 + (height/8)]);
                        screen.append('path')
                        .datum(fullsineData)
                        .attr('class','full')
                        .attr('d', sine)
                        .attr('stroke', 'yellow')
                        .attr('stroke-width',4)
                        .attr("fill","none");
                        d3.select('.multimeterreadingac').text(m_readac.toString() + "V");
                        d3.select('.multimeterreadingdc').text(m_readdc.toString() + "V");

                        d3.select('.halfbuttontext').attr("fill", "black");
                        d3.select('.fullbuttontext').attr("fill", "green");

                        document.getElementById("vmaxcheck").disabled = false;
                        document.getElementById("vcheck").disabled = false;
                        document.getElementById("vcheckm").disabled = false;
                        enter.disabled = true;
                        document.getElementById("result").innerHTML = "";
                        document.getElementById("resultm").innerHTML = "";
                    }
               });
fullwavebuttonlabel = generator.append("text")
               .attr("x",200)
               .attr("y",150)
               .attr("class","fullbuttontext")
               .text("Full-Wave")
               .attr("fill","black");
//power
generator.append("rect")
               .attr("x",20)
               .attr("y",20)
               .attr("width",30)
               .attr("height",30)
               .attr("stroke","black")
               .attr("fill", "grey")
               .attr("stroke-width", 4)
               .on("click", function() {
                   if (g_state == 0) {
                       g_state = 1;
                       d3.select('.onbutton').attr("fill", "green");
                       document.getElementById("vassign").disabled = true;
                       
                       
                       
                   }
                    else if (g_state == 1) {
                        g_state = 0;
                        fullhalf = 0;
                        m_readac = 0;
                        m_readdc = 0;
                        d3.select('.multimeterreadingac').text("0");
                        d3.select('.multimeterreadingdc').text("0");
                        clearScreen();
                        d3.select('.halfbuttontext').attr("fill", "black");
                        d3.select('.fullbuttontext').attr("fill", "black");
                        d3.select('.onbutton').attr("fill", "black");
                        document.getElementById("vassign").disabled = false;
                        document.getElementById("resultm").innerHTML = "";
                        enter.disabled = true;
                        document.getElementById("vcheck").disabled = true;
                        document.getElementById("vcheckm").disabled = true;
                        document.getElementById("vmaxcheck").disabled = true;
                    }

               });

generator.append("text")
               .attr("x",10)
               .attr("y",70)
               .attr("class","onbutton")
               .text("Power")
               .attr("fill","black");

function clearScreen() {
    d3.select('.half').remove();
    d3.select('.full').remove();
}


///multimeter screen////////////////////////////////////////////////////////////////////////
generator.append("ellipse") //outline
        .attr("cx",g_width/2)
        .attr("rx",200)
        .attr("cy", g_height - 400)
        .attr("ry",100)
        .attr("stroke", "black")
        .attr("fill", "none");


        
generator.append("text")// multimeter heading
            .attr("x",g_width/2 - 90)
            .attr("y",g_height-450)
            .text("Multimeter")
            .attr("fill","black")
            .attr("font-size", "15px")
            .attr("font-family", "Orbitron");



generator.append("rect")//ac screen
            .attr("x",g_width/2 - 100)
            .attr("y",g_height-425)
            .attr("width",200)
            .attr("height",25)
            .attr("fill","none")
            .attr("stroke","black");



generator.append("text")//ac reading
            .attr("x",g_width/2 - 90)
            .attr("y",g_height-405)
            .attr("class","multimeterreadingac")
            .text("0")
            .attr("fill","black")
            .attr("font-size", "20px")
            .attr("font-family", "Orbitron");



generator.append("text")//ac screen label
            .attr("x",g_width/2 - 150)
            .attr("y",g_height-405)
            .text("AC :")
            .attr("fill","black")
            .attr("font-size", "20px")
            .attr("font-family", "Orbitron");


generator.append("rect")//dc screen
            .attr("x",g_width/2 - 100)
            .attr("y",g_height-370)
            .attr("width",200)
            .attr("height",25)
            .attr("fill","none")
            .attr("stroke","black");



generator.append("text")//dc reading
            .attr("x",g_width/2 - 90)
            .attr("y",g_height-350)
            .attr("class","multimeterreadingdc")
            .text("0")
            .attr("fill","black")
            .attr("font-size", "20px")
            .attr("font-family", "Orbitron");



generator.append("text")//dc screen label
            .attr("x",g_width/2 - 150)
            .attr("y",g_height-350)
            .text("DC :")
            .attr("fill","black")
            .attr("font-size", "20px")
            .attr("font-family", "Orbitron");



function assignRandomV () {
    v_max = Math.floor(Math.random() * (11)) + 5;
    console.log(v_max);
}

/////////////////observation buttons////////////////////////////////////////////////////////
document.getElementById("vassign").onclick = ()=>{assignRandomV()};


var enteredValue;
var enteredValuem;
var enteredV_max;
var enter = document.getElementById("enterReading");
var table = document.getElementById("observation");
var sno = 1;



document.getElementById("checkAnswer").onclick = ()=>{
    enteredValue = document.getElementById("vcheck").value;
    enteredValuem = document.getElementById("vcheckm").value;
    enteredV_max = document.getElementById("vmaxcheck").value;

    if (fullhalf === 1){
        if (enteredValue === (1.57).toString()) {
            document.getElementById("result").innerHTML = "Correct!";
            enter.disabled = false;
        }
        else {
            document.getElementById("result").innerHTML = "wrong";
            enter.disabled = true;
        }
    }
    else if (fullhalf == 2) {
        if (enteredValue === (1.11).toString()) {
            document.getElementById("result").innerHTML = "Correct!";
            enter.disabled = false;
        }
        else {
            document.getElementById("result").innerHTML = "wrong";
            enter.disabled = true;
        }
    }

    if (fullhalf === 1){
        if (enteredValuem === (1.57).toString()) {
            document.getElementById("resultm").innerHTML = "Correct!";
        }
        else {
            document.getElementById("resultm").innerHTML = "wrong";
            enter.disabled = true;
        }
    }
    else if (fullhalf == 2) {
        if (enteredValuem === (1.11).toString()) {
            document.getElementById("resultm").innerHTML = "Correct!";
        }
        else {
            document.getElementById("resultm").innerHTML = "wrong";
            enter.disabled = true;
        }
    } 

    if (Number(enteredV_max) == v_max) {
        document.getElementById("resultv").innerHTML = "Correct!";
    }
    else {
        console.log(v_max + enteredV_max)
        document.getElementById("resultv").innerHTML = "wrong";
        enter.disabled = true;
    }
}


enter.onclick = ()=> {
    var newRow = table.insertRow();
    var newCellsno  = newRow.insertCell(0);
    var newCellW  = newRow.insertCell(1);
    var newCellP  = newRow.insertCell(2);
    var newCellAC  = newRow.insertCell(3);
    var newCellDC  = newRow.insertCell(4);
    var newCellF  = newRow.insertCell(5);

    newCellsno.innerHTML = sno.toString();
    if (fullhalf === 1) {
        newCellW.innerHTML = "Half-Rectified<br>Sine Wave";
        newCellF.innerHTML = (1.57).toString();
    }
    else if (fullhalf === 2) {
        newCellW.innerHTML = "Full-Rectified<br>Sine Wave";
        newCellF.innerHTML = (1.11).toString();
    }
    
    newCellP.innerHTML = v_max.toString();
    newCellAC.innerHTML = m_readac.toString();
    newCellDC.innerHTML = m_readdc.toString();
    
    sno++;
}


document.getElementById("vcheck").onclick = ()=>{
    
    enter.disabled = true;
    document.getElementById("result").innerHTML = "";

}

enter.disabled = true;

document.getElementById("vcheckm").onclick = ()=>{
    enter.disabled = true;
    document.getElementById("resultm").innerHTML = "";
}


document.getElementById("vcheckm").onclick = ()=>{
    enter.disabled = true;
    document.getElementById("resultm").innerHTML = "";
}

document.getElementById("vmaxcheck").onclick = ()=>{
    enter.disabled = true;
    document.getElementById("resultv").innerHTML = "";
}

document.getElementById("vmaxcheck").disabled = true;
document.getElementById("vcheck").disabled = true;
document.getElementById("vcheckm").disabled = true;
enter.disabled = true;


/*
halfsineGraph = screen.append('path')
          .datum(HalfsineData)
          .attr('d', sine)
          .attr('stroke', 'yellow')
          .attr('stroke-width',4)
          .attr("fill","none");

/*
let x = []
let y = []
let n = 0;
for (i=-5; i<5; i= i+0.1) {
    x[n] = i;
    y[n] = Math.sin(i);
}
let px = x[0], py = y[0];
n = x.length;

for (i=0; i<n; i++) {
    console.log(x[i],y[i]);
    svg.append('line')
        .style("stroke", "lightgreen")
        .style("stroke-width", 5)
        .attr("x1", x[i])
        .attr("y1", y[i])
        .attr("x2", px)
        .attr("y2", py);
        px  = x[i];
        py = y[i];
}

/*let svg = d3.select('#graph')
        .attr('width', 1000)
        .attr('height', 500)
        .style('background-color', 'grey');

    svg.append('line')
        .style("stroke", "lightgreen")
        .style("stroke-width",10)
        .attr("x1", 0)
        .attr("y1", 0)
        .attr("x2", 200)
        .attr("y2", 200);*/