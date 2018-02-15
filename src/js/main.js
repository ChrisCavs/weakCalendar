import {setup} from './setup'
import {constructObject} from './constructObject'
import {addToWeek} from './weekControl'
import {subtractFromWeek} from './weekControl'
import {defaultView} from './weekControl'

const main = () => {

  //use constructor to make initial dateObject
  const dateObject = new constructObject(new Date())

  //add event listeners on buttons
  document.querySelector('.plus-week')
    .addEventListener('click', () => addToWeek(dateObject))
  document.querySelector('.minus-week')
    .addEventListener('click', () => subtractFromWeek(dateObject))

  document.querySelector('.clear-calendar').addEventListener('click', () => {
    window.localStorage.clear()
    window.location.reload()
  })

  //listener on header title (to reset to default view)
  document.querySelector('.header-title').addEventListener('click', defaultView)

  //run setup
  setup(dateObject)
}

document.addEventListener('DOMContentLoaded', main)
