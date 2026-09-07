import * as webllm from "https://esm.run/@mlc-ai/web-llm";

let highestIndex = 0;
const windows = [
  {
    title: "welcome",
    id: "welcome",
    icon: "endless",
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
    show: "block",
  },
  {
    title: "notes",
    id: "note",
    icon: "blu notes",
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
  {
    title: "chatbot",
    id: "ai",
    icon: "aiApp",
    content: `
    <div class="chatarea"></div>
    <div class="askme">
        <input id = "sendToAI" placeholder="ask me anything" />
        <button id = "AIbtn" type="submit">↑</button>
      </div>
    `,
    script: () => {
      const messages = [
        { role: "system", content: "You are a helpful AI assistant." },
      ];
      function addbubble(message) {
        textplace.innerHTML += `
        <div class="message" id=${message.role}>
              <div class="header">${message.role}</div>
              <hr class="sep" />
              <div class="text">${message.content}</div>
        </div>
            `;
      }
      async function addmessage(message) {
        let reply = { role: "user", content: message };
        messages.push(reply);
        addbubble(reply);

        reply = await AIreply(messages);
        addbubble(reply);
        messages.push({ role: reply.role, content: reply.content });
        generating = false;
      }
      const textplace = document.querySelector(".chatarea");
      const AIbtn = document.querySelector("#AIbtn");
      let generating = false;
      AIbtn.onclick = () => {
        const text = document.querySelector("#sendToAI").value;
        if (text !== "" && !generating) {
          generating = true;
          document.querySelector("#sendToAI").value = "";
          addmessage(text);
        }
      };
      for (let i in messages) {
        const message = messages[i];
        if (message.role === "system") {
          continue;
        }
        addbubble(message);
      }
    },
  },
  {
    title: "Blu's blog",
    id: "blog",
    icon: "blu blog",
    content: `<div id="main" class="post">
            <div class="top">
              <div class="title">first</div>
              <div class="date">8/18/2026 10:45pm</div>
              <div class="sep"></div>
            </div>
            <div class="body">hi this is the first test</div>
          </div>
          <div id="changeblog" class="changeblog">
            <button id="last">before</button>
            <div id="page" class="page"></div>
            <button id="next">next</button>
          </div>`,
    script: () => {
      const content = [
        {
          title: "Welcome",
          date: "8/27/2026 10:32 pm",
          main: `
          welcome to the blog thing of my os this is a fun thing as I will be able to talk freely and not have to worry about how people think of my as it is my blog

          `,
        },
        {
          title: "test",
          date: "8/18/2026 10:45pm",
          main: `
          hi this is the first test
          
          8/27/2026- this is the second test to see if mutli line works with \` but I will see and i will leave this test in since I like it haveing some coding aspect
          `,
        },
        {
          title: "devlog issues",
          date: "9/6/2026 11:53pm",
          main: `
          so when i was doing my devlog on star dance I had thought that devlog was posted and I had extra hours ontop of that but noo the devlog just didn't want to post instead Me thinking it was on extra one I made another devlog like "oh I have more hours sweet" then I look at it and it was like "nope you don't get that other devlog you only get the new mistake one". when I tried to fix it it just didn't want to. so that was fun but hey at least im using the blog to rant about it but other then that there is probally not much use for this but hey this is fun just seeing what im writing right... right.
          `,
        },
        {
          title: "minecraft mods",
          date: "9/6/2026 11:59pm",
          main: `
          you know whats fun about minecraft it's the mods. the game itself is fun but mods make it intesting if I wanted to play normal minecraft I would just play on my xbox or smth but on java the main reason im playing it is to have mods on and some mods I make are funner then others like for example im currently making a mod to be like a vanilla+ style mod with a good amount of optimization with other mods to inhance the gameplay and I really need to make an actual plan of what mods I want and alternatives and other things I could add cause it seems fun but anyways modding is the main reasons I play minecraft but other then mods tha other thing I do play sometimes is servers I don't play them often since I can't find fun ones but I do play sometimes.
          `,
        },
        {
          title: "sleep deprived",
          date: "9/7/2026 11:59pm",
          main: `
          Im like super sleep deprived making this but I just constently yap when im sleep deprived and it's weird and I just start thinking of random topics like just now i was think of making blogs with ai but would that be weid i mean the good would be that it would mean making the nlogs faster but the con is im using ai. but those are minor issues I could churn out blogs so fast I might need to add higher jumps
          `,
        },
      ];
      const pages = document.querySelector("#changeblog #page");
      let cur_page_num = 0;
      function make_blogpage() {
        let html = ``;
        for (let i = 0; i in content; i++) {
          html += `<div id = ${i} ${cur_page_num === i && `class = "bold" `}>${Number(i) + 1}</div>`;
        }
        pages.innerHTML = html;
        const cur_page = content[cur_page_num];
        document.querySelector("#main .title").innerText = cur_page.title;
        document.querySelector("#main .date").innerText = cur_page.date;
        document.querySelector("#main .body").innerText = cur_page.main;
      }
      make_blogpage();
      function change_cur(num) {
        if (
          (cur_page_num + num <= content.length - 1) &
          (cur_page_num + num >= 0)
        ) {
          cur_page_num += num;
          make_blogpage();
        }
      }
      document.querySelector("#changeblog #last").onclick = () => {
        change_cur(-1);
      };
      document.querySelector("#changeblog #next").onclick = () => {
        change_cur(1);
      };
    },
  },
  {
    title: "Blu's search",
    id: "search",
    icon: "internet",
    content: `
     <div class = "bar">
    <input  type="text" placeholder="type to search..."></input>
    <button class="searchbtn" type="submit">search</button>
    </div>
    `,
    script: () => {
      const searchbtn = document.querySelector(".searchbtn");
      searchbtn.onclick = () => {
        let search = document.querySelector(".bar input").value;
        if (search)
          window.location.href = `https://www.google.com/search?q=${search}`;
      };
    },
  },
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
  const topBar = document.getElementById("TopBar");
  highestIndex++;
  element.style.zIndex = highestIndex;
  topBar.style.zIndex = highestIndex + 1;
}
function addWindowHandler(element) {
  element.addEventListener("mousedown", () => {
    change_highest(element);
  });
}
function create_window_drag(element) {
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
}
function create_app(window) {
  const ID = window.id;
  const appbar = document.querySelector(".appBar");
  appbar.innerHTML += `<img
          id="${ID}App"
          class="app"
          src="imgs&gifs\\${window.icon}.png"
          alt="${ID} app"
        />`;
}
function set_scripts(window) {
  setTimeout(() => {
    if (window.script) window.script();
    create_window_drag(window.id ?? window.title);
  }, 0);
}

function create_windowHTML(window) {
  const title = window.title;
  const element = window.id ?? title;
  const show = window.show ?? "none";

  const root = document.querySelector("#root");
  root.innerHTML += `
    <div id="${element}" class="Window" style = "display:${show}">
        <div id="${element}header" class="header">
          <h1 class="title">${title}</h1>
          <p id = "${element}close"class="closeBtn">X</p>
        </div>
        <hr class="sep" />
        <div id="${element}content" class="content">
          ${window.content}
        </div>
      </div>`;
}

function create_window(window) {
  create_app(window);
  create_windowHTML(window);
  set_scripts(window);
}
function create_windows() {
  for (let i in windows) {
    const window = windows[i];
    create_window(window);
  }
}
async function loadmodel(modelId = "Qwen2.5-0.5B-Instruct-q4f16_1-MLC") {
  const initProgressCallback = (progress) => {
    const bar = document.getElementById("bar");
    const note = document.getElementById("loadingnotes");
    bar.style.width = String(progress.progress * 100) + "%";
    note.innerText = progress.text;
  };

  const engine = new webllm.MLCEngine({
    initProgressCallback,
  });

  await engine.reload(modelId);

  return engine;
}
async function AIreply(messages) {
  const reply = await engine.chat.completions.create({
    messages,
  });
  return reply.choices[0].message;
}
function create_bar() {
  const body = document.querySelector("body");
  body.style.backgroundImage = "url(./imgs&gifs/OIP.png)";
  body.innerHTML = `<div id="TopBar" class="TopBar">
      <p>bluOS</p>
      <div class="appBar"></div>
      <p id="clock" class="time"></p>
    </div>
    <div id="root" class="Root"></div>
    `;
}
// const engine = await loadmodel();
create_bar();
create_windows();
update_time();
setInterval(update_time, 1000);
