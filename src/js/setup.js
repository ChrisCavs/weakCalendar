function setup (dateObject) {

  //format timezone
  document.querySelector('.timezone').innerHTML = dateObject.timeZone

  //place current day in week, highlight that day if in subheader
  const currentDayElement = document.querySelector(dateObject.currentDayTag)

  dateObject.today.toString().split(' ')[2] === dateObject.dateDay
  && dateObject.dateMonth === dateObject.monthArray[dateObject.today.getMonth()]
    ? currentDayElement.parentElement.style.color = '#ff3333'
    : currentDayElement.parentElement.style.color = ''

  //assign dates to subheader + subheader class
  Array.from(document.querySelectorAll('.date span')).forEach(day => {

    let thisDate = (dateDay*1) + (weekArray.indexOf(day.classList.value) - dateDayIndex);
    let totalDaysInMonth = monthArrayDays[monthArray.indexOf(dateMonth)];

    //adjust when the day passes the current month
    if (thisDate > totalDaysInMonth) {
      thisDate = Math.abs(thisDate - totalDaysInMonth);
      console.log(thisDate);
    }

    //adjust when days go negative
    if (thisDate <= 0) {
      thisDate = thisDate + totalDaysInMonth;
    }

    day.innerHTML = thisDate;

    //add class. if class already exists, remove and replace
    if (day.parentElement.classList.length < 2) {
      day.parentElement.classList.add(thisDate);
    } else {
      day.parentElement.classList.remove(day.parentElement.classList[1]);
      day.parentElement.classList.add(thisDate);
    }
  });

  //add current month to top of page
  if ((document.querySelectorAll('.date')[1].classList[1])*1 > (document.querySelectorAll('.date')[7].classList[1])*1) {
    document.querySelector('.header-monthof').innerHTML = `${dateMonth}/${monthArray[monthArray.indexOf(dateMonth) + 1]}`;
  } else {
    document.querySelector('.header-monthof').innerHTML = dateMonth;
  }

  //generate empty rightside divs for content, if they have not already been generated
  const rightSideColumn = Array.from(document.querySelectorAll('.rightside-column'));

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
  checkForData();

  //add event listener for onclick content
  Array.from(document.querySelectorAll('.rightside-column-content'))
    .forEach(item => item.addEventListener('click', revealModal));

  //add event listeners on buttons
  document.querySelector('.plus-week').addEventListener('click', addToWeek);
  document.querySelector('.minus-week').addEventListener('click', subtractFromWeek);
  document.querySelector('.clear-calendar').addEventListener('click', clearCalendar);

  //listener on header title (to reset to default view)
  document.querySelector('.header-title').addEventListener('click', defaultView);
}

export {setup}
