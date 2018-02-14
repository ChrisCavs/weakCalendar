import {setup} from './setup'

const main = () => {

  let counterWeek = 0

  //retrieve current date info
  const today = new Date()
  const dd = today.getDate()
  const mm = today.getMonth()
  const yyyy = today.getFullYear()

  //useful arrays for indexing
  const monthArray = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  const monthArrayDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
  const weekArray = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  const timeArray = ['730am', '800am', '830am', '900am', '930am', '1000am', '1030am', '1100am', '1130am', '1200pm', '1230pm', '100pm', '130pm', '200pm', '230pm', '300pm', '330pm', '400pm', '430pm', '500pm', '530pm', '600pm', '630pm', '700pm', '730pm', '800pm', '830pm']

  //variables for rendering page and dates
  let splitDate = today.toString().split(' ')
  let currentDay = splitDate[0] // as in mon, tue, wed
  let dateDay = splitDate[2] // as in 01, 21, 30
  let dateMonth = monthArray[mm] // as in february, march, april
  let dateDayIndex = weekArray.indexOf(currentDay) // as in Mon, Tue, Wed

  //define dateObject to pass to functions
  let dateObject = {splitDate, currentDay, dateDay, dateMonth, dateDayIndex})
  console.log(dateObject)

  const timeZone = splitDate[5].substring(0,6)

  setup(timeZone, dateObject)

}

document.addEventListener('DOMContentLoaded', main)
