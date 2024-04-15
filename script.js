const text =
  "Bienvenue sur le r/place organisé par Artic.\n- Clic droit/maintenir appuyé = copier la couleur.\n- Molette/écarter les doigts = zoom.\n- Clic gauche/click = placement de son pixel.\n- 1 seconde entre chaque pixel.";
alert(text);

// creation du tableau
const grid = document.querySelector(".grid");

var socket = io("https://rplace-server-side-margotictaclab.replit.app/");

// var socket = io("https://rplace-ServerSide.rafaeldimitrov.repl.co");

for (let i = 0; i < 10000; i++) {
  let span = document.createElement("span");
  span.setAttribute("id", "span_" + i);
  grid.appendChild(span);
}

//choix couleur
let colorSelect = "#000000";
let red = document.getElementById("red");
let orange = document.getElementById("orange");
let yellow = document.getElementById("yellow");
let dark_green = document.getElementById("dark_green");
let green = document.getElementById("green");
let blue_marin = document.getElementById("blue_marin");
let cyan = document.getElementById("cyan");
let turquoise = document.getElementById("turquoise");
let purple = document.getElementById("purple");
let violette = document.getElementById("violette");
let pink = document.getElementById("pink");
let brown = document.getElementById("brown");
let black = document.getElementById("black");
let grey = document.getElementById("grey");
let white = document.getElementById("white");
let lastSelectedColor = "";

red.onclick = function () {
  colorSelect = "#ff4500";
  whatColorDidISelect(red);
  // alert(colorSelect);
};
orange.onclick = function () {
  colorSelect = "#ffa800";
  whatColorDidISelect(orange);
  // alert(colorSelect);
};
yellow.onclick = function () {
  colorSelect = "#ffd635";
  whatColorDidISelect(yellow);
  // alert(colorSelect);
};
dark_green.onclick = function () {
  colorSelect = "#00a368";
  whatColorDidISelect(dark_green);
  // alert(colorSelect);
};
green.onclick = function () {
  colorSelect = "#7eed56";
  whatColorDidISelect(green);
  // alert(colorSelect);
};
blue_marin.onclick = function () {
  colorSelect = "#2450a4";
  whatColorDidISelect(blue_marin);
  // alert(colorSelect);
};
cyan.onclick = function () {
  colorSelect = "#3690ea";
  whatColorDidISelect(cyan);
  // alert(colorSelect);
};
turquoise.onclick = function () {
  colorSelect = "#51e9f4";
  whatColorDidISelect(turquoise);
  // alert(colorSelect);
};
purple.onclick = function () {
  colorSelect = "#811e9f";
  whatColorDidISelect(purple);
  // alert(colorSelect);
};
violette.onclick = function () {
  colorSelect = "#b44ec0";
  whatColorDidISelect(violette);
  // alert(colorSelect);
};
pink.onclick = function () {
  colorSelect = "#ff99aa";
  whatColorDidISelect(pink);
  // alert(colorSelect);
};
brown.onclick = function () {
  colorSelect = "#9c6926";
  whatColorDidISelect(brown);
  // alert(colorSelect);
};
black.onclick = function () {
  colorSelect = "#000000";
  whatColorDidISelect(black);
  // alert(colorSelect);
};
grey.onclick = function () {
  colorSelect = "#898d90";
  whatColorDidISelect(grey);
  // alert(colorSelect);
};
white.onclick = function () {
  colorSelect = "#ffffff";
  whatColorDidISelect(white);
  // alert(colorSelect);
};

function whatColorDidISelect(clickedColor) {
  if (lastSelectedColor) {
    lastSelectedColor.classList.remove("color-selected");
  }
  clickedColor.classList.add("color-selected");
  lastSelectedColor = clickedColor;
  // alert(lastSelectedColor);
}

//copie couleur

//modif des pixels
function updateGrid(spanId, color) {
  updatedPixel = document.getElementById(spanId);
  updatedPixel.style.background = color;
}

let timerOrNot = false;

const spans = document.querySelectorAll(".grid span");
spans.forEach((span) => {
  span.addEventListener("click", (e) => {
    if (timerOrNot == false) {
      e.currentTarget.style.background = colorSelect;
      let modifData = { [e.currentTarget.id] : colorSelect };

			console.log(modifData);
      socket.emit("modifPixel", modifData);

      timerOrNot = true;

      timer();
    };
  });
  //copie de la couleur
  span.addEventListener("contextmenu", (e) => {
    let clickedElementColor = window.getComputedStyle(
      e.currentTarget,
    ).backgroundColor;
    // console.log(rgbToHex(clickedElementColor));
    colorSelect = rgbToHex(clickedElementColor);
    e.preventDefault();
  });

  // console.log(timerOrNot);
});

function timer() {
  if (timerOrNot == true) {
    setTimeout(() => {
      timerOrNot = false;
      // console.log("Nouvelle valeur :", timerOrNot);
    }, 1000);
  }
}

//convertisseur rgb to hex(chat gpt)
function rgbToHex(rgb) {
  // Séparer les composantes R, G, et B
  var rgbArray = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);

  // Convertir les composantes en valeurs hexadécimales
  var hex =
    "#" +
    componentToHex(rgbArray[1]) +
    componentToHex(rgbArray[2]) +
    componentToHex(rgbArray[3]);
  return hex;
}

function componentToHex(component) {
  var hex = parseInt(component, 10).toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

//zoom
let zoomLevel = 1;

document.getElementById("zoomedDiv").addEventListener("wheel", function (e) {
  e.preventDefault();

  if (e.deltaY < 0) {
    // Zoom avant (augmentation du zoomLevel)
    zoomLevel += 0.1;
  } else {
    // Zoom arrière (diminution du zoomLevel)
    zoomLevel = Math.max(zoomLevel - 0.1, 0.1);
  }

  updateZoom();
});

function updateZoom() {
  document.getElementById("zoomedDiv").style.transform =
    "scale(" + zoomLevel + ")";
}

// const chat_interface = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });
// chat_interface.question("> ", function (message) {
//   console.log(message);
//   socket.emit("message", message);
// });
