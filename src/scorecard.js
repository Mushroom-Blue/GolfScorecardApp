let golfAPI = "https://golf-courses-api.herokuapp.com/courses/18300";
let oneCourse;
let sessionData;
let parValues = [];
let hcpValues = [];
let yardValues = [];
let outPar = 0;
let inPar = 0;
let outHcp = 0;
let inHcp = 0;
let outYards = 0;
let inYards = 0;
let totalPar = 0;
let totalHcp = 0;
let totalYards = 0;

let xmlHTTP = new XMLHttpRequest();

xmlHTTP.onreadystatechange = () => {
    if (xmlHTTP.readyState === 4 && xmlHTTP.status === 200) {
        oneCourse = JSON.parse(xmlHTTP.responseText);
        console.log("API Data: ", oneCourse);
        sessionData = JSON.parse(sessionStorage.getItem("sessionData"));
        console.log("Session Data: ", sessionData);
        let scorecardTable = document.getElementById("scoreCardTable");
        let playerHeaders = "";
        sessionData.forEach((player) => {
            let capitalNames = player.charAt(0).toUpperCase() + player.slice(1);
            playerHeaders += `<th><input disabled value="${capitalNames}"/></th>`
        }) 
        getScorecardData();
        if (sessionData.length === 4) {
            scorecardTable.insertAdjacentHTML("beforeend", `
                <tr>
                    <th>
                        <input disabled value="Holes" />
                    </th>
                    <th>
                        <input disabled value="Par" />
                    </th>
                    <th>
                        <input disabled value="HDCP" />
                    </th>
                    ${playerHeaders}
                    <th>
                        <input disabled value="Yards" />
                    </th>
                </tr>
                <tr>
                    <td>
                        <input disabled value="1" />
                    </td>
                    <td>
                        <input disabled value="${parValues[0]}" />
                    </td>
                    <td>
                        <input disabled value="${hcpValues[0]}" />
                    </td>
                    <td>
                        <input id="${sessionData[0] + "Hole1"}" type="number" onkeydown="enterButtonFunction(event)" onblur="playerScoreFunction()"/>
                    </td>
                    <td>
                        <input id="${sessionData[1] + "Hole1"}" type="number" onkeydown="enterButtonFunction(event)" onblur="playerScoreFunction()"/>
                    </td>
                    <td>
                        <input id="${sessionData[2] + "Hole1"}" type="number" onkeydown="enterButtonFunction(event)" onblur="playerScoreFunction()"/>
                    </td>
                    <td>
                        <input id="${sessionData[3] + "Hole1"}" type="number" onkeydown="enterButtonFunction(event)" onblur="playerScoreFunction()"/>
                    </td>
                    <td>
                        <input disabled value="${yardValues[0]}" />
                    </td>
                </tr>
                <tr>
                    <td>
                        <input disabled value="2" />
                    </td>
                    <td>
                        <input disabled value="${parValues[1]}" />
                    </td>
                    <td>
                        <input disabled value="${hcpValues[1]}" />
                    </td>
                    <td>
                        <input id="${sessionData[0] + "Hole2"}" type="number" onkeydown="enterButtonFunction(event)" onblur="playerScoreFunction()"/>
                    </td>
                    <td>
                        <input id="${sessionData[1] + "Hole2"}" type="number" onkeydown="enterButtonFunction(event)" onblur="playerScoreFunction()"/>
                    </td>
                    <td>
                        <input id="${sessionData[2] + "Hole2"}" type="number" onkeydown="enterButtonFunction(event)" onblur="playerScoreFunction()"/>
                    </td>
                    <td>
                        <input id="${sessionData[3] + "Hole2"}" type="number" onkeydown="enterButtonFunction(event)" onblur="playerScoreFunction()"/>
                    </td>
                    <td>
                        <input disabled value="${yardValues[1]}" />
                    </td>
                </tr>
                <tr>
                    <td>
                        <input disabled value="3" />
                    </td>
                    <td>
                        <input disabled value="${parValues[2]}" />
                    </td>
                    <td>
                        <input disabled value="${hcpValues[2]}" />
                    </td>
                    <td>
                        <input id="${sessionData[0] + "Hole3"}" type="number" onkeydown="enterButtonFunction(event)" onblur="playerScoreFunction()"/>
                    </td>
                    <td>
                        <input id="${sessionData[1] + "Hole3"}" type="number" onkeydown="enterButtonFunction(event)" onblur="playerScoreFunction()"/>
                    </td>
                    <td>
                        <input id="${sessionData[2] + "Hole3"}" type="number" onkeydown="enterButtonFunction(event)" onblur="playerScoreFunction()"/>
                    </td>
                    <td>
                        <input id="${sessionData[3] + "Hole3"}" type="number" onkeydown="enterButtonFunction(event)" onblur="playerScoreFunction()"/>
                    </td>
                    <td>
                        <input disabled value="${yardValues[2]}" />
                    </td>
                </tr>
                <tr>
                    <td>
                        <input disabled value="4" />
                    </td>
                    <td>
                        <input disabled value="${parValues[3]}" />
                    </td>
                    <td>
                        <input disabled value="${hcpValues[3]}" />
                    </td>
                    <td>
                        <input id="${sessionData[0] + "Hole4"}" type="number" onkeydown="enterButtonFunction(event)" onblur="playerScoreFunction()"/>
                    </td>
                    <td>
                        <input id="${sessionData[1] + "Hole4"}" type="number" onkeydown="enterButtonFunction(event)" onblur="playerScoreFunction()"/>
                    </td>
                    <td>
                        <input id="${sessionData[2] + "Hole4"}" type="number" onkeydown="enterButtonFunction(event)" onblur="playerScoreFunction()"/>
                    </td>
                    <td>
                        <input id="${sessionData[3] + "Hole4"}" type="number" onkeydown="enterButtonFunction(event)" onblur="playerScoreFunction()"/>
                    </td>
                    <td>
                        <input disabled value="${yardValues[3]}" />
                    </td>
                </tr>
                <tr>
                    <td>
                        <input disabled value="5" />
                    </td>
                    <td>
                        <input disabled value="${parValues[4]}" />
                    </td>
                    <td>
                        <input disabled value="${hcpValues[4]}" />
                    </td>
                    <td>
                        <input id="${sessionData[0] + "Hole5"}" type="number" onkeydown="enterButtonFunction(event)" onblur="playerScoreFunction()"/>
                    </td>
                    <td>
                        <input id="${sessionData[1] + "Hole5"}" type="number" onkeydown="enterButtonFunction(event)" onblur="playerScoreFunction()"/>
                    </td>
                    <td>
                        <input id="${sessionData[2] + "Hole5"}" type="number" onkeydown="enterButtonFunction(event)" onblur="playerScoreFunction()"/>
                    </td>
                    <td>
                        <input id="${sessionData[3] + "Hole5"}" type="number" onkeydown="enterButtonFunction(event)" onblur="playerScoreFunction()"/>
                    </td>
                    <td>
                        <input disabled value="${yardValues[4]}" />
                    </td>
                </tr>
                <tr>
                    <td>
                        <input disabled value="6" />
                    </td>
                    <td>
                        <input disabled value="${parValues[5]}" />
                    </td>
                    <td>
                        <input disabled value="${hcpValues[5]}" />
                    </td>
                    <td>
                        <input id="${sessionData[0] + "Hole6"}" type="number" onkeydown="enterButtonFunction(event)" onblur="playerScoreFunction()"/>
                    </td>
                    <td>
                        <input id="${sessionData[1] + "Hole6"}" type="number" onkeydown="enterButtonFunction(event)" onblur="playerScoreFunction()"/>
                    </td>
                    <td>
                        <input id="${sessionData[2] + "Hole6"}" type="number" onkeydown="enterButtonFunction(event)" onblur="playerScoreFunction()"/>
                    </td>
                    <td>
                        <input id="${sessionData[3] + "Hole6"}" type="number" onkeydown="enterButtonFunction(event)" onblur="playerScoreFunction()"/>
                    </td>
                    <td>
                        <input disabled value="${yardValues[5]}" />
                    </td>
                </tr>
                <tr>
                    <td>
                        <input disabled value="7" />
                    </td>
                    <td>
                        <input disabled value="${parValues[6]}" />
                    </td>
                    <td>
                        <input disabled value="${hcpValues[6]}" />
                    </td>
                    <td>
                        <input id="${sessionData[0] + "Hole7"}" type="number" onkeydown="enterButtonFunction(event)" onblur="playerScoreFunction()"/>
                    </td>
                    <td>
                        <input id="${sessionData[1] + "Hole7"}" type="number" onkeydown="enterButtonFunction(event)" onblur="playerScoreFunction()"/>
                    </td>
                    <td>
                        <input id="${sessionData[2] + "Hole7"}" type="number" onkeydown="enterButtonFunction(event)" onblur="playerScoreFunction()"/>
                    </td>
                    <td>
                        <input id="${sessionData[3] + "Hole7"}" type="number" onkeydown="enterButtonFunction(event)" onblur="playerScoreFunction()"/>
                    </td>
                    <td>
                        <input disabled value="${yardValues[6]}" />
                    </td>
                </tr>
                <tr>
                    <td>
                        <input disabled value="8" />
                    </td>
                    <td>
                        <input disabled value="${parValues[7]}" />
                    </td>
                    <td>
                        <input disabled value="${hcpValues[7]}" />
                    </td>
                    <td>
                        <input id="${sessionData[0] + "Hole8"}" type="number" onkeydown="enterButtonFunction(event)" onblur="playerScoreFunction()"/>
                    </td>
                    <td>
                        <input id="${sessionData[1] + "Hole8"}" type="number" onkeydown="enterButtonFunction(event)" onblur="playerScoreFunction()"/>
                    </td>
                    <td>
                        <input id="${sessionData[2] + "Hole8"}" type="number" onkeydown="enterButtonFunction(event)" onblur="playerScoreFunction()"/>
                    </td>
                    <td>
                        <input id="${sessionData[3] + "Hole8"}" type="number" onkeydown="enterButtonFunction(event)" onblur="playerScoreFunction()"/>
                    </td>
                    <td>
                        <input disabled value="${yardValues[7]}" />
                    </td>
                </tr>
                <tr>
                    <td>
                        <input disabled value="9" />
                    </td>
                    <td>
                        <input disabled value="${parValues[8]}" />
                    </td>
                    <td>
                        <input disabled value="${hcpValues[8]}" />
                    </td>
                    <td>
                        <input id="${sessionData[0] + "Hole9"}" type="number" onkeydown="enterButtonFunction(event)" onblur="playerScoreFunction()"/>
                    </td>
                    <td>
                        <input id="${sessionData[1] + "Hole9"}" type="number" onkeydown="enterButtonFunction(event)" onblur="playerScoreFunction()"/>
                    </td>
                    <td>
                        <input id="${sessionData[2] + "Hole9"}" type="number" onkeydown="enterButtonFunction(event)" onblur="playerScoreFunction()"/>
                    </td>
                    <td>
                        <input id="${sessionData[3] + "Hole9"}" type="number" onkeydown="enterButtonFunction(event)" onblur="playerScoreFunction()"/>
                    </td>
                    <td>
                        <input disabled value="${yardValues[8]}" />
                    </td>
                </tr>
                <tr>
                    <td>
                        <input disabled value="Out" />
                    </td>
                    <td>
                        <input disabled value="${outPar}" />
                    </td>
                    <td>
                        <input disabled value="${outHcp}" />
                    </td>
                    <td>
                        <input id="${sessionData[0] + "Out"}" disabled value="" />
                    </td>
                    <td>
                        <input id="${sessionData[1] + "Out"}" disabled value="" />
                    </td>
                    <td>
                        <input id="${sessionData[2] + "Out"}" disabled value="" />
                    </td>
                    <td>
                        <input id="${sessionData[3] + "Out"}" disabled value="" />
                    </td>
                    <td>
                        <input disabled value="${outYards}" />
                    </td>
                </tr>
                <tr>
                    <td>
                        <input disabled value="10" />
                    </td>
                    <td>
                        <input disabled value="${parValues[9]}" />
                    </td>
                    <td>
                        <input disabled value="${hcpValues[9]}" />
                    </td>
                    <td>
                        <input id="${sessionData[0] + "Hole10"}" type="number" onkeydown="enterButtonFunction(event)" onblur="playerScoreFunction()"/>
                    </td>
                    <td>
                        <input id="${sessionData[1] + "Hole10"}" type="number" onkeydown="enterButtonFunction(event)" onblur="playerScoreFunction()"/>
                    </td>
                    <td>
                        <input id="${sessionData[2] + "Hole10"}" type="number" onkeydown="enterButtonFunction(event)" onblur="playerScoreFunction()"/>
                    </td>
                    <td>
                        <input id="${sessionData[3] + "Hole10"}" type="number" onkeydown="enterButtonFunction(event)" onblur="playerScoreFunction()"/>
                    </td>
                    <td>
                        <input disabled value="${yardValues[9]}" />
                    </td>
                </tr>
                <tr>
                    <td>
                        <input disabled value="11" />
                    </td>
                    <td>
                        <input disabled value="${parValues[10]}" />
                    </td>
                    <td>
                        <input disabled value="${hcpValues[10]}" />
                    </td>
                    <td>
                        <input id="${sessionData[0] + "Hole11"}" type="number" onkeydown="enterButtonFunction(event)" onblur="playerScoreFunction()"/>
                    </td>
                    <td>
                        <input id="${sessionData[1] + "Hole11"}" type="number" onkeydown="enterButtonFunction(event)" onblur="playerScoreFunction()"/>
                    </td>
                    <td>
                        <input id="${sessionData[2] + "Hole11"}" type="number" onkeydown="enterButtonFunction(event)" onblur="playerScoreFunction()"/>
                    </td>
                    <td>
                        <input id="${sessionData[3] + "Hole11"}" type="number" onkeydown="enterButtonFunction(event)" onblur="playerScoreFunction()"/>
                    </td>
                    <td>
                        <input disabled value="${yardValues[10]}" />
                    </td>
                </tr>
                <tr>
                    <td>
                        <input disabled value="12" />
                    </td>
                    <td>
                        <input disabled value="${parValues[11]}" />
                    </td>
                    <td>
                        <input disabled value="${hcpValues[11]}" />
                    </td>
                    <td>
                        <input id="${sessionData[0] + "Hole12"}" type="number" onkeydown="enterButtonFunction(event)" onblur="playerScoreFunction()"/>
                    </td>
                    <td>
                        <input id="${sessionData[1] + "Hole12"}" type="number" onkeydown="enterButtonFunction(event)" onblur="playerScoreFunction()"/>
                    </td>
                    <td>
                        <input id="${sessionData[2] + "Hole12"}" type="number" onkeydown="enterButtonFunction(event)" onblur="playerScoreFunction()"/>
                    </td>
                    <td>
                        <input id="${sessionData[3] + "Hole12"}" type="number" onkeydown="enterButtonFunction(event)" onblur="playerScoreFunction()"/>
                    </td>
                    <td>
                        <input disabled value="${yardValues[11]}" />
                    </td>
                </tr>
                <tr>
                    <td>
                        <input disabled value="13" />
                    </td>
                    <td>
                        <input disabled value="${parValues[12]}" />
                    </td>
                    <td>
                        <input disabled value="${hcpValues[12]}" />
                    </td>
                    <td>
                        <input id="${sessionData[0] + "Hole13"}" type="number" onkeydown="enterButtonFunction(event)" onblur="playerScoreFunction()"/>
                    </td>
                    <td>
                        <input id="${sessionData[1] + "Hole13"}" type="number" onkeydown="enterButtonFunction(event)" onblur="playerScoreFunction()"/>
                    </td>
                    <td>
                        <input id="${sessionData[2] + "Hole13"}" type="number" onkeydown="enterButtonFunction(event)" onblur="playerScoreFunction()"/>
                    </td>
                    <td>
                        <input id="${sessionData[3] + "Hole13"}" type="number" onkeydown="enterButtonFunction(event)" onblur="playerScoreFunction()"/>
                    </td>
                    <td>
                        <input disabled value="${yardValues[12]}" />
                    </td>
                </tr>
                <tr>
                    <td>
                        <input disabled value="14" />
                    </td>
                    <td>
                        <input disabled value="${parValues[13]}" />
                    </td>
                    <td>
                        <input disabled value="${hcpValues[13]}" />
                    </td>
                    <td>
                        <input id="${sessionData[0] + "Hole14"}" type="number" onkeydown="enterButtonFunction(event)" onblur="playerScoreFunction()"/>
                    </td>
                    <td>
                        <input id="${sessionData[1] + "Hole14"}" type="number" onkeydown="enterButtonFunction(event)" onblur="playerScoreFunction()"/>
                    </td>
                    <td>
                        <input id="${sessionData[2] + "Hole14"}" type="number" onkeydown="enterButtonFunction(event)" onblur="playerScoreFunction()"/>
                    </td>
                    <td>
                        <input id="${sessionData[3] + "Hole14"}" type="number" onkeydown="enterButtonFunction(event)" onblur="playerScoreFunction()"/>
                    </td>
                    <td>
                        <input disabled value="${yardValues[13]}" />
                    </td>
                </tr>
                <tr>
                    <td>
                        <input disabled value="15" />
                    </td>
                    <td>
                        <input disabled value="${parValues[14]}" />
                    </td>
                    <td>
                        <input disabled value="${hcpValues[14]}" />
                    </td>
                    <td>
                        <input id="${sessionData[0] + "Hole15"}" type="number" onkeydown="enterButtonFunction(event)" onblur="playerScoreFunction()"/>
                    </td>
                    <td>
                        <input id="${sessionData[1] + "Hole15"}" type="number" onkeydown="enterButtonFunction(event)" onblur="playerScoreFunction()"/>
                    </td>
                    <td>
                        <input id="${sessionData[2] + "Hole15"}" type="number" onkeydown="enterButtonFunction(event)" onblur="playerScoreFunction()"/>
                    </td>
                    <td>
                        <input id="${sessionData[3] + "Hole15"}" type="number" onkeydown="enterButtonFunction(event)" onblur="playerScoreFunction()"/>
                    </td>
                    <td>
                        <input disabled value="${yardValues[14]}" />
                    </td>
                </tr>
                <tr>
                    <td>
                        <input disabled value="16" />
                    </td>
                    <td>
                        <input disabled value="${parValues[15]}" />
                    </td>
                    <td>
                        <input disabled value="${hcpValues[15]}" />
                    </td>
                    <td>
                        <input id="${sessionData[0] + "Hole16"}" type="number" onkeydown="enterButtonFunction(event)" onblur="playerScoreFunction()"/>
                    </td>
                    <td>
                        <input id="${sessionData[1] + "Hole16"}" type="number" onkeydown="enterButtonFunction(event)" onblur="playerScoreFunction()"/>
                    </td>
                    <td>
                        <input id="${sessionData[2] + "Hole16"}" type="number" onkeydown="enterButtonFunction(event)" onblur="playerScoreFunction()"/>
                    </td>
                    <td>
                        <input id="${sessionData[3] + "Hole16"}" type="number" onkeydown="enterButtonFunction(event)" onblur="playerScoreFunction()"/>
                    </td>
                    <td>
                        <input disabled value="${yardValues[15]}" />
                    </td>
                </tr>
                <tr>
                    <td>
                        <input disabled value="17" />
                    </td>
                    <td>
                        <input disabled value="${parValues[16]}" />
                    </td>
                    <td>
                        <input disabled value="${hcpValues[16]}" />
                    </td>
                    <td>
                        <input id="${sessionData[0] + "Hole17"}" type="number" onkeydown="enterButtonFunction(event)" onblur="playerScoreFunction()"/>
                    </td>
                    <td>
                        <input id="${sessionData[1] + "Hole17"}" type="number" onkeydown="enterButtonFunction(event)" onblur="playerScoreFunction()"/>
                    </td>
                    <td>
                        <input id="${sessionData[2] + "Hole17"}" type="number" onkeydown="enterButtonFunction(event)" onblur="playerScoreFunction()"/>
                    </td>
                    <td>
                        <input id="${sessionData[3] + "Hole17"}" type="number" onkeydown="enterButtonFunction(event)" onblur="playerScoreFunction()"/>
                    </td>
                    <td>
                        <input disabled value="${yardValues[16]}" />
                    </td>
                </tr>
                <tr>
                    <td>
                        <input disabled value="18" />
                    </td>
                    <td>
                        <input disabled value="${parValues[17]}" />
                    </td>
                    <td>
                        <input disabled value="${hcpValues[17]}" />
                    </td>
                    <td>
                        <input id="${sessionData[0] + "Hole18"}" type="number" onkeydown="enterButtonFunction(event)" onblur="playerScoreFunction()"/>
                    </td>
                    <td>
                        <input id="${sessionData[1] + "Hole18"}" type="number" onkeydown="enterButtonFunction(event)" onblur="playerScoreFunction()"/>
                    </td>
                    <td>
                        <input id="${sessionData[2] + "Hole18"}" type="number" onkeydown="enterButtonFunction(event)" onblur="playerScoreFunction()"/>
                    </td>
                    <td>
                        <input id="${sessionData[3] + "Hole18"}" type="number" onkeydown="enterButtonFunction(event)" onblur="playerScoreFunction()"/>
                    </td>
                    <td>
                        <input disabled value="${yardValues[17]}" />
                    </td>
                </tr>
                <tr>
                    <td>
                        <input disabled value="In" />
                    </td>
                    <td>
                        <input disabled value="${inPar}" />
                    </td>
                    <td>
                        <input disabled value="${inHcp}" />
                    </td>
                    <td>
                        <input id="${sessionData[0] + "In"}" disabled />
                    </td>
                    <td>
                        <input id="${sessionData[1] + "In"}" disabled />
                    </td>
                    <td>
                        <input id="${sessionData[2] + "In"}" disabled />
                    </td>
                    <td>
                        <input id="${sessionData[3] + "In"}" disabled />
                    </td>
                    <td>
                        <input disabled value="${inYards}" />
                    </td>
                </tr>
                <tr>
                    <td>
                        <input disabled value="Total" />
                    </td>
                    <td>
                        <input disabled value="${totalPar}" />
                    </td>
                    <td>
                        <input disabled value="${totalHcp}" />
                    </td>
                    <td>
                        <input id="${sessionData[0] + "Total"}" disabled />
                    </td>
                    <td>
                        <input id="${sessionData[1] + "Total"}" disabled />
                    </td>
                    <td>
                        <input id="${sessionData[2] + "Total"}" disabled />
                    </td>
                    <td>
                        <input id="${sessionData[3] + "Total"}" disabled />
                    </td>
                    <td>
                        <input disabled value="${totalYards}" />
                    </td>
                </tr>
            `)
        } else if (sessionData.length === 3) {
            scorecardTable.insertAdjacentHTML("beforeend", `
            <tr>
                <th>
                    <input disabled value="Holes" />
                </th>
                <th>
                    <input disabled value="Par" />
                </th>
                <th>
                    <input disabled value="HDCP" />
                </th>
                ${playerHeaders}
                <th>
                    <input disabled value="Yards" />
                </th>
            </tr>
            <tr>
                <td>
                    <input disabled value="1" />
                </td>
                <td>
                    <input disabled value="${parValues[0]}" />
                </td>
                <td>
                    <input disabled value="${hcpValues[0]}" />
                </td>
                <td>
                    <input id="${sessionData[0] + "Hole1"}" type="number" onkeydown="enterButtonFunction(event)" onblur="playerScoreFunction()"/>
                </td>
                <td>
                    <input id="${sessionData[1] + "Hole1"}" type="number" onkeydown="enterButtonFunction(event)" onblur="playerScoreFunction()"/>
                </td>
                <td>
                    <input id="${sessionData[2] + "Hole1"}" type="number" onkeydown="enterButtonFunction(event)" onblur="playerScoreFunction()"/>
                </td>
                <td>
                    <input disabled value="${yardValues[0]}" />
                </td>
            </tr>
            <tr>
                <td>
                    <input disabled value="2" />
                </td>
                <td>
                    <input disabled value="${parValues[1]}" />
                </td>
                <td>
                    <input disabled value="${hcpValues[1]}" />
                </td>
                <td>
                    <input id="${sessionData[0] + "Hole2"}" type="number" onkeydown="enterButtonFunction(event)" onblur="playerScoreFunction()"/>
                </td>
                <td>
                    <input id="${sessionData[1] + "Hole2"}" type="number" onkeydown="enterButtonFunction(event)" onblur="playerScoreFunction()"/>
                </td>
                <td>
                    <input id="${sessionData[2] + "Hole2"}" type="number" onkeydown="enterButtonFunction(event)" onblur="playerScoreFunction()"/>
                </td>
                <td>
                    <input disabled value="${yardValues[1]}" />
                </td>
            </tr>
            <tr>
                <td>
                    <input disabled value="3" />
                </td>
                <td>
                    <input disabled value="${parValues[2]}" />
                </td>
                <td>
                    <input disabled value="${hcpValues[2]}" />
                </td>
                <td>
                    <input id="${sessionData[0] + "Hole3"}" type="number" onkeydown="enterButtonFunction(event)" onblur="playerScoreFunction()"/>
                </td>
                <td>
                    <input id="${sessionData[1] + "Hole3"}" type="number" onkeydown="enterButtonFunction(event)" onblur="playerScoreFunction()"/>
                </td>
                <td>
                    <input id="${sessionData[2] + "Hole3"}" type="number" onkeydown="enterButtonFunction(event)" onblur="playerScoreFunction()"/>
                </td>
                <td>
                    <input disabled value="${yardValues[2]}" />
                </td>
            </tr>
            <tr>
                <td>
                    <input disabled value="4" />
                </td>
                <td>
                    <input disabled value="${parValues[3]}" />
                </td>
                <td>
                    <input disabled value="${hcpValues[3]}" />
                </td>
                <td>
                    <input id="${sessionData[0] + "Hole4"}" type="number" onkeydown="enterButtonFunction(event)" onblur="playerScoreFunction()"/>
                </td>
                <td>
                    <input id="${sessionData[1] + "Hole4"}" type="number" onkeydown="enterButtonFunction(event)" onblur="playerScoreFunction()"/>
                </td>
                <td>
                    <input id="${sessionData[2] + "Hole4"}" type="number" onkeydown="enterButtonFunction(event)" onblur="playerScoreFunction()"/>
                </td>
                <td>
                    <input disabled value="${yardValues[3]}" />
                </td>
            </tr>
            <tr>
                <td>
                    <input disabled value="5" />
                </td>
                <td>
                    <input disabled value="${parValues[4]}" />
                </td>
                <td>
                    <input disabled value="${hcpValues[4]}" />
                </td>
                <td>
                    <input id="${sessionData[0] + "Hole5"}" type="number" onkeydown="enterButtonFunction(event)" onblur="playerScoreFunction()"/>
                </td>
                <td>
                    <input id="${sessionData[1] + "Hole5"}" type="number" onkeydown="enterButtonFunction(event)" onblur="playerScoreFunction()"/>
                </td>
                <td>
                    <input id="${sessionData[2] + "Hole5"}" type="number" onkeydown="enterButtonFunction(event)" onblur="playerScoreFunction()"/>
                </td>
                <td>
                    <input disabled value="${yardValues[4]}" />
                </td>
            </tr>
            <tr>
                <td>
                    <input disabled value="6" />
                </td>
                <td>
                    <input disabled value="${parValues[5]}" />
                </td>
                <td>
                    <input disabled value="${hcpValues[5]}" />
                </td>
                <td>
                    <input id="${sessionData[0] + "Hole6"}" type="number" onkeydown="enterButtonFunction(event)" onblur="playerScoreFunction()"/>
                </td>
                <td>
                    <input id="${sessionData[1] + "Hole6"}" type="number" onkeydown="enterButtonFunction(event)" onblur="playerScoreFunction()"/>
                </td>
                <td>
                    <input id="${sessionData[2] + "Hole6"}" type="number" onkeydown="enterButtonFunction(event)" onblur="playerScoreFunction()"/>
                </td>
                <td>
                    <input disabled value="${yardValues[5]}" />
                </td>
            </tr>
            <tr>
                <td>
                    <input disabled value="7" />
                </td>
                <td>
                    <input disabled value="${parValues[6]}" />
                </td>
                <td>
                    <input disabled value="${hcpValues[6]}" />
                </td>
                <td>
                    <input id="${sessionData[0] + "Hole7"}" type="number" onkeydown="enterButtonFunction(event)" onblur="playerScoreFunction()"/>
                </td>
                <td>
                    <input id="${sessionData[1] + "Hole7"}" type="number" onkeydown="enterButtonFunction(event)" onblur="playerScoreFunction()"/>
                </td>
                <td>
                    <input id="${sessionData[2] + "Hole7"}" type="number" onkeydown="enterButtonFunction(event)" onblur="playerScoreFunction()"/>
                </td>
                <td>
                    <input disabled value="${yardValues[6]}" />
                </td>
            </tr>
            <tr>
                <td>
                    <input disabled value="8" />
                </td>
                <td>
                    <input disabled value="${parValues[7]}" />
                </td>
                <td>
                    <input disabled value="${hcpValues[7]}" />
                </td>
                <td>
                    <input id="${sessionData[0] + "Hole8"}" type="number" onkeydown="enterButtonFunction(event)" onblur="playerScoreFunction()"/>
                </td>
                <td>
                    <input id="${sessionData[1] + "Hole8"}" type="number" onkeydown="enterButtonFunction(event)" onblur="playerScoreFunction()"/>
                </td>
                <td>
                    <input id="${sessionData[2] + "Hole8"}" type="number" onkeydown="enterButtonFunction(event)" onblur="playerScoreFunction()"/>
                </td>
                <td>
                    <input disabled value="${yardValues[7]}" />
                </td>
            </tr>
            <tr>
                <td>
                    <input disabled value="9" />
                </td>
                <td>
                    <input disabled value="${parValues[8]}" />
                </td>
                <td>
                    <input disabled value="${hcpValues[8]}" />
                </td>
                <td>
                    <input id="${sessionData[0] + "Hole9"}" type="number" onkeydown="enterButtonFunction(event)" onblur="playerScoreFunction()"/>
                </td>
                <td>
                    <input id="${sessionData[1] + "Hole9"}" type="number" onkeydown="enterButtonFunction(event)" onblur="playerScoreFunction()"/>
                </td>
                <td>
                    <input id="${sessionData[2] + "Hole9"}" type="number" onkeydown="enterButtonFunction(event)" onblur="playerScoreFunction()"/>
                </td>
                <td>
                    <input disabled value="${yardValues[8]}" />
                </td>
            </tr>
            <tr>
                <td>
                    <input disabled value="Out" />
                </td>
                <td>
                    <input disabled value="${outPar}" />
                </td>
                <td>
                    <input disabled value="${outHcp}" />
                </td>
                <td>
                    <input id="${sessionData[0] + "Out"}" disabled value="" />
                </td>
                <td>
                    <input id="${sessionData[1] + "Out"}" disabled value="" />
                </td>
                <td>
                    <input id="${sessionData[2] + "Out"}" disabled value="" />
                </td>
                <td>
                    <input disabled value="${outYards}" />
                </td>
            </tr>
            <tr>
                <td>
                    <input disabled value="10" />
                </td>
                <td>
                    <input disabled value="${parValues[9]}" />
                </td>
                <td>
                    <input disabled value="${hcpValues[9]}" />
                </td>
                <td>
                    <input id="${sessionData[0] + "Hole10"}" type="number" onkeydown="enterButtonFunction(event)" onblur="playerScoreFunction()"/>
                </td>
                <td>
                    <input id="${sessionData[1] + "Hole10"}" type="number" onkeydown="enterButtonFunction(event)" onblur="playerScoreFunction()"/>
                </td>
                <td>
                    <input id="${sessionData[2] + "Hole10"}" type="number" onkeydown="enterButtonFunction(event)" onblur="playerScoreFunction()"/>
                </td>
                <td>
                    <input disabled value="${yardValues[9]}" />
                </td>
            </tr>
            <tr>
                <td>
                    <input disabled value="11" />
                </td>
                <td>
                    <input disabled value="${parValues[10]}" />
                </td>
                <td>
                    <input disabled value="${hcpValues[10]}" />
                </td>
                <td>
                    <input id="${sessionData[0] + "Hole11"}" type="number" onkeydown="enterButtonFunction(event)" onblur="playerScoreFunction()"/>
                </td>
                <td>
                    <input id="${sessionData[1] + "Hole11"}" type="number" onkeydown="enterButtonFunction(event)" onblur="playerScoreFunction()"/>
                </td>
                <td>
                    <input id="${sessionData[2] + "Hole11"}" type="number" onkeydown="enterButtonFunction(event)" onblur="playerScoreFunction()"/>
                </td>
                <td>
                    <input disabled value="${yardValues[10]}" />
                </td>
            </tr>
            <tr>
                <td>
                    <input disabled value="12" />
                </td>
                <td>
                    <input disabled value="${parValues[11]}" />
                </td>
                <td>
                    <input disabled value="${hcpValues[11]}" />
                </td>
                <td>
                    <input id="${sessionData[0] + "Hole12"}" type="number" onkeydown="enterButtonFunction(event)" onblur="playerScoreFunction()"/>
                </td>
                <td>
                    <input id="${sessionData[1] + "Hole12"}" type="number" onkeydown="enterButtonFunction(event)" onblur="playerScoreFunction()"/>
                </td>
                <td>
                    <input id="${sessionData[2] + "Hole12"}" type="number" onkeydown="enterButtonFunction(event)" onblur="playerScoreFunction()"/>
                </td>
                <td>
                    <input disabled value="${yardValues[11]}" />
                </td>
            </tr>
            <tr>
                <td>
                    <input disabled value="13" />
                </td>
                <td>
                    <input disabled value="${parValues[12]}" />
                </td>
                <td>
                    <input disabled value="${hcpValues[12]}" />
                </td>
                <td>
                    <input id="${sessionData[0] + "Hole13"}" type="number" onkeydown="enterButtonFunction(event)" onblur="playerScoreFunction()"/>
                </td>
                <td>
                    <input id="${sessionData[1] + "Hole13"}" type="number" onkeydown="enterButtonFunction(event)" onblur="playerScoreFunction()"/>
                </td>
                <td>
                    <input id="${sessionData[2] + "Hole13"}" type="number" onkeydown="enterButtonFunction(event)" onblur="playerScoreFunction()"/>
                </td>
                <td>
                    <input disabled value="${yardValues[12]}" />
                </td>
            </tr>
            <tr>
                <td>
                    <input disabled value="14" />
                </td>
                <td>
                    <input disabled value="${parValues[13]}" />
                </td>
                <td>
                    <input disabled value="${hcpValues[13]}" />
                </td>
                <td>
                    <input id="${sessionData[0] + "Hole14"}" type="number" onkeydown="enterButtonFunction(event)" onblur="playerScoreFunction()"/>
                </td>
                <td>
                    <input id="${sessionData[1] + "Hole14"}" type="number" onkeydown="enterButtonFunction(event)" onblur="playerScoreFunction()"/>
                </td>
                <td>
                    <input id="${sessionData[2] + "Hole14"}" type="number" onkeydown="enterButtonFunction(event)" onblur="playerScoreFunction()"/>
                </td>
                <td>
                    <input disabled value="${yardValues[13]}" />
                </td>
            </tr>
            <tr>
                <td>
                    <input disabled value="15" />
                </td>
                <td>
                    <input disabled value="${parValues[14]}" />
                </td>
                <td>
                    <input disabled value="${hcpValues[14]}" />
                </td>
                <td>
                    <input id="${sessionData[0] + "Hole15"}" type="number" onkeydown="enterButtonFunction(event)" onblur="playerScoreFunction()"/>
                </td>
                <td>
                    <input id="${sessionData[1] + "Hole15"}" type="number" onkeydown="enterButtonFunction(event)" onblur="playerScoreFunction()"/>
                </td>
                <td>
                    <input id="${sessionData[2] + "Hole15"}" type="number" onkeydown="enterButtonFunction(event)" onblur="playerScoreFunction()"/>
                </td>
                <td>
                    <input disabled value="${yardValues[14]}" />
                </td>
            </tr>
            <tr>
                <td>
                    <input disabled value="16" />
                </td>
                <td>
                    <input disabled value="${parValues[15]}" />
                </td>
                <td>
                    <input disabled value="${hcpValues[15]}" />
                </td>
                <td>
                    <input id="${sessionData[0] + "Hole16"}" type="number" onkeydown="enterButtonFunction(event)" onblur="playerScoreFunction()"/>
                </td>
                <td>
                    <input id="${sessionData[1] + "Hole16"}" type="number" onkeydown="enterButtonFunction(event)" onblur="playerScoreFunction()"/>
                </td>
                <td>
                    <input id="${sessionData[2] + "Hole16"}" type="number" onkeydown="enterButtonFunction(event)" onblur="playerScoreFunction()"/>
                </td>
                <td>
                    <input disabled value="${yardValues[15]}" />
                </td>
            </tr>
            <tr>
                <td>
                    <input disabled value="17" />
                </td>
                <td>
                    <input disabled value="${parValues[16]}" />
                </td>
                <td>
                    <input disabled value="${hcpValues[16]}" />
                </td>
                <td>
                    <input id="${sessionData[0] + "Hole17"}" type="number" onkeydown="enterButtonFunction(event)" onblur="playerScoreFunction()"/>
                </td>
                <td>
                    <input id="${sessionData[1] + "Hole17"}" type="number" onkeydown="enterButtonFunction(event)" onblur="playerScoreFunction()"/>
                </td>
                <td>
                    <input id="${sessionData[2] + "Hole17"}" type="number" onkeydown="enterButtonFunction(event)" onblur="playerScoreFunction()"/>
                </td>
                <td>
                    <input disabled value="${yardValues[16]}" />
                </td>
            </tr>
            <tr>
                <td>
                    <input disabled value="18" />
                </td>
                <td>
                    <input disabled value="${parValues[17]}" />
                </td>
                <td>
                    <input disabled value="${hcpValues[17]}" />
                </td>
                <td>
                    <input id="${sessionData[0] + "Hole18"}" type="number" onkeydown="enterButtonFunction(event)" onblur="playerScoreFunction()"/>
                </td>
                <td>
                    <input id="${sessionData[1] + "Hole18"}" type="number" onkeydown="enterButtonFunction(event)" onblur="playerScoreFunction()"/>
                </td>
                <td>
                    <input id="${sessionData[2] + "Hole18"}" type="number" onkeydown="enterButtonFunction(event)" onblur="playerScoreFunction()"/>
                </td>
                <td>
                    <input disabled value="${yardValues[17]}" />
                </td>
            </tr>
            <tr>
                <td>
                    <input disabled value="In" />
                </td>
                <td>
                    <input disabled value="${inPar}" />
                </td>
                <td>
                    <input disabled value="${inHcp}" />
                </td>
                <td>
                    <input id="${sessionData[0] + "In"}" disabled />
                </td>
                <td>
                    <input id="${sessionData[1] + "In"}" disabled />
                </td>
                <td>
                    <input id="${sessionData[2] + "In"}" disabled />
                </td>
                <td>
                    <input disabled value="${inYards}" />
                </td>
            </tr>
            <tr>
                <td>
                    <input disabled value="Total" />
                </td>
                <td>
                    <input disabled value="${totalPar}" />
                </td>
                <td>
                    <input disabled value="${totalHcp}" />
                </td>
                <td>
                    <input id="${sessionData[0] + "Total"}" disabled />
                </td>
                <td>
                    <input id="${sessionData[1] + "Total"}" disabled />
                </td>
                <td>
                    <input id="${sessionData[2] + "Total"}" disabled />
                </td>
                <td>
                    <input disabled value="${totalYards}" />
                </td>
            </tr>
        `)
        } else if(sessionData.length === 2){
            scorecardTable.insertAdjacentHTML("beforeend", `
            <tr>
                <th>
                    <input disabled value="Holes" />
                </th>
                <th>
                    <input disabled value="Par" />
                </th>
                <th>
                    <input disabled value="HDCP" />
                </th>
                ${playerHeaders}
                <th>
                    <input disabled value="Yards" />
                </th>
            </tr>
            <tr>
                <td>
                    <input disabled value="1" />
                </td>
                <td>
                    <input disabled value="${parValues[0]}" />
                </td>
                <td>
                    <input disabled value="${hcpValues[0]}" />
                </td>
                <td>
                    <input id="${sessionData[0] + "Hole1"}" type="number" onkeydown="enterButtonFunction(event)" onblur="playerScoreFunction()"/>
                </td>
                <td>
                    <input id="${sessionData[1] + "Hole1"}" type="number" onkeydown="enterButtonFunction(event)" onblur="playerScoreFunction()"/>
                </td>
                <td>
                    <input disabled value="${yardValues[0]}" />
                </td>
            </tr>
            <tr>
                <td>
                    <input disabled value="2" />
                </td>
                <td>
                    <input disabled value="${parValues[1]}" />
                </td>
                <td>
                    <input disabled value="${hcpValues[1]}" />
                </td>
                <td>
                    <input id="${sessionData[0] + "Hole2"}" type="number" onkeydown="enterButtonFunction(event)" onblur="playerScoreFunction()"/>
                </td>
                <td>
                    <input id="${sessionData[1] + "Hole2"}" type="number" onkeydown="enterButtonFunction(event)" onblur="playerScoreFunction()"/>
                </td>
                <td>
                    <input disabled value="${yardValues[1]}" />
                </td>
            </tr>
            <tr>
                <td>
                    <input disabled value="3" />
                </td>
                <td>
                    <input disabled value="${parValues[2]}" />
                </td>
                <td>
                    <input disabled value="${hcpValues[2]}" />
                </td>
                <td>
                    <input id="${sessionData[0] + "Hole3"}" type="number" onkeydown="enterButtonFunction(event)" onblur="playerScoreFunction()"/>
                </td>
                <td>
                    <input id="${sessionData[1] + "Hole3"}" type="number" onkeydown="enterButtonFunction(event)" onblur="playerScoreFunction()"/>
                </td>
                <td>
                    <input disabled value="${yardValues[2]}" />
                </td>
            </tr>
            <tr>
                <td>
                    <input disabled value="4" />
                </td>
                <td>
                    <input disabled value="${parValues[3]}" />
                </td>
                <td>
                    <input disabled value="${hcpValues[3]}" />
                </td>
                <td>
                    <input id="${sessionData[0] + "Hole4"}" type="number" onkeydown="enterButtonFunction(event)" onblur="playerScoreFunction()"/>
                </td>
                <td>
                    <input id="${sessionData[1] + "Hole4"}" type="number" onkeydown="enterButtonFunction(event)" onblur="playerScoreFunction()"/>
                </td>
                <td>
                    <input disabled value="${yardValues[3]}" />
                </td>
            </tr>
            <tr>
                <td>
                    <input disabled value="5" />
                </td>
                <td>
                    <input disabled value="${parValues[4]}" />
                </td>
                <td>
                    <input disabled value="${hcpValues[4]}" />
                </td>
                <td>
                    <input id="${sessionData[0] + "Hole5"}" type="number" onkeydown="enterButtonFunction(event)" onblur="playerScoreFunction()"/>
                </td>
                <td>
                    <input id="${sessionData[1] + "Hole5"}" type="number" onkeydown="enterButtonFunction(event)" onblur="playerScoreFunction()"/>
                </td>
                <td>
                    <input disabled value="${yardValues[4]}" />
                </td>
            </tr>
            <tr>
                <td>
                    <input disabled value="6" />
                </td>
                <td>
                    <input disabled value="${parValues[5]}" />
                </td>
                <td>
                    <input disabled value="${hcpValues[5]}" />
                </td>
                <td>
                    <input id="${sessionData[0] + "Hole6"}" type="number" onkeydown="enterButtonFunction(event)" onblur="playerScoreFunction()"/>
                </td>
                <td>
                    <input id="${sessionData[1] + "Hole6"}" type="number" onkeydown="enterButtonFunction(event)" onblur="playerScoreFunction()"/>
                </td>
                <td>
                    <input disabled value="${yardValues[5]}" />
                </td>
            </tr>
            <tr>
                <td>
                    <input disabled value="7" />
                </td>
                <td>
                    <input disabled value="${parValues[6]}" />
                </td>
                <td>
                    <input disabled value="${hcpValues[6]}" />
                </td>
                <td>
                    <input id="${sessionData[0] + "Hole7"}" type="number" onkeydown="enterButtonFunction(event)" onblur="playerScoreFunction()"/>
                </td>
                <td>
                    <input id="${sessionData[1] + "Hole7"}" type="number" onkeydown="enterButtonFunction(event)" onblur="playerScoreFunction()"/>
                </td>
                <td>
                    <input disabled value="${yardValues[6]}" />
                </td>
            </tr>
            <tr>
                <td>
                    <input disabled value="8" />
                </td>
                <td>
                    <input disabled value="${parValues[7]}" />
                </td>
                <td>
                    <input disabled value="${hcpValues[7]}" />
                </td>
                <td>
                    <input id="${sessionData[0] + "Hole8"}" type="number" onkeydown="enterButtonFunction(event)" onblur="playerScoreFunction()"/>
                </td>
                <td>
                    <input id="${sessionData[1] + "Hole8"}" type="number" onkeydown="enterButtonFunction(event)" onblur="playerScoreFunction()"/>
                </td>
                <td>
                    <input disabled value="${yardValues[7]}" />
                </td>
            </tr>
            <tr>
                <td>
                    <input disabled value="9" />
                </td>
                <td>
                    <input disabled value="${parValues[8]}" />
                </td>
                <td>
                    <input disabled value="${hcpValues[8]}" />
                </td>
                <td>
                    <input id="${sessionData[0] + "Hole9"}" type="number" onkeydown="enterButtonFunction(event)" onblur="playerScoreFunction()"/>
                </td>
                <td>
                    <input id="${sessionData[1] + "Hole9"}" type="number" onkeydown="enterButtonFunction(event)" onblur="playerScoreFunction()"/>
                </td>
                <td>
                    <input disabled value="${yardValues[8]}" />
                </td>
            </tr>
            <tr>
                <td>
                    <input disabled value="Out" />
                </td>
                <td>
                    <input disabled value="${outPar}" />
                </td>
                <td>
                    <input disabled value="${outHcp}" />
                </td>
                <td>
                    <input disabled id="${sessionData[0] + "Out"}" />
                </td>
                <td>
                    <input disabled id="${sessionData[1] + "Out"}" />
                </td>
                <td>
                    <input disabled value="${outYards}" />
                </td>
            </tr>
            <tr>
                <td>
                    <input disabled value="10" />
                </td>
                <td>
                    <input disabled value="${parValues[9]}" />
                </td>
                <td>
                    <input disabled value="${hcpValues[9]}" />
                </td>
                <td>
                    <input id="${sessionData[0] + "Hole10"}" type="number" onkeydown="enterButtonFunction(event)" onblur="playerScoreFunction()"/>
                </td>
                <td>
                    <input id="${sessionData[1] + "Hole10"}" type="number" onkeydown="enterButtonFunction(event)" onblur="playerScoreFunction()"/>
                </td>
                <td>
                    <input disabled value="${yardValues[9]}" />
                </td>
            </tr>
            <tr>
                <td>
                    <input disabled value="11" />
                </td>
                <td>
                    <input disabled value="${parValues[10]}" />
                </td>
                <td>
                    <input disabled value="${hcpValues[10]}" />
                </td>
                <td>
                    <input id="${sessionData[0] + "Hole11"}" type="number" onkeydown="enterButtonFunction(event)" onblur="playerScoreFunction()"/>
                </td>
                <td>
                    <input id="${sessionData[1] + "Hole11"}" type="number" onkeydown="enterButtonFunction(event)" onblur="playerScoreFunction()"/>
                </td>
                <td>
                    <input disabled value="${yardValues[10]}" />
                </td>
            </tr>
            <tr>
                <td>
                    <input disabled value="12" />
                </td>
                <td>
                    <input disabled value="${parValues[11]}" />
                </td>
                <td>
                    <input disabled value="${hcpValues[11]}" />
                </td>
                <td>
                    <input id="${sessionData[0] + "Hole12"}" type="number" onkeydown="enterButtonFunction(event)" onblur="playerScoreFunction()"/>
                </td>
                <td>
                    <input id="${sessionData[1] + "Hole12"}" type="number" onkeydown="enterButtonFunction(event)" onblur="playerScoreFunction()"/>
                </td>
                <td>
                    <input disabled value="${yardValues[11]}" />
                </td>
            </tr>
            <tr>
                <td>
                    <input disabled value="13" />
                </td>
                <td>
                    <input disabled value="${parValues[12]}" />
                </td>
                <td>
                    <input disabled value="${hcpValues[12]}" />
                </td>
                <td>
                    <input id="${sessionData[0] + "Hole13"}" type="number" onkeydown="enterButtonFunction(event)" onblur="playerScoreFunction()"/>
                </td>
                <td>
                    <input id="${sessionData[1] + "Hole13"}" type="number" onkeydown="enterButtonFunction(event)" onblur="playerScoreFunction()"/>
                </td>
                <td>
                    <input disabled value="${yardValues[12]}" />
                </td>
            </tr>
            <tr>
                <td>
                    <input disabled value="14" />
                </td>
                <td>
                    <input disabled value="${parValues[13]}" />
                </td>
                <td>
                    <input disabled value="${hcpValues[13]}" />
                </td>
                <td>
                    <input id="${sessionData[0] + "Hole14"}" type="number" onkeydown="enterButtonFunction(event)" onblur="playerScoreFunction()"/>
                </td>
                <td>
                    <input id="${sessionData[1] + "Hole14"}" type="number" onkeydown="enterButtonFunction(event)" onblur="playerScoreFunction()"/>
                </td>
                <td>
                    <input disabled value="${yardValues[13]}" />
                </td>
            </tr>
            <tr>
                <td>
                    <input disabled value="15" />
                </td>
                <td>
                    <input disabled value="${parValues[14]}" />
                </td>
                <td>
                    <input disabled value="${hcpValues[14]}" />
                </td>
                <td>
                    <input id="${sessionData[0] + "Hole15"}" type="number" onkeydown="enterButtonFunction(event)" onblur="playerScoreFunction()"/>
                </td>
                <td>
                    <input id="${sessionData[1] + "Hole15"}" type="number" onkeydown="enterButtonFunction(event)" onblur="playerScoreFunction()"/>
                </td>
                <td>
                    <input disabled value="${yardValues[14]}" />
                </td>
            </tr>
            <tr>
                <td>
                    <input disabled value="16" />
                </td>
                <td>
                    <input disabled value="${parValues[15]}" />
                </td>
                <td>
                    <input disabled value="${hcpValues[15]}" />
                </td>
                <td>
                    <input id="${sessionData[0] + "Hole16"}" type="number" onkeydown="enterButtonFunction(event)" onblur="playerScoreFunction()"/>
                </td>
                <td>
                    <input id="${sessionData[1] + "Hole16"}" type="number" onkeydown="enterButtonFunction(event)" onblur="playerScoreFunction()"/>
                </td>
                <td>
                    <input disabled value="${yardValues[15]}" />
                </td>
            </tr>
            <tr>
                <td>
                    <input disabled value="17" />
                </td>
                <td>
                    <input disabled value="${parValues[16]}" />
                </td>
                <td>
                    <input disabled value="${hcpValues[16]}" />
                </td>
                <td>
                    <input id="${sessionData[0] + "Hole17"}" type="number" onkeydown="enterButtonFunction(event)" onblur="playerScoreFunction()"/>
                </td>
                <td>
                    <input id="${sessionData[1] + "Hole17"}" type="number" onkeydown="enterButtonFunction(event)" onblur="playerScoreFunction()"/>
                </td>
                <td>
                    <input disabled value="${yardValues[16]}" />
                </td>
            </tr>
            <tr>
                <td>
                    <input disabled value="18" />
                </td>
                <td>
                    <input disabled value="${parValues[17]}" />
                </td>
                <td>
                    <input disabled value="${hcpValues[17]}" />
                </td>
                <td>
                    <input id="${sessionData[0] + "Hole18"}" type="number" onkeydown="enterButtonFunction(event)" onblur="playerScoreFunction()"/>
                </td>
                <td>
                    <input id="${sessionData[1] + "Hole18"}" type="number" onkeydown="enterButtonFunction(event)" onblur="playerScoreFunction()"/>
                </td>
                <td>
                    <input disabled value="${yardValues[17]}" />
                </td>
            </tr>
            <tr>
                <td>
                    <input disabled value="In" />
                </td>
                <td>
                    <input disabled value="${inPar}" />
                </td>
                <td>
                    <input disabled value="${inHcp}" />
                </td>
                <td>
                    <input id="${sessionData[0] + "In"}" disabled />
                </td>
                <td>
                    <input id="${sessionData[1] + "In"}" disabled />
                </td>
                <td>
                    <input disabled value="${inYards}" />
                </td>
            </tr>
            <tr>
                <td>
                    <input disabled value="Total" />
                </td>
                <td>
                    <input disabled value="${totalPar}" />
                </td>
                <td>
                    <input disabled value="${totalHcp}" />
                </td>
                <td>
                    <input id="${sessionData[0] + "Total"}" disabled />
                </td>
                <td>
                    <input id="${sessionData[1] + "Total"}" disabled />
                </td>
                <td>
                    <input disabled value="${totalYards}" />
                </td>
            </tr>
        `) 
        } else if (sessionData.length === 1){
            scorecardTable.insertAdjacentHTML("beforeend", `
            <tr>
                <th>
                    <input disabled value="Holes" />
                </th>
                <th>
                    <input disabled value="Par" />
                </th>
                <th>
                    <input disabled value="HDCP" />
                </th>
                ${playerHeaders}
                <th>
                    <input disabled value="Yards" />
                </th>
            </tr>
            <tr>
                <td>
                    <input disabled value="1" />
                </td>
                <td>
                    <input disabled value="${parValues[0]}" />
                </td>
                <td>
                    <input disabled value="${hcpValues[0]}" />
                </td>
                <td>
                    <input id="${sessionData[0] + "Hole1"}" type="number" onkeydown="enterButtonFunction(event)" onblur="playerScoreFunction()" />
                </td>
                <td>
                    <input disabled value="${yardValues[0]}" />
                </td>
            </tr>
            <tr>
                <td>
                    <input disabled value="2" />
                </td>
                <td>
                    <input disabled value="${parValues[1]}" />
                </td>
                <td>
                    <input disabled value="${hcpValues[1]}" />
                </td>
                <td>
                    <input id="${sessionData[0] + "Hole2"}" type="number" onkeydown="enterButtonFunction(event)" onblur="playerScoreFunction()"/>
                </td>
                <td>
                    <input disabled value="${yardValues[1]}" />
                </td>
            </tr>
            <tr>
                <td>
                    <input disabled value="3" />
                </td>
                <td>
                    <input disabled value="${parValues[2]}" />
                </td>
                <td>
                    <input disabled value="${hcpValues[2]}" />
                </td>
                <td>
                    <input id="${sessionData[0] + "Hole3"}" type="number" onkeydown="enterButtonFunction(event)" onblur="playerScoreFunction()"/>
                </td>
                <td>
                    <input disabled value="${yardValues[2]}" />
                </td>
            </tr>
            <tr>
                <td>
                    <input disabled value="4" />
                </td>
                <td>
                    <input disabled value="${parValues[3]}" />
                </td>
                <td>
                    <input disabled value="${hcpValues[3]}" />
                </td>
                <td>
                    <input id="${sessionData[0] + "Hole4"}" type="number" onkeydown="enterButtonFunction(event)" onblur="playerScoreFunction()"/>
                </td>
                <td>
                    <input disabled value="${yardValues[3]}" />
                </td>
            </tr>
            <tr>
                <td>
                    <input disabled value="5" />
                </td>
                <td>
                    <input disabled value="${parValues[4]}" />
                </td>
                <td>
                    <input disabled value="${hcpValues[4]}" />
                </td>
                <td>
                    <input id="${sessionData[0] + "Hole5"}" type="number" onkeydown="enterButtonFunction(event)" onblur="playerScoreFunction()"/>
                </td>
                <td>
                    <input disabled value="${yardValues[4]}" />
                </td>
            </tr>
            <tr>
                <td>
                    <input disabled value="6" />
                </td>
                <td>
                    <input disabled value="${parValues[5]}" />
                </td>
                <td>
                    <input disabled value="${hcpValues[5]}" />
                </td>
                <td>
                    <input id="${sessionData[0] + "Hole6"}" type="number" onkeydown="enterButtonFunction(event)" onblur="playerScoreFunction()"/>
                </td>
                <td>
                    <input disabled value="${yardValues[5]}" />
                </td>
            </tr>
            <tr>
                <td>
                    <input disabled value="7" />
                </td>
                <td>
                    <input disabled value="${parValues[6]}" />
                </td>
                <td>
                    <input disabled value="${hcpValues[6]}" />
                </td>
                <td>
                    <input id="${sessionData[0] + "Hole7"}" type="number" onkeydown="enterButtonFunction(event)" onblur="playerScoreFunction()"/>
                </td>
                <td>
                    <input disabled value="${yardValues[6]}" />
                </td>
            </tr>
            <tr>
                <td>
                    <input disabled value="8" />
                </td>
                <td>
                    <input disabled value="${parValues[7]}" />
                </td>
                <td>
                    <input disabled value="${hcpValues[7]}" />
                </td>
                <td>
                    <input id="${sessionData[0] + "Hole8"}" type="number" onkeydown="enterButtonFunction(event)" onblur="playerScoreFunction()"/>
                </td>
                <td>
                    <input disabled value="${yardValues[7]}" />
                </td>
            </tr>
            <tr>
                <td>
                    <input disabled value="9" />
                </td>
                <td>
                    <input disabled value="${parValues[8]}" />
                </td>
                <td>
                    <input disabled value="${hcpValues[8]}" />
                </td>
                <td>
                    <input id="${sessionData[0] + "Hole9"}" type="number" onkeydown="enterButtonFunction(event)" onblur="playerScoreFunction()"/>
                </td>
                <td>
                    <input disabled value="${yardValues[8]}" />
                </td>
            </tr>
            <tr>
                <td>
                    <input disabled value="Out" />
                </td>
                <td>
                    <input disabled value="${outPar}" />
                </td>
                <td>
                    <input disabled value="${outHcp}" />
                </td>
                <td>
                    <input id="${sessionData[0] + "Out"}" disabled value="" />
                </td>
                <td>
                    <input disabled value="${outYards}" />
                </td>
            </tr>
            <tr>
                <td>
                    <input disabled value="10" />
                </td>
                <td>
                    <input disabled value="${parValues[9]}" />
                </td>
                <td>
                    <input disabled value="${hcpValues[9]}" />
                </td>
                <td>
                    <input id="${sessionData[0] + "Hole10"}" type="number" onkeydown="enterButtonFunction(event)" onblur="playerScoreFunction()"/>
                </td>
                <td>
                    <input disabled value="${yardValues[9]}" />
                </td>
            </tr>
            <tr>
                <td>
                    <input disabled value="11" />
                </td>
                <td>
                    <input disabled value="${parValues[10]}" />
                </td>
                <td>
                    <input disabled value="${hcpValues[10]}" />
                </td>
                <td>
                    <input id="${sessionData[0] + "Hole11"}" type="number" onkeydown="enterButtonFunction(event)" onblur="playerScoreFunction()"/>
                </td>
                <td>
                    <input disabled value="${yardValues[10]}" />
                </td>
            </tr>
            <tr>
                <td>
                    <input disabled value="12" />
                </td>
                <td>
                    <input disabled value="${parValues[11]}" />
                </td>
                <td>
                    <input disabled value="${hcpValues[11]}" />
                </td>
                <td>
                    <input id="${sessionData[0] + "Hole12"}" type="number" onkeydown="enterButtonFunction(event)" onblur="playerScoreFunction()"/>
                </td>
                <td>
                    <input disabled value="${yardValues[11]}" />
                </td>
            </tr>
            <tr>
                <td>
                    <input disabled value="13" />
                </td>
                <td>
                    <input disabled value="${parValues[12]}" />
                </td>
                <td>
                    <input disabled value="${hcpValues[12]}" />
                </td>
                <td>
                    <input id="${sessionData[0] + "Hole13"}" type="number" onkeydown="enterButtonFunction(event)" onblur="playerScoreFunction()"/>
                </td>
                <td>
                    <input disabled value="${yardValues[12]}" />
                </td>
            </tr>
            <tr>
                <td>
                    <input disabled value="14" />
                </td>
                <td>
                    <input disabled value="${parValues[13]}" />
                </td>
                <td>
                    <input disabled value="${hcpValues[13]}" />
                </td>
                <td>
                    <input id="${sessionData[0] + "Hole14"}" type="number" onkeydown="enterButtonFunction(event)" onblur="playerScoreFunction()"/>
                </td>
                <td>
                    <input disabled value="${yardValues[13]}" />
                </td>
            </tr>
            <tr>
                <td>
                    <input disabled value="15" />
                </td>
                <td>
                    <input disabled value="${parValues[14]}" />
                </td>
                <td>
                    <input disabled value="${hcpValues[14]}" />
                </td>
                <td>
                    <input id="${sessionData[0] + "Hole15"}" type="number" onkeydown="enterButtonFunction(event)" onblur="playerScoreFunction()"/>
                </td>
                <td>
                    <input disabled value="${yardValues[14]}" />
                </td>
            </tr>
            <tr>
                <td>
                    <input disabled value="16" />
                </td>
                <td>
                    <input disabled value="${parValues[15]}" />
                </td>
                <td>
                    <input disabled value="${hcpValues[15]}" />
                </td>
                <td>
                    <input id="${sessionData[0] + "Hole16"}" type="number" onkeydown="enterButtonFunction(event)" onblur="playerScoreFunction()"/>
                </td>
                <td>
                    <input disabled value="${yardValues[15]}" />
                </td>
            </tr>
            <tr>
                <td>
                    <input disabled value="17" />
                </td>
                <td>
                    <input disabled value="${parValues[16]}" />
                </td>
                <td>
                    <input disabled value="${hcpValues[16]}" />
                </td>
                <td>
                    <input id="${sessionData[0] + "Hole17"}" type="number" onkeydown="enterButtonFunction(event)" onblur="playerScoreFunction()"/>
                </td>
                <td>
                    <input disabled value="${yardValues[16]}" />
                </td>
            </tr>
            <tr>
                <td>
                    <input disabled value="18" />
                </td>
                <td>
                    <input disabled value="${parValues[17]}" />
                </td>
                <td>
                    <input disabled value="${hcpValues[17]}" />
                </td>
                <td>
                    <input id="${sessionData[0] + "Hole18"}" type="number" onkeydown="enterButtonFunction(event)" onblur="playerScoreFunction()"/>
                </td>
                <td>
                    <input disabled value="${yardValues[17]}" />
                </td>
            </tr>
            <tr>
                <td>
                    <input disabled value="In" />
                </td>
                <td>
                    <input disabled value="${inPar}" />
                </td>
                <td>
                    <input disabled value="${inHcp}" />
                </td>
                <td>
                    <input id="${sessionData[0] + "In"}" disabled />
                </td>
                <td>
                    <input disabled value="${inYards}" />
                </td>
            </tr>
            <tr>
                <td>
                    <input disabled value="Total" />
                </td>
                <td>
                    <input disabled value="${totalPar}" />
                </td>
                <td>
                    <input disabled value="${totalHcp}" />
                </td>
                <td>
                    <input id="${sessionData[0] + "Total"}" disabled />
                </td>
                <td>
                    <input disabled value="${totalYards}" />
                </td>
            </tr>
        `)   
        }
    }
}
xmlHTTP.open("GET", golfAPI, true);
xmlHTTP.setRequestHeader("ContentType", "application/json");
xmlHTTP.send();

function enterButtonFunction(event){
    if (event.keyCode === 13) {
        let elementInput = $(event.target);
        elementInput.blur(); 
    }
}

function playerScoreFunction(){
    sessionData.forEach(playerName => {
        let playerOut = 0;
        let playerIn = 0;
        let playerTotal = 0;
        let playerOutInput = document.getElementById(`${playerName}Out`)
        let playerInInput = document.getElementById(`${playerName}In`)
        let playerTotalInput = document.getElementById(`${playerName}Total`)
        let playerScoreInputId;
        let playerscoreInput;
        for (let holeNum = 1; holeNum <= 18; holeNum++) {
            playerScoreInputId = `${playerName}Hole${holeNum}`;
            playerscoreInput = document.getElementById(playerScoreInputId);
            if (holeNum <= 9) {
                playerOut += +playerscoreInput.value;
            }
            if (holeNum >= 10 && holeNum <= 18) {
                playerIn += +playerscoreInput.value;
            }
        }
        playerOutInput.value = playerOut;
        playerInInput.value = playerIn;
        playerTotal = playerOut + playerIn;
        playerTotalInput.value = playerTotal;
    });
}

function getScorecardData() {
    oneCourse.data.holes.forEach((hole, index) => {
        if ( index <= 8) {
            outPar += hole.teeBoxes[0].par
        } else if ( index > 8) {
            inPar += hole.teeBoxes[0].par
        }
        parValues.push(hole.teeBoxes[0].par);
        if ( index <= 8) {
            outHcp += hole.teeBoxes[0].hcp
        } else if ( index > 8) {
            inHcp += hole.teeBoxes[0].hcp
        }
        hcpValues.push(hole.teeBoxes[0].hcp)
        if ( index <= 8) {
            outYards += hole.teeBoxes[0].yards
        } else if ( index > 8) {
            inYards += hole.teeBoxes[0].yards
        }
        yardValues.push(hole.teeBoxes[0].yards)
    })
    totalPar = inPar + outPar;
    totalHcp = inHcp + outHcp;
    totalYards = inYards + outYards;
}

