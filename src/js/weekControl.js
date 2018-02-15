import {setup} from './setup'
import {constructObject} from './constructObject'

function defaultView (dateObject) {
  let newDateObject = new constructObject(new Date())
  setup(newDateObject)
}

function addToWeek (dateObject) {

  //save the dateMonth for comparison
  const oldMonth = dateObject.dateMonth

  //create a new dateObject for next week


  dateObject.counterWeek++
  dateObject.today = new Date(dateObject.today.getFullYear(),
                              dateObject.today.getMonth(),
                              dateObject.today.getDate() + (7*dateObject.counterWeek))
  console.log(dateObject)
  //if the day isn't monday, pull data from monday next week
  if (dateObject.currentDay !== 'Mon'
  && dateObject.dateMonth !== oldMonth) {
    const mondayNextWeek = new Date(today.getFullYear(),
                                    today.getMonth(),
                                    today.getDate()
                                      +((7*dateObject.counterWeek)-dateObject.dateDayIndex))

    //if monday next week is in a new month change the month
    if (dateObject.monthArray[mondayNextWeek.getMonth()] !== dateObject.dateMonth) {
      dateObject.dateMonth = dateObject.monthArray[mondayNextWeek.getMonth()]
      setup(dateObject)
    } else {
      dateObject.dateMonth = dateOject.monthArray[dateObject.mm]
    }
  }
  setup(dateObject)
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
