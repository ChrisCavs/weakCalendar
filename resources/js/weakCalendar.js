document.addEventListener('DOMContentLoaded', setup);

function setup () {

  //retrieve current date info
  const today = new Date();
  const dd = today.getDate();
  const mm = today.getMonth();
  const yyyy = today.getFullYear();

  const monthArray = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const monthArrayDay = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const weekArray = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  //add current month to top of page
  const dateMonth = monthArray[mm];
  document.querySelector('.header-monthof').innerHTML = dateMonth;

  //format timezone
  const splitDate = today.toString().split(' ');
  const timeZone = splitDate[5].substring(0,6);
  document.querySelector('.timezone').innerHTML = timeZone;

  //place current day in week, highlight that day
  const currentDay = splitDate[0]; // as in mon, tue, wed
  const dateDay = splitDate[2] // as in 01, 21, 30
  currentDayTag = "." + currentDay;
  document.querySelector(currentDayTag).parentElement.style.color = '#ff3333';

  //assign dates to subheader
  const dateDayIndex = weekArray.indexOf(currentDay);
  document.querySelectorAll('.date span').forEach(day => {
    let thisDate = (dateDay*1) + (weekArray.indexOf(day.classList.value) - dateDayIndex);
    day.innerHTML = thisDate;
  });

  //generate empty rightside divs for content
  document.querySelectorAll('.rightside-column').forEach(item => {
    for (var i = 0; i < 22; i++) {
      let contentPiece = document.createElement('div');
      contentPiece.className = 'rightside-column-content';
      item.appendChild(contentPiece);
    }
  });

  //add event listener for onclick content
  document.querySelectorAll('.rightside-column-content').forEach(item => addEventListener('click', revealModal));
};

function revealModal (item) {
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
  document.querySelector('.addbutton').addEventListener('click', addEvent);
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

function addEvent () {
  //access data from form
  const form = document.querySelector('form');
  const eventData = form.elements.event.value;
  const detailsData = form.elements.details.value;
  const timeStartData = form.elements.timestart.value;
  const timeEndData = form.elements.timeend.value;
  const dataArray = [eventData, detailsData];
  
  //if timestart=timeend, alert the user
  if (timeStartData == timeEndData) {
    alert('Start time and End time cannot be the same');
    return;
  }

  //set indexes based on time range
  const timeArray = ['730am', '800am', '830am', '900am', '930am', '1000am', '1030am', '1100am', '1130am', '1200pm', '1230pm', '100pm', '130pm', '200pm', '230pm', '300pm', '330pm', '400pm', '430pm', '500pm', '530pm', '600pm'];
  let startIndex = timeArray.indexOf(timeStartData);
  let endIndex = timeArray.indexOf(timeEndData);
  const selection = document.querySelector('.highlighted').parentElement.getElementsByTagName('div');

  //write data into appropriate div
  dataArray.forEach(item => {
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
