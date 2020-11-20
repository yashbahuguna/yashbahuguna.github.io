var state = 0;
var sno = 1;
var V;
var P;
var Q;
var S;
var r;
var result = 0.00;

var G = 0.01;


var R = Math.floor(Math.random() * (11)) + 5;

console.log(R," ",P, " ",Q, " ",S, " ");

photo = document.getElementById("img");

power = document.getElementById("power");

enter = document.getElementById("enter");
enter.disabled = true;
document.getElementById("check").disabled = true;

table = document.getElementById("observation");

power.onclick = ()=> {
    if (state == 0) {   
        V = Number(document.getElementById("voltage").value);
        P = Number(document.getElementById("resistanceP").value);
        Q = Number(document.getElementById("resistanceQ").value);
        S = Number(document.getElementById("resistanceS").value);
        console.log(V, R," ",P, " ",Q, " ",S);
        result = ( V*((R*Q-P*S)/(P*R*(Q+S) + (P+R)*Q*S + G*(P+R)*(Q+S))) ).toFixed(5);
        if (result == 0) {
            document.getElementById("current").innerHTML = "NULL"
            photo.src = "images/on.jpg"
        } 
        else {
            document.getElementById("current").innerHTML = result;   
        }
        
        if (result > 0) {
            photo.src = "images/ondb.jpg"
        }
        else if (result<0)  {
            photo.src = "images/onbd.jpg"
        }
        power.innerHTML = "Turn Off";
        state = 1;
        document.getElementById("voltage").disabled = true;
        document.getElementById("resistanceP").disabled = true;
        document.getElementById("resistanceQ").disabled = true;
        document.getElementById("resistanceS").disabled = true;
        document.getElementById("assignR").disabled = true;
        document.getElementById("check").disabled = false;
        
    }
    else {
        document.getElementById("current").innerHTML = "0.00";
        power.innerHTML = "Turn On";
        photo.src = "images/off.jpg"
        state = 0;
        
        document.getElementById("voltage").disabled = false;
        document.getElementById("resistanceP").disabled = false;
        document.getElementById("resistanceQ").disabled = false;
        document.getElementById("resistanceS").disabled = false;
        document.getElementById("assignR").disabled = false;
        document.getElementById("check").disabled = true;
    }
    
}

document.getElementById("assignR").onclick = ()=>{
    R = Math.floor(Math.random() * (11)) + 5;
    console.log(R);
}
document.getElementById("resistanceR").onclick = () => {
    enter.disabled = true;
    document.getElementById("checkedAnswer").innerHTML = "";
}


document.getElementById("check").onclick = () => {
    r = Number(document.getElementById("resistanceR").value)
    
    if (r == R) {
        if ((P*S/Q) === R) {
            document.getElementById("checkedAnswer").innerHTML = "Correct!";
            enter.disabled = false;    
        }
        else {
            document.getElementById("checkedAnswer").innerHTML = "R is correct <br> but current must be Null your calculation is wrong!";
        }
    }
    else {
        document.getElementById("checkedAnswer").innerHTML = "incorrect try again"
    }
    

}

enter.onclick = ()=> {
    var newRow = table.insertRow();
    var newCellsno  = newRow.insertCell(0);
    var newCellP  = newRow.insertCell(1);
    var newCellQ  = newRow.insertCell(2);
    var newCellS  = newRow.insertCell(3);
    var newCellR  = newRow.insertCell(4);

    newCellsno.innerHTML = sno.toString();
    newCellP.innerHTML = P.toString();
    newCellQ.innerHTML = Q.toString();
    newCellR.innerHTML = R.toString();
    newCellS.innerHTML = S.toString();
    enter.disabled = true;    
    sno++;
}




