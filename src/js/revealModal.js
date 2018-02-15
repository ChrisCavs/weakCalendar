import {addEventToData} from './eventControl'

function revealModal (item) {

  item.stopPropagation()

  const rightSide = document.querySelector('.rightside')

  //prevent click event while in modal
  if (Array.from(rightSide.classList).includes('pause')) return;

  //prevent mouse-drag
  if (item.target.classList.length > 1) return

  //add pause while modal is up
  rightSide.classList.add('pause')

  //add placeholder on target
  const highlightedCell = item.target.classList
  highlightedCell.add('highlighted')

  //reveal the modal near target location
  let yPosition = item.clientY - 20;
  let xPosition = item.clientX + 30;
  if (yPosition > 500) {
    yPosition -= 220;
  }
  if (xPosition > 1000) {
    xPosition -= 280;
  }

  const modal = document.querySelector('.modal')
  const modalContainer = document.querySelector('.modal-container')

  modalContainer.style.top = `${yPosition}px`
  modalContainer.style.left = `${xPosition}px`
  modal.style.display = "flex"

  //add listener on modal 'add event' click
  document.querySelector('.addbutton').addEventListener('click', addEventToData)
  document.querySelector('.cancelbutton').addEventListener('click', cancelEvent)

  function cancelEvent () {
    //reset css
    document.querySelector('.modal').style.display = 'none'
    highlightedCell.remove('highlighted')
    //do i need this????********************
    window.setTimeout(function () {
      rightSide.classList.remove('pause')
    }, 10)
  }
}

export {revealModal}
