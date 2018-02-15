import {setup} from './setup'
import {constructObject} from './constructObject'

const main = () => {

  //use constructor to make initial dateObject
  const dateObject = new constructObject(new Date())

  //run setup
  setup(dateObject)
}

document.addEventListener('DOMContentLoaded', main)
