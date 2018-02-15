import {checkForData} from './checkForData'
import {revealModal} from './revealModal'
import {addToWeek} from './weekControl'
import {subtractFromWeek} from './weekControl'
import {defaultView} from './weekControl'

// the purpose of setup() is to place key information
// from our dateObject into the header/subheader,
// and add event listeners to various parts of the page.
// setup() is re-run every time we change our dateObject

function setup (dateObject) {

  //format timezone
  document.querySelector('.timezone').innerHTML = dateObject.timeZone

  //look at currentDay in subheader, check if date matches highlight
  const possibleHighlight = document.querySelector(dateObject.currentDayTag)
  const compare = new Date()
  const compareDay = compare.getDate()

  dateObject.dd === compareDay
    ? possibleHighlight.parentElement.style.color = '#ff3333'
    : possibleHighlight.parentElement.style.color = ''

  //assign dates to subheader + subheader class
  Array.from(document.querySelectorAll('.date span')).forEach(day => {

    let thisDate = (dateObject.dateDay*1)
      + (dateObject.weekArray.indexOf(day.classList.value)
      - dateObject.dateDayIndex)

    //adjust when the day passes the current month
    thisDate > dateObject.totalDaysInMonth
      ? thisDate = Math.abs(thisDate - dateObject.totalDaysInMonth)
      : null

    //adjust when days go negative
    thisDate <= 0
      ? thisDate = thisDate + dateObject.totalDaysInMonth
      : null

    day.innerHTML = thisDate;

    //add class. if class already exists, remove and replace
    if (day.parentElement.classList.length < 2) {
      day.parentElement.classList.add(thisDate)
    } else {
      day.parentElement.classList.remove(day.parentElement.classList[1])
      day.parentElement.classList.add(thisDate)
    }
  })

  //add current month to top of page
  const dateItems = document.querySelectorAll('.date')
  const headerMonth = document.querySelector('.header-monthof')

  //detect when two months are in the week range, and adjust
  dateItems[1].classList[1]*1 > dateItems[7].classList[1]*1
    ? headerMonth.innerHTML = `
        ${dateObject.dateMonth}
        /${dateObject.monthArray[dateObject.monthArray.indexOf(dateObject.dateMonth) + 1]}`
    : headerMonth.innerHTML = dateObject.dateMonth

  //generate empty rightside divs for content, if they have not already been generated
  const rightSideColumn = Array.from(document.querySelectorAll('.rightside-column'))

  if (rightSideColumn[0].children.length < 26) {

    rightSideColumn.forEach(item => {
      //for loop to create 26 empty divs in each column
      for (var i = 0; i < 26; i++) {
        let contentPiece = document.createElement('div');
        contentPiece.className = 'rightside-column-content';
        item.appendChild(contentPiece);
      }
    })
  }

  //check local storage, fill in data based on saved events
  checkForData(dateObject)

  //add event listener for onclick content
  Array.from(document.querySelectorAll('.rightside-column-content'))
    .forEach(item => item
      .addEventListener('click', () => revealModal(dateObject)))
}

export {setup}
