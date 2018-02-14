import {setup} from './setup'

function defaultView (dataObject) {
  counterWeek = 0;

  splitDate = today.toString().split(' ');
  currentDay = splitDate[0]; // as in mon, tue, wed
  dateDayIndex = weekArray.indexOf(currentDay);
  dateDay = splitDate[2]; // as in 01, 21, 30

  dateMonth = monthArray[today.getMonth()];

  setup();
}

function addToWeek (dataObject) {
  counterWeek++;
  const nextWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate()+(7*counterWeek));

  splitDate = nextWeek.toString().split(' ');
  currentDay = splitDate[0]; // as in mon, tue, wed
  dateDayIndex = weekArray.indexOf(currentDay);
  dateDay = splitDate[2]; // as in 01, 21, 30

  //if the day isn't monday, pull data from monday next week
  if (currentDay !== 'Mon' && dateMonth !== monthArray[nextWeek.getMonth()]) {
    const mondayNextWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate()+((7*counterWeek)-dateDayIndex));

    //check if monday next week is in a new month.  if so, change the month
    if (monthArray[mondayNextWeek.getMonth()] !== dateMonth) {
      dateMonth = monthArray[nextWeek.getMonth()];
      setup();
    //otherwise, don't change the month
    }
  }

  setup();
}

function subtractFromWeek (dataObject) {
  counterWeek--;
  const nextWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate()+(7*counterWeek));
  const mondayNextWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate()+((7*counterWeek)-dateDayIndex));

  splitDate = nextWeek.toString().split(' ');
  currentDay = splitDate[0]; // as in mon, tue, wed
  dateDayIndex = weekArray.indexOf(currentDay);
  dateDay = splitDate[2]; // as in 01, 21, 30

  //unlike addToWeek, we always want the month to switch based on monday of the previous week
  dateMonth = monthArray[mondayNextWeek.getMonth()];
  setup();
}

export {addToWeek, subtractFromWeek, defaultView}
