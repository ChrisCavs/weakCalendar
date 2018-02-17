//this constructor is used to aggregate key date data that will be used throughout.
//when cycling through weeks, the constructor is called to get new data

function constructObject (date) {

  //Date info
  this.today = date
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
  this.dateMonth = this.monthArray[this.mm] //as in January, February
  this.totalDaysInMonth = this.monthArrayDays[this.monthArray.indexOf(this.dateMonth)] // 31, 28
  this.dateDayIndex = this.weekArray.indexOf(this.currentDay) //as in 0, 1, 2

  this.timeZone = this.splitDate[5].substring(0,6)
  this.counterWeek = 0
}

export {constructObject}
