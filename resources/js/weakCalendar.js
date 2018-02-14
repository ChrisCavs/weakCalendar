document.addEventListener('DOMContentLoaded', setup);




function clearCalendar () {
  window.localStorage.clear();
  window.location.reload();
}

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

  //if the day isn't monday, pull data from monday next week
  if (currentDay !== 'Mon' && dateMonth !== monthArray[nextWeek.getMonth()]) {
    const mondayNextWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate()+((7*counterWeek)-dateDayIndex));

    //check if monday next week is in a new month.  if so, change the month
    if (monthArray[mondayNextWeek.getMonth()] !== dateMonth) {
      dateMonth = monthArray[nextWeek.getMonth()];
      setup();
    //otherwise, don't change the month
    }
  }

  setup();
}

function subtractFromWeek () {
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

function revealModal (item) {
  item.stopPropagation();
  console.log(item);
  const rightSide = document.querySelector('.rightside');

  if (Array.from(rightSide.classList).includes('pause')) return; //prevent click event while in modal

  if (item.target.classList.length > 1) return; //prevent mouse-drag

  rightSide.classList.add('pause');

  //add placeholder on target
  const highlightedCell = item.target.classList;
  highlightedCell.add('highlighted');

  //reveal the modal near target location
  let yPosition = item.clientY - 20;
  let xPosition = item.clientX + 30;
  if (yPosition > 500) {
    yPosition -= 220;
  }
  if (xPosition > 1000) {
    xPosition -= 280;
  }

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
}

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
  }

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
    dataStorage[dateCode] = [dataArray];
  } else {
    dataStorage[dateCode].push(dataArray);
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
  let domData = dataArray.slice(0,2);
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

  //select each date heading (except timezone)
  Array.from(document.querySelectorAll('.date')).slice(1).forEach(div => {

    const rightSideColumn = document.querySelector(`.rightside .${div.innerHTML.slice(0,3)}`);
    const selection = rightSideColumn.getElementsByTagName('div');

    //delete all the divs in the selection
    Array.from(selection).forEach(childDiv => {
      childDiv.parentNode.removeChild(childDiv);
    });

    //place new clean divs in the column
    for (var i = 0; i < 26; i++) {
      let contentPiece = document.createElement('div');
      contentPiece.className = 'rightside-column-content';
      rightSideColumn.appendChild(contentPiece);
    }

    //filter for the keys that apply to that date
    let filteredKeys = myDATA.filter(key => div.classList.contains(key.split('/')[0]) && key.split('/')[1] == dateMonth);

    //for each key that applies, write the content
    filteredKeys.forEach(key => {
      somethingNew[key].forEach(timeStamp => {
        let domData = timeStamp.slice(0,2);
        let startIndex = timeArray.indexOf(timeStamp[2]);
        let endIndex = timeArray.indexOf(timeStamp[3]);

        //make sure there isn't already content there
        if (selection[startIndex].getElementsByTagName('p').length == 0) {

          domData.forEach(item => {
            const eventP = document.createElement('p');
            const eventNode = document.createTextNode(item);
            eventP.appendChild(eventNode);
            selection[startIndex].appendChild(eventP);
          });

          selection[startIndex].firstChild.classList.add('title');
          selection[startIndex].lastChild.classList.add('body');
          selection[startIndex].style.wordWrap = 'break-word';

          for (var i = startIndex*1; i < endIndex; i++) {
             selection[i].style.backgroundColor = '#e6eeff';
          }
        }
      });
    });
  });
}
