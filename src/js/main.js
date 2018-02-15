import {setup} from './setup'
import {constructObject} from './constructObject'

const main = () => {

  //constructor function that will make dateObjects as we go

  const dateObject = new constructObject(new Date())

  setup(dateObject)
}

document.addEventListener('DOMContentLoaded', main)
