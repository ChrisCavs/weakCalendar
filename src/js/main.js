import {setup} from './setup'
import {constructObject} from './constructObject'
import {addToWeek} from './weekControl'
import {subtractFromWeek} from './weekControl'
import {defaultView} from './weekControl'

const main = () => {

  //use constructor to make initial dateObject
  let dateObject = new constructObject(new Date())

  //these functions will modify dateObject to reflect changes in weeks
  const add = () => {
    dateObject = addToWeek(dateObject)
    setup(dateObject)
  }

  const subtract = () => {
    dateObject = subtractFromWeek(dateObject)
    setup(dateObject)
  }

  const goToDefault = () => {
    dateObject = defaultView()
    setup(dateObject)
  }

  //add event listeners on +/- buttons, as well as header title
  document.querySelector('.plus-week').addEventListener('click', add)
  document.querySelector('.minus-week').addEventListener('click', subtract)
  document.querySelector('.header-title').addEventListener('click', goToDefault)

  //add listener on 'clear' button
  document.querySelector('.clear-calendar').addEventListener('click', () => {
    window.localStorage.clear()
    window.location.reload()
  })

  //run setup
  setup(dateObject)
}

document.addEventListener('DOMContentLoaded', main)
