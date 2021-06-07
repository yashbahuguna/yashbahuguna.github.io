let ctx1 = document.getElementById('myChart').getContext('2d');
let ctx2 = document.getElementById('myChart2').getContext('2d');

function parseData(type) {
    const table = data["Monthly Time Series"];
    let n = 0;
    let year = []; 
    let y = [];
    //x = [];
    //table[key.toString()]["1. open"]
    for (const key in table){
        if (n > 5) year.push(table[key.toString()][type]);
        if ((n-5)%13 == 0) {
            //x.push(year);
            y.push(year);
            n = 6;
            year = [];
        }
        n++;
    }
    return y;
}



function drawChart(ctx, data, label) {
    let x = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: x,
            datasets: [{
                label: label,
                data: data,
                barThickness: 15,
                backgroundColor: 'rgba(0, 123, 255, 1)',       
                borderColor:  'rgba(0, 123, 255, 1)',
                borderWidth: 1,
                borderRadius: Number.MAX_VALUE
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
    return myChart;
}

let chart1;
let chart2;
function init() {
    let dat = parseData("1. open");
    chart1 = drawChart(ctx1, dat[1], '2020 open');
    dat = parseData("2. high");
    chart2 = drawChart(ctx2, dat[1], '2020 high');
}
init();

document.getElementById("open").onclick = () => {
    let d = parseData("1. open");
    removeData(chart1);
    //console.log(d[1]);
    addData(chart1,"2020 open", d[1]);
}

document.getElementById("close").onclick = () => {
    let d = parseData("4. close");
    removeData(chart1);
    addData(chart1,"2020 close", d[1]);
    //console.log(d[1]);
}

document.getElementById("high").onclick = () => {
    let d = parseData("2. high");
    removeData(chart2);
    addData(chart2,"2020 high", d[1]);
    //console.log(d[1]);
}

document.getElementById("low").onclick = () => {
    let d = parseData("3. low");
    removeData(chart2);
    addData(chart2,"2020 low", d[1]);
   // console.log(d[1]);
}


function addData(chart, l,data) {
    
    chart.data.datasets.forEach((dataset) => {
       // for (i =0; i < data.size(); i++) {
            dataset.label = l;
            dataset.data.push(...data);
        //}
        
        
    });
    chart.update();
    
}

function removeData(chart) {
    chart.data.datasets.forEach((dataset) => {
        dataset.data.pop();
    });
    chart.update();
}


//async function getData() {       
    //const response = await fetch("https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY_EXTENDED&symbol=IBM&interval=15min&slice=year1month1&apikey=demo");
  //  const response = await fetch("https://datausa.io/api/data?drilldowns=Nation&measures=Population");
    //let x_axis = [];
    //let y1 = [];
    //const data = await JSON.parse(response.text());
    /*const table = data.split('\n');
  
    table.forEach( row => {
        const columns = row.split(',');
        const time = columns[0];
        const open = columns[1];
        const high = columns[2];
        const low = columns[3];
        const close = columns[4];
        const volume = columns[5];
        x_axis.push(time);
        y1.push(open);
    });*/
    //console.log(data);
    //return {x:x_axis, y1: y1};
    
//}
let date = new Date();
document.getElementById("date").innerHTML = `<h5>  ${date.getDate().toString()}-${date.getMonth().toString()}-${date.getFullYear().toString()} </h5>`