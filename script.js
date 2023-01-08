$(function () {
let _calendar = $("#calendar");                      //Tie in whole calendar div
let _hours = [..._calendar.children()];              //Get a list of hours divs from the calendar
let todayInHours = dayjs().format("HH");             //set var to HH format of current hour of dayjs on page load
let thingsToDo = [];                                 //Array that will hold all meeting objects (id, details) during user session

//Create appointment object and constructor
class appointment{
  constructor(id){
    this.id = id;
    this.details = "";
  }
}

//Event listener for save button.  On save, trim() input and save it to the calendar
_calendar.on("click", (event) => {
  let target = $(event.target);
  if(target.hasClass("saveBtn")){
    
    for(let i = 0; i < _hours.length; i++){
      if(_hours[i].id == target.parent()[0].id){
        target.prev()[0].value = target.prev()[0].value.trim();
        thingsToDo[i].details = target.prev()[0].value;
        localStorage.setItem("thingsToDo", JSON.stringify(thingsToDo));
      }
    }

  }
})

//Add styling to hour blocks based on time relative to current time when page is loaded
function checkTime(){
_hours.forEach(hour => {
  if(hour.id.slice(-2) < todayInHours){
    $(hour).addClass("past");
  } else if(hour.id.slice(-2) == todayInHours){
    $(hour).addClass("present");
  } else {
    $(hour).addClass("future");
  }
});
}

//Populate the tracker on load
function populateTracker() {
  for(let i = 0; i < thingsToDo.length; i++){
    _calendar.children().eq(i).children("textarea")[0].value = thingsToDo[i].details;
  }
}

//Initialize local storage if it doesn't exist
if(localStorage.getItem("thingsToDo") == null){
  localStorage.setItem("thingsToDo", "");
}

//If localStorage doesn't exist, perform initialize of object array thingsToDo
//If localStorage does exist, copy values into thingsToDo array on load
if(JSON.parse(localStorage.getItem("thingsToDo") == "")){
    //populate thingsToDo with objects and IDs of corresponding elements
    for(let i = 0; i < _hours.length; i++){
      let appointmentInfo = new appointment(_hours[i].id);
      thingsToDo.push(appointmentInfo);
    } 
} else {
    thingsToDo = JSON.parse(localStorage.getItem("thingsToDo"));
}

//Page setup on load
$("#currentDay").text(dayjs().format("MMMM D, YYYY"));    //Set current date in the header and format
checkTime();                    //Check current time and apply appropriate styling
populateTracker();              //Populate tracker with existing data
});