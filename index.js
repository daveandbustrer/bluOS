

function makeElementdragable(id) {
  dragElement(document.getElementById(id));

  // Step 1: Define a function called `dragElement` that makes an HTML element draggable.
  function dragElement(element) {
    // Step 2: Set up variables to keep track of the element's position.
    var initialX = 0;
    var initialY = 0;
    var currentX = 0;
    var currentY = 0;

    // Step 3: Check if there is a special header element associated with the draggable element.
    if (document.getElementById(element.id + "header")) {
      // Step 4: If present, assign the `dragMouseDown` function to the header's `onmousedown` event.
      // This allows you to drag the window around by its header.
      document.getElementById(element.id + "header").onmousedown = startDragging;
    } else {
      // Step 5: If not present, assign the function directly to the draggable element's `onmousedown` event.
      // This allows you to drag the window by holding down anywhere on the window.
      element.onmousedown = startDragging;
    }

    function startDragging(e) {
      e = e || window.event;
      e.preventDefault();
      initialX = e.clientX;
      initialY = e.clientY;
      document.onmouseup = stopDragging;
      document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
      e = e || window.event;
      e.preventDefault();
      currentX = initialX - e.clientX;
      currentY = initialY - e.clientY;
      initialX = e.clientX;
      initialY = e.clientY;
      element.style.top = element.offsetTop - currentY + "px";
      element.style.left = element.offsetLeft - currentX + "px";
    }
    function stopDragging() {
      document.onmouseup = null;
      document.onmousemove = null;
    }
  }
}
function update_time() {
  var time = new Date().toLocaleString().replace(",", "");
  var clock = window.document.getElementById("clock");
  clock.innerHTML = time;
  console.log(time);
}
function close_window(element) {
  element.style.display = "none";
}

function open_window(element) {
  element.style.display = "block";
}

var welcomeScreen = document.querySelector("#welcome");
var welcomeOpen = document.querySelector("#welcomeApp")
var welcomeClose = document.querySelector("#welcome .closeBtn")

function create_window(element){
  var welcomeScreen = document.querySelector("#"+element);
  var welcomeOpen = document.querySelector("#"+element+"App")
  var welcomeClose = document.querySelector("#"+element+" .closeBtn")

  makeElementdragable(element);
  element.addEventListener("click",() =>{
    close_window(welcomeScreen)
  })
  element.addEventListener("click",() =>{
      open_window(welcomeScreen)
  })
}

create_window("welcome")

setInterval(update_time, 1000);
