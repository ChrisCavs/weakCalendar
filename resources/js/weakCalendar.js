document.addEventListener('DOMContentLoaded', setup);

let dataStorage = {};
let counterWeek = 0;

//retrieve current date info
const today = new Date();
const dd = today.getDate();
const mm = today.getMonth();
const yyyy = today.getFullYear();

const monthArray = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const monthArrayDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const weekArray = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const timeArray = ['730am', '800am', '830am', '900am', '930am', '1000am', '1030am', '1100am', '1130am', '1200pm', '1230pm', '100pm', '130pm', '200pm', '230pm', '300pm', '330pm', '400pm', '430pm', '500pm', '530pm', '600pm'];

//globals for rendering page and dates
let splitDate = today.toString().split(' ');
let currentDay = splitDate[0]; // as in mon, tue, wed
let dateDay = splitDate[2]; // as in 01, 21, 30

let dateMonth = monthArray[mm];
let dateDayIndex = weekArray.indexOf(currentDay);

const timeZone = splitDate[5].substring(0,6);
let currentDayTag = "." + currentDay;

function setup () {
  //add current month to top of page
  document.querySelector('.header-monthof').innerHTML = dateMonth;

  //format timezone
  document.querySelector('.timezone').innerHTML = timeZone;

  //place current day in week, highlight that day if in subheader
  if (today.toString().split(' ')[2] == dateDay && dateMonth == monthArray[today.getMonth()]) {
    document.querySelector(currentDayTag).parentElement.style.color = '#ff3333';
  } else {
    document.querySelector(currentDayTag).parentElement.style.color = '';
  }

  //assign dates to subheader + subheader class
  Array.from(document.querySelectorAll('.date span')).forEach(day => {
    let thisDate = (dateDay*1) + (weekArray.indexOf(day.classList.value) - dateDayIndex);
    let totalDaysInMonth = monthArrayDays[monthArray.indexOf(dateMonth)]
    
    if (thisDate > totalDaysInMonth) {
      thisDate = thisDate - totalDaysInMonth;
    };
    
    day.innerHTML = thisDate;
    
    if (day.parentElement.classList.length < 2) {
      day.parentElement.classList.add(thisDate);
    } else {
      day.parentElement.classList.remove(day.parentElement.classList[1]);
      day.parentElement.classList.add(thisDate);
    }
  });

  //generate empty rightside divs for content, if they have not already been generated
  if (document.querySelector('.rightside-column').getElementsByTagName('div').length < 22) {
    Array.from(document.querySelectorAll('.rightside-column')).forEach(item => {
      for (var i = 0; i < 22; i++) {
        let contentPiece = document.createElement('div');
        contentPiece.className = 'rightside-column-content';
        item.appendChild(contentPiece);
      }
    });
  }

  //check local storage, fill in data based on saved events
  checkForData();

  //add event listener for onclick content
  Array.from(document.querySelectorAll('.rightside-column-content')).forEach(item => item.addEventListener('click', revealModal));

  //add event listeners on buttons
  document.querySelector('.plus-week').addEventListener('click', addToWeek);
  document.querySelector('.minus-week').addEventListener('click', subtractFromWeek);
  
  //listener on header title (to reset to default view)
  document.querySelector('.header-title').addEventListener('click', defaultView);
};

function defaultView () {
  counterWeek = 0;
  
  splitDate = today.toString().split(' ');
  currentDay = splitDate[0]; // as in mon, tue, wed
  dateDayIndex = weekArray.indexOf(currentDay);
  dateDay = splitDate[2]; // as in 01, 21, 30

  dateMonth = monthArray[today.getMonth()];
  
  setup();
}

function addToWeek () {
  counterWeek++;
  const nextWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate()+(7*counterWeek));

  splitDate = nextWeek.toString().split(' ');
  currentDay = splitDate[0]; // as in mon, tue, wed
  dateDayIndex = weekArray.indexOf(currentDay);
  dateDay = splitDate[2]; // as in 01, 21, 30
  
  dateMonth = monthArray[nextWeek.getMonth()];
  
  setup();
}

function subtractFromWeek () {
  counterWeek--;
  const nextWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate()+(7*counterWeek));

  splitDate = nextWeek.toString().split(' ');
  currentDay = splitDate[0]; // as in mon, tue, wed
  dateDayIndex = weekArray.indexOf(currentDay);
  dateDay = splitDate[2]; // as in 01, 21, 30
  
  dateMonth = monthArray[nextWeek.getMonth()];
  
  setup();
}

function revealModal (item) {
  item.stopPropagation();
  const rightSide = document.querySelector('.rightside');
  
  if (Array.from(rightSide.classList).includes('pause')) return //prevent click event while in modal

  if (item.target.classList.length > 1) return //prevent mouse-drag

  rightSide.classList.add('pause');

  //add placeholder on target
  const highlightedCell = item.target.classList;
  highlightedCell.add('highlighted');

  //reveal the modal near target location
  let yPosition = item.clientY - 20;
  let xPosition = item.clientX + 30;

  const modal = document.querySelector('.modal');
  const modalContainer = document.querySelector('.modal-container');

  modalContainer.style.top = `${yPosition}px`;
  modalContainer.style.left = `${xPosition}px`;
  modal.style.display = "flex";

  //add listener on modal 'add event' click
  document.querySelector('.addbutton').addEventListener('click', addEventToData);
  document.querySelector('.cancelbutton').addEventListener('click', cancelEvent);

  function cancelEvent () {
    //reset css
    document.querySelector('.modal').style.display = 'none';
    highlightedCell.remove('highlighted');
    window.setTimeout(function () {
      rightSide.classList.remove('pause');
    }, 10);
  }
};

function addEventToData () {

  //access data from form
  const form = document.querySelector('form');
  const eventData = form.elements.event.value;
  const detailsData = form.elements.details.value;
  const timeStartData = form.elements.timestart.value;
  const timeEndData = form.elements.timeend.value;
  const dataArray = [eventData, detailsData, timeStartData, timeEndData];

  //if details is empty, alert user
  if (detailsData == '') {
    alert('Details is a required field');
    return;
  };

  //if timestart=timeend, alert the user
  if (timeStartData == timeEndData) {
    alert('Start time and End time cannot be the same');
    return;
  }

  //if event name is empty, alert user
  if (eventData == '') {
    alert('Event name is a required field');
    return;
  }

  //identify dateCode for local storage
  const highlighted = document.querySelector('.highlighted');
  const dataDD = dateDay*1 + (weekArray.indexOf(highlighted.parentElement.className.slice(17,20))-dateDayIndex);
  let dateCode = `${dataDD}/${dateMonth}`;

  //if the dateCode already exists, just add the new data.  otherwise create dateCode
  if (dataStorage[dateCode] === undefined) {
    dataStorage[dateCode] = [];
    dataStorage[dateCode] = [dataArray]
  } else {
    dataStorage[dateCode].push(dataArray)
  }

  //add the data to local storage
  let JStrings = JSON.stringify(dataStorage);
  window.localStorage.setItem('DATA', JStrings);

  //pass data to 'addeventtodom' function
  addEventToDom(dataArray);
}

function addEventToDom (dataArray) {
  //set indexes based on time range
  let startIndex = timeArray.indexOf(dataArray[2]);
  let endIndex = timeArray.indexOf(dataArray[3]);
  let domData = dataArray.slice(0,2)
  const selection = document.querySelector('.highlighted').parentElement.getElementsByTagName('div');

  //write data into appropriate div
  domData.forEach(item => {
    const eventP = document.createElement('p');
    const eventNode = document.createTextNode(item);
    eventP.appendChild(eventNode);
    selection[startIndex].appendChild(eventP);
  });

  //format data
  selection[startIndex].firstChild.classList.add('title');
  selection[startIndex].lastChild.classList.add('body');
  selection[startIndex].style.wordWrap = 'break-word';

  //format divs based on time range
  for (var i = startIndex*1; i < endIndex; i++) {
    selection[i].style.backgroundColor = '#e6eeff';
  }

  //reset css
  document.querySelector('.modal').style.display = 'none';
  document.querySelector('.highlighted').classList.remove('highlighted');
  window.setTimeout(function () {
    document.querySelector('.rightside').classList.remove('pause');
  }, 10);
}

function checkForData () {
  let currentStorage = window.localStorage.getItem('DATA');
  let somethingNew = JSON.parse(currentStorage);

  if(!somethingNew) return;
  let myDATA = Object.keys(somethingNew);

  dataStorage = somethingNew;

  Array.from(document.querySelectorAll('.date')).forEach(div => {
  
    myDATA.forEach(key => {

      //looking for matches between our DATA keys and our subheader classes + month header
      if (div.classList.contains(key.split('/')[0]) 
      && document.querySelector('.header-monthof').innerHTML == key.split('/')[1]) {
      
        const rightSideColumn = document.querySelector(`.rightside .${div.innerHTML.slice(0,3)}`);
        const selection = rightSideColumn.getElementsByTagName('div');

        somethingNew[key].forEach(timeStamp => {
          let domData = timeStamp.slice(0,2);
          let startIndex = timeArray.indexOf(timeStamp[2]);
          let endIndex = timeArray.indexOf(timeStamp[3]);
          
          if (selection[startIndex].getElementsByTagName('p').length == 0) {
        
            domData.forEach(item => {
            const eventP = document.createElement('p');
            const eventNode = document.createTextNode(item);
            eventP.appendChild(eventNode);
            selection[startIndex].appendChild(eventP);
            })

            selection[startIndex].firstChild.classList.add('title');
            selection[startIndex].lastChild.classList.add('body');
            selection[startIndex].style.wordWrap = 'break-word';
  
            for (var i = startIndex*1; i < endIndex; i++) {
               selection[i].style.backgroundColor = '#e6eeff';
            }
          }
        });
      
      //if no key matches the date, make sure the content column is clean
      } else {
        
        const rightSideColumn = document.querySelector(`.rightside .${div.innerHTML.slice(0,3)}`);
        
        let skipThis = false;
        
        myDATA.forEach(key => {
          if (div.classList.contains(key.split('/')[0])) {
            skipThis = true;
          }
        });
        
        //ignore the timezone subheading + ignore columns that match with other keys
        if (rightSideColumn !== null && skipThis == false) {
          const selection = rightSideColumn.getElementsByTagName('div');
          
          //delete all the divs
          Array.from(selection).forEach(childDiv => {
            childDiv.parentNode.removeChild(childDiv);
          });
          
          //place new clean divs in the column
          for (var i = 0; i < 22; i++) {
            let contentPiece = document.createElement('div');
            contentPiece.className = 'rightside-column-content';
            rightSideColumn.appendChild(contentPiece);
          }
        }
      };
    });
  });
}
