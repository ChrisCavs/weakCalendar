setup = function () {

  //retrieve current date info
  let today = new Date();
  let dd = today.getDate();
  let mm = today.getMonth();
  let yyyy = today.getFullYear();

  let monthArray = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  let weekArray = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  console.log(today);

  //add current month to top of page
  let dateMonth = monthArray[mm];
  console.log(dateMonth);
  $(".header-monthof").text(dateMonth);

  //format timezone
  let splitDate = today.toString().split(' ');
  let timeZone = splitDate[5].substring(0,6);
  console.log(timeZone);

  //add timezone to leftside startStop
  $(".leftside-timezone").text(timeZone);

  //place current day in week, highlight that day
  let currentDay = splitDate[0];
  console.log(currentDay);
  currentDayTag = "." + currentDay;
  $(currentDayTag).style('color', '#e6eeff');

}


$(document).ready(function () {
  setup();
});
