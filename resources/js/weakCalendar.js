function setup () {

  //retrieve current date info
  const today = new Date();
  const dd = today.getDate();
  const mm = today.getMonth();
  const yyyy = today.getFullYear();

  const monthArray = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const weekArray = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  //add current month to top of page
  const dateMonth = monthArray[mm];
  document.querySelector('.header-monthof').innerHTML = dateMonth;

  //format timezone
  const splitDate = today.toString().split(' ');
  const timeZone = splitDate[5].substring(0,6);

  //add timezone to leftside startStop
  document.querySelector('.leftside-timezone').innerHTML = timeZone;

  //place current day in week, highlight that day
  const currentDay = splitDate[0];
  currentDayTag = "." + currentDay;
  document.querySelector(currentDayTag).style.color = '#ff3333';
};

document.addEventListener('DOMContentLoaded', setup);
