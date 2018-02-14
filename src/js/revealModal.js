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
