setup = function () {

  //retrieve current date info
  const today = new Date();
  const dd = today.getDate();
  const mm = today.getMonth();
  const yyyy = today.getFullYear();

  const monthArray = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const weekArray = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  console.log(today);

  //add current month to top of page
  const dateMonth = monthArray[mm];
  console.log(dateMonth);
  document.querySelector('.header-monthof').innerHTML(dateMonth);

  //format timezone
  const splitDate = today.toString().split(' ');
  const timeZone = splitDate[5].substring(0,6);
  console.log(timeZone);

  //add timezone to leftside startStop
  document.querySelector('.leftside-timezone').innerHTML(timeZone);

  //place current day in week, highlight that day
  const currentDay = splitDate[0];
  console.log(currentDay);
  currentDayTag = "." + currentDay;
  document.querySelector(`${currentDayTag}`).style('color', '#e6eeff');
}


document.addEventListener('DOMContentLoaded', setup);
