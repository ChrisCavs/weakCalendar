function setup () {

  //retrieve current date info
  const today = new Date();
  const dd = today.getDate();
  const mm = today.getMonth();
  const yyyy = today.getFullYear();

  const monthArray = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const monthArrayDay = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
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
  const currentDay = splitDate[0]; // as in mon, tue, wed
  const dateDay = splitDate[2] // as in 01, 21, 30
  currentDayTag = "." + currentDay;
  document.querySelector(currentDayTag).style.color = '#ff3333';

  //assign date-day to rightside-dates
  document.querySelector('.rightside-dates span')
  if (weekArray.indexOf(currentDay) == 0) {
    document.querySelectorAll('.rightside-dates span').forEach(day => {
      this.innerHTML = dateDay + (weekArray.indexOf() - weekArray.indexOf())
    })
  }

};

document.addEventListener('DOMContentLoaded', setup);
