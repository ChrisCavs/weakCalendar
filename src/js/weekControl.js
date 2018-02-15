import {setup} from './setup'
import {constructObject} from './constructObject'

// create a dateObject idential to what is made in main.js
function defaultView (dateObject) {

  let newDateObject = new constructObject(new Date())

  setup(newDateObject)
}

// create a dateObject one week in the future, run tests, then run setup.js
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
  newDateObject.counterWeek = counterWeek

  //if the day isn't monday, and the month changed, pull data from monday next week
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

// create a dateObject one week behind, then run setup.js
function subtractFromWeek (dateObject) {

  let counterWeek = dateObject.counterWeek
  counterWeek--

  //same variables as addToWeek() (but different counter)
  const today = new Date()
  const nextWeek = new Date(today.getFullYear(),
                            today.getMonth(),
                            today.getDate()+(7*counterWeek))

  const newDateObject = new constructObject(nextWeek)
  newDateObject.counterWeek = counterWeek

  //unlike addToWeek, we always want the month to switch based on monday of the previous week
  const mondayNextWeek = new Date(today.getFullYear(),
                                  today.getMonth(),
                                  today.getDate()
                                    +((7*counterWeek)-newDateObject.dateDayIndex))
  newDateObject.dateMonth = newDateObject.monthArray[mondayNextWeek.getMonth()]
  
  setup();
}

export {addToWeek, subtractFromWeek, defaultView}
