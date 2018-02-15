import {setup} from './setup'

function defaultView (dateObject) {

  dateObject.counterWeek = 0
  dateObject.today = new Date()

  setup()
}

function addToWeek (dateObject) {
  const oldMonth = dateObject.dateMonth

  dateObject.counterWeek++
  dateObject.today = new Date(today.getFullYear(),
                              today.getMonth(),
                              today.getDate() + (7*dateObject.counterWeek))

  //if the day isn't monday, pull data from monday next week
  if (dateObject.currentDay !== 'Mon'
  && dateObject.dateMonth !== oldMonth) {
    const mondayNextWeek = new Date(today.getFullYear(),
                                    today.getMonth(),
                                    today.getDate()
                                      +((7*dateObject.counterWeek)-dateObject.dateDayIndex))

    //check if monday next week is in a new month.  if so, change the month
    // if (dateObject.monthArray[mondayNextWeek.getMonth()] !== dateObject.dateMonth) {
    //   dateObject.dateMonth = dateObject.monthArray[nextWeek.getMonth()];
    //   setup();
    // }
  }

  setup()
}

function subtractFromWeek (dateObject) {
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
