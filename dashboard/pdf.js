//add event listener to button
document.getElementById("pdf1").onclick = () => {
	downloadPDF("myChart")
}

document.getElementById("pdf2").onclick = () => {
	downloadPDF("myChart2")
}


document.getElementById("download-pdf").onclick = () => {
	window.print();
}

//donwload pdf from original canvas
function downloadPDF(chart) {
  let canvas = document.getElementById(chart);
	//creates image
	let canvasImg = canvas.toDataURL("image/jpeg", 1.0);
    console.log("lolo")
	//creates PDF from img
	let doc = new jsPDF('landscape');
	doc.setFontSize(20);
	doc.text(15, 15, "Cool Chart");
	doc.addImage(canvasImg, 'JPEG', 10, 10, 280, 150 );
	doc.save('canvas.pdf');
}

