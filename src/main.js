let golfAPI = "https://golf-courses-api.herokuapp.com/courses/18300";
let oneCourse;

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
    }
}
xmlHTTP.open("GET", golfAPI, true);
xmlHTTP.setRequestHeader("ContentType", "application/json");
xmlHTTP.send();

