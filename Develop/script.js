// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  let _calendar = $("#calendar");                      //Tie in whole calendar div
  let _hours = [..._calendar.children()];              //Get a list of hours divs from the calendar
  let todayInHours = dayjs().format("HH");             //set var to HH format of current hour of dayjs on page load
  let thingsToDo = [];

  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?

  _calendar.on("click", (event) => {
    let target = $(event.target);
    if(target.hasClass("saveBtn")){
      target.prev()[0].value = target.prev()[0].value.trim();
      console.log(thingsToDo);
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

  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements.
  
  if(localStorage.getItem("thingsToDo") == null){
    localStorage.setItem("thingsToDo", "");
  } else if(localStorage.getItem("thingsToDo") != ""){
    thingsToDo = JSON.stringify(localStorage.getItem("thingsToDo"));
  }

  // TODO: Add code to display the current date in the header of the page.

  checkTime();

});
