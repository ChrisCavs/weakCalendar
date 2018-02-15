function checkForData (dataObject) {

  //pull localStorage
  let currentStorage = JSON.parse(window.localStorage.getItem('DATA'))

  //check if storage is empty
  if(!currentStorage) {
    return
  } else {
    myDATA = Object.keys(currentStorage)
  }

  //select each date heading (except timezone)
  Array.from(document.querySelectorAll('.date')).slice(1).forEach(div => {

    const rightSideColumn = document.querySelector(`.rightside .${div.innerHTML.slice(0,3)}`)
    const selection = rightSideColumn.getElementsByTagName('div')

    //delete all the divs in the selection
    Array.from(selection).forEach(childDiv => {
      childDiv.parentNode.removeChild(childDiv)
    })

    //place new clean divs in the column
    for (var i = 0; i < 26; i++) {
      let contentPiece = document.createElement('div')
      contentPiece.className = 'rightside-column-content'
      rightSideColumn.appendChild(contentPiece)
    }

    //filter for the keys that apply to that date
    let filteredKeys = myDATA.filter(key =>
        div.classList.contains(key.split('/')[0])
        && key.split('/')[1] == dataObject.dateMonth)

    //for each key that applies, write the content
    filteredKeys.forEach(key => {
      myDATA[key].forEach(timeStamp => {
        let domData = timeStamp.slice(0,2)
        let startIndex = timeArray.indexOf(timeStamp[2])
        let endIndex = timeArray.indexOf(timeStamp[3])

        //make sure there isn't already content there
        if (selection[startIndex].getElementsByTagName('p').length === 0) {

          domData.forEach(item => {
            const eventP = document.createElement('p')
            const eventNode = document.createTextNode(item)
            eventP.appendChild(eventNode)
            selection[startIndex].appendChild(eventP)
          })

          //adjust styles and classes
          selection[startIndex].firstChild.classList.add('title')
          selection[startIndex].lastChild.classList.add('body')
          selection[startIndex].style.wordWrap = 'break-word'

          for (var i = startIndex*1; i < endIndex; i++) {
             selection[i].style.backgroundColor = '#e6eeff'
          }
        }
      })
    })
  })
}

export {checkForData}
