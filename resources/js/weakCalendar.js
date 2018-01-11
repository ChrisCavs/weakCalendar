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

  function addEvent () {
    //reset css
    modal.style.display = 'none';
    highlightedCell.remove('highlighted');
    window.setTimeout(function () {
      rightSide.classList.remove('pause');
    }, 10);
    
    console.log(item);
  }

};

function addEvent (item) {
  //reset css
  document.querySelector('.modal').style.display = 'none';
  document.querySelector('.highlighted').classList.remove('highlighted');
  document.querySelector('.rightside').classList.remove('pause');
  console.log(item);
}

document.addEventListener('DOMContentLoaded', setup);
