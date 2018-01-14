document.addEventListener('DOMContentLoaded', setup);

//set up object to receive data
let DATA = {};

//retrieve current date info
const today = new Date();
const dd = today.getDate();
const mm = today.getMonth();
const yyyy = today.getFullYear();

const monthArray = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const monthArrayDay = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const weekArray = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const timeArray = ['730am', '800am', '830am', '900am', '930am', '1000am', '1030am', '1100am', '1130am', '1200pm', '1230pm', '100pm', '130pm', '200pm', '230pm', '300pm', '330pm', '400pm', '430pm', '500pm', '530pm', '600pm'];

//place the current day in the week
const splitDate = today.toString().split(' ');
const currentDay = splitDate[0]; // as in mon, tue, wed
const dateDay = splitDate[2]; // as in 01, 21, 30

const dateMonth = monthArray[mm];
const dateDayIndex = weekArray.indexOf(currentDay);


function setup () {
  //add current month to top of page
  document.querySelector('.header-monthof').innerHTML = dateMonth;

  //format timezone
  const timeZone = splitDate[5].substring(0,6);
  document.querySelector('.timezone').innerHTML = timeZone;

  //place current day in week, highlight that day
  currentDayTag = "." + currentDay;
  document.querySelector(currentDayTag).parentElement.style.color = '#ff3333';

  //assign dates to subheader + subheader class
  document.querySelectorAll('.date span').forEach(day => {
    let thisDate = (dateDay*1) + (weekArray.indexOf(day.classList.value) - dateDayIndex);
    day.innerHTML = thisDate;
    day.parentElement.classList.add(thisDate);
  });

  //generate empty rightside divs for content
  document.querySelectorAll('.rightside-column').forEach(item => {
    for (var i = 0; i < 22; i++) {
      let contentPiece = document.createElement('div');
      contentPiece.className = 'rightside-column-content';
      item.appendChild(contentPiece);
    }
  });

  //check local storage, fill in data based on saved events
  checkForData();

  //add event listener for onclick content
  document.querySelectorAll('.rightside-column-content').forEach(item => item.addEventListener('click', revealModal));
};

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
      document.querySelector('.rightside').classList.remove('pause');
    }, 10);
  }
};

function addEventToData () {
  //access data from form
  let form = document.querySelector('form');
  let eventData = form.elements.event.value;
  let detailsData = form.elements.details.value;
  let timeStartData = form.elements.timestart.value;
  let timeEndData = form.elements.timeend.value;
  let dataArray = [eventData, detailsData, timeStartData, timeEndData];

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
  if (!DATA[dateCode]) {
    DATA[dateCode] = [];
    DATA[dateCode].push(
      [timeStartData, dataArray]
    )
  } else {
    DATA[dateCode].push(
      [timeStartData, dataArray]
    )
  };

  //add the data to local storage
  let JStrings = JSON.stringify(DATA);
  localStorage.setItem('DATA', JStrings);

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
  DATA = JSON.parse(localStorage.getItem('DATA'));

  //if local storage is empty, return
  if(!DATA) {
    DATA = {};
    return;
  }

  Object.entries(DATA).forEach(array => {

    document.querySelectorAll('.date').forEach(div => {

      //looking for matches between our DATA keys and our subheader classes
      if (div.classList.contains(array[0].split('/')[0])) {

        //when there's a match, find the appropriate column to write the data
        const rightSideColumn = document.querySelector(`.rightside .${div.innerHTML.slice(0,3)}`);
        const selection = rightSideColumn.getElementsByTagName('div');

        array[1].forEach(timeStamp => {
          const domData = timeStamp[1].splice(0,2);
          const startIndex = timeArray.indexOf(timeStamp[1][0]);
          const endIndex = timeArray.indexOf(timeStamp[1][1]);

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
        });
      }
    });
  });
}
