import {setup} from './setup'

const main = () => {

  let dateObject = new function () {

    //Date info
    this.today = new Date()
    this.dd = this.today.getDate()
    this.mm = this.today.getMonth()
    this.yyyy = this.today.getFullYear()

    //useful arrays for indexing
    this.monthArray = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    this.monthArrayDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    this.weekArray = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    this.timeArray = ['730am', '800am', '830am', '900am', '930am', '1000am', '1030am', '1100am', '1130am', '1200pm', '1230pm', '100pm', '130pm', '200pm', '230pm', '300pm', '330pm', '400pm', '430pm', '500pm', '530pm', '600pm', '630pm', '700pm', '730pm', '800pm', '830pm']

    //other useful date info
    this.splitDate = this.today.toString().split(' ')
    this.currentDay = this.splitDate[0] //as in mon, tue, wed
    this.currentDayTag = `.${this.currentDay}`
    this.dateDay = this.splitDate[2] //as in 01, 20, 30
    this.dateMonth = this.monthArray[this.mm] //as in january, february
    this.dateDayIndex = this.weekArray.indexOf(this.currentDay) //as in Mon, Tue

    this.timeZone = this.splitDate[5].substring(0,6)
    this.counterWeek = 0
  }

  setup(dateObject)
}

document.addEventListener('DOMContentLoaded', main)
