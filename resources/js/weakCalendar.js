setup = function () {

  //retrieve current date info
  let today = new Date();
  let dd = today.getDate();
  let mm = today.getMonth();
  let yyyy = today.getFullYear();

  let monthArray = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

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
}


$(document).ready(function () {
  setup();
});
