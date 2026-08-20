let highestIndex = 0;
const topBar = document.getElementById("TopBar");
const windows = [
  {
    title: "welcome",
    id: "welcome",
    content: `
          <p>
            welcome to the bluOS. this is a OS for stardance. a program from
            hackclub that teens can do.
          </p>
          <p>
            link<br />
            <span style="padding-left: 5px">&#8595;</span>
          </p>
          <a href="https://stardance.hackclub.com/">hackclub's stardance</a>
          `,
  },
  {
    title: "notes",
    id: "note",
    content: `<button id="format" class="format">format</button>
          <div id="write" contenteditable="true" class="write">
            <span>hello you can write in this box and maybe format idk</span>
          </div>`,
    script: () => {
      const formatButton = document.getElementById("format");
      formatButton.onclick = () => {
        let noteArea = document.getElementById("write");
        let info = noteArea.innerText;
        noteArea.innerHTML = info;
      };
    },
  },
  // {
  //   title: "Blu's blog",
  //   id: "blog",
  //   content: `<div id="main"></div>`,
  //   script: () => {
  //     const content = {
  //       title: "first",
  //       date: "8/18/2026 10:45pm",
  //       main: "hi this is the first test",
  //     };
  //     const place = document.querySelector("#main");
  //     place.innerHTML = `
  //     <div>${content.title}</div>
  //     <div>${content.date}</div>
  //     <main>${content.main}</main>

  //     `;
  //   },
  // },
];

function makeElementdragable(id) {
  dragElement(document.getElementById(id));
  // Step 1: Define a function called `dragElement` that makes an HTML element draggable.
  function dragElement(element) {
    // Step 2: Set up variables to keep track of the element's position.
    let initialX = 0;
    let initialY = 0;
    let currentX = 0;
    let currentY = 0;

    // Step 3: Check if there is a special header element associated with the draggable element.
    if (document.getElementById(element.id + "header")) {
      // Step 4: If present, assign the `dragMouseDown` function to the header's `onmousedown` event.
      // This allows you to drag the window around by its header.
      document.getElementById(element.id + "header").onmousedown =
        startDragging;
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
  let time = new Date().toLocaleString().replace(",", "");
  const clock = window.document.getElementById("clock");
  clock.innerHTML = time;
}
function close_window(element) {
  element.style.display = "none";
}

function open_window(element) {
  element.style.display = "block";
  change_highest(element);
}
function change_highest(element) {
  highestIndex++;
  element.style.zIndex = highestIndex;
  topBar.style.zIndex = highestIndex + 1;
}
function addWindowHandler(element) {
  element.addEventListener("mousedown", () => {
    change_highest(element);
  });
}
function create_window(element) {
  var Screen = document.querySelector("#" + element);
  var Open = document.querySelector("#" + element + "App");
  var Close = document.querySelector("#" + element + "close");

  makeElementdragable(element);
  addWindowHandler(Screen);
  Close.addEventListener("click", () => {
    close_window(Screen);
  });
  Open.addEventListener("click", () => {
    if (Screen.style.display === "none") {
      open_window(Screen);
    } else {
      change_highest(Screen);
    }
  });
  close_window(Screen);
}
function create_windows() {
  for (let i in windows) {
    const window = windows[i];
    const title = window.title;
    const element = window.id ?? title;
    const content = window.content;
    const root = document.querySelector("#root");
    root.innerHTML += `
    <div id="${element}" class="Window" style = "display:none">
        <div id="${element}header" class="header">
          <h1 class="title">${title}</h1>
          <p id = "${element}close"class="closeBtn">X</p>
        </div>
        <hr class="sep" />
        <div id="${element}content" class="content">
          ${content}
        </div>
      </div>
    `;
    setTimeout(() => {
      if (window.script) {
        window.script();
      }
      create_window(element);
    }, 0);
  }
}

create_windows();
create_window("blog");

setInterval(update_time, 1000);
