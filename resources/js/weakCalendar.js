setup = function () {
  let today = new Date();
  let dd = today.getDate();
  let mm = today.getMonth();
  let yyyy = today.getFullYear();

  let monthArray = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  let dateMonth = monthArray[mm];
  console.log(dateMonth);
  $(".header-monthof").text(dateMonth);
}


$(document).ready(function () {
  setup();
});
