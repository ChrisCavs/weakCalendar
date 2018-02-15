import {setup} from './setup'
import {constructObject} from './constructObject'

function defaultView (dateObject) {
  let newDateObject = new constructObject(new Date())
  setup(newDateObject)
}

function addToWeek (dateObject) {

  let counterWeek = dateObject.counterWeek
  counterWeek++

  //save the dateMonth for comparison
  const oldMonth = dateObject.dateMonth

  //create a new dateObject for next week
  const today = new Date()
  const nextWeek = new Date(today.getFullYear(),
                            today.getMonth(),
                            today.getDate()+(7*counterWeek))
  const newDateObject = new constructObject(nextWeek)

  //modify the counter
  newDateObject.counterWeek = counterWeek

  //if the day isn't monday, pull data from monday next week
  if (newDateObject.currentDay !== 'Mon'
  && newDateObject.dateMonth !== oldMonth) {
    const mondayNextWeek = new Date(today.getFullYear(),
                                    today.getMonth(),
                                    today.getDate()
                                      +((7*counterWeek)-newDateObject.dateDayIndex))

    //if monday next week is in a new month, change the month
    if (newDateObject.monthArray[mondayNextWeek.getMonth()] !== newDateObject.dateMonth) {
      newDateObject.dateMonth = newDateObject.monthArray[mondayNextWeek.getMonth()]
      setup(newDateObject)
    } else {
      newDateObject.dateMonth = newDateObject.monthArray[newDateObject.mm]
    }
  }
  setup(newDateObject)
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
