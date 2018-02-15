import {setup} from './setup'
import {constructObject} from './constructObject'
import {addToWeek} from './weekControl'
import {subtractFromWeek} from './weekControl'
import {defaultView} from './weekControl'

const main = () => {

  //use constructor to make initial dateObject
  let dateObject = new constructObject(new Date())

  //add event listeners on +/- buttons
  const add = () => {
    dateObject = addToWeek(dateObject)
    setup(dateObject)
  }

  const subtract = () => {
    dateObject = subtractFromWeek(dateObject)
    setup(dateObject)
  }

  document.querySelector('.plus-week').addEventListener('click', add)
  document.querySelector('.minus-week').addEventListener('click', subtract)

  //add listener on 'clear' button
  document.querySelector('.clear-calendar').addEventListener('click', () => {
    window.localStorage.clear()
    window.location.reload()
  })

  //add listener on header title (to reset to default view)
  document.querySelector('.header-title').addEventListener('click', defaultView)

  //run setup
  setup(dateObject)
}

document.addEventListener('DOMContentLoaded', main)
