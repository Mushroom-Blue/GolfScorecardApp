let golfAPI = "https://golf-courses-api.herokuapp.com/courses/18300";
let oneCourse;
let proTotal = 0;
let champTotal = 0;
let menTotal = 0;
let womenTotal = 0;
let selectedTee;
let savedData = [];

let xmlHTTP = new XMLHttpRequest();

xmlHTTP.onreadystatechange = () => {
    if (xmlHTTP.readyState === 4 && xmlHTTP.status === 200) {
        oneCourse = JSON.parse(xmlHTTP.responseText);
        console.log(oneCourse);
        document.getElementById("oneCourseIMG").innerHTML = `
            <img class="courseIMG" src='${oneCourse.data.thumbnail}'/>
        `
        document.getElementById("oneCourseIMGTXT").innerHTML = `
            <div class="courseName">${oneCourse.data.name}</div>
            <div class="coursePhone">${oneCourse.data.phone}</div>
            <div class="courseAddr">${oneCourse.data.addr1}</div>
            <div class="courseCity">${oneCourse.data.city}</div>
            <div class="courseState">${oneCourse.data.stateOrProvince}</div>
        `
        totalTee();
        document.getElementById("teeType").innerHTML = `
            <option value="pro">Pro - ${proTotal} yds</option>
            <option value="champion">Champion - ${champTotal} yds</option>
            <option value="men">Men - ${menTotal} yds</option>
            <option value="women">Women - ${womenTotal} yds</option>
        `
        currentTee();
    }
}
xmlHTTP.open("GET", golfAPI, true);
xmlHTTP.setRequestHeader("ContentType", "application/json");
xmlHTTP.send();

function totalTee() {
    oneCourse.data.holes.forEach((eachHole) => {
        proTotal += eachHole.teeBoxes[0].yards
        champTotal += eachHole.teeBoxes[1].yards
        menTotal += eachHole.teeBoxes[2].yards
        womenTotal += eachHole.teeBoxes[3].yards
    })
}

function currentTee() {
    selectedTee = document.getElementById("teeType").value;
}

function addPlayerNames() {
    let savedPlayerNames = document.getElementById("playerNameInput").value;
    let playerNamesList = document.getElementById("playerNames");
    if (savedPlayerNames === "") return;
    if (savedData.includes(savedPlayerNames.toLowerCase())){
        document.getElementById("errorMsg").innerHTML = "Player Already Exists";
        document.getElementById("playerNameInput").value = "";
        setTimeout(()=>{
            document.getElementById("errorMsg").innerHTML = "";
        }, 5000)
        return
    }
    if (savedData.length === 4){
        document.getElementById("errorMsg").innerHTML = "Player Roster Is Full!";
        document.getElementById("playerNameInput").value = "";
        setTimeout(()=>{
            document.getElementById("errorMsg").innerHTML = "";
        }, 5000)
        return
    }
    savedData.push(savedPlayerNames.toLowerCase());
    document.getElementById("playerNameInput").value = "";
    console.log(savedData)
    playerNamesList.insertAdjacentHTML(
        "beforeend", 
        `
        <div class="singlePlayer">${savedPlayerNames}</div>
    `
    )
    
}
