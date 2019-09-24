const alphabet = [
  "A",
  "Ą",
  "B",
  "C",
  "Ć",
  "D",
  "E",
  "Ę",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "Ł",
  "M",
  "N",
  "Ń",
  "O",
  "Ó",
  "P",
  "Q",
  "R",
  "S",
  "Ś",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
  "Ż",
  "Ź"
];
//password declaration
const justWords = [
  "Terminator",
  "Matrix",
  "Żółw",
  "Pistolet",
  "Karma",
  "Klawiatura",
  "Programista",
  "Telefon",
  "Stetoskop",
  "Kasztan",
  "Kot w butach",
  "Cicha woda brzegi rwie",
  "Kevin sam w domu",
  "Pinokio",
  "Zły jak osa",
  "Jajko mądrzejsze od kury",
  "Ania z zielonego wzgórza",
  "Cisza jak makiem zasiał",
  "Harry Potter",
  "Świnka Peppa",
  "Uderz w stół a nożyce się odezwą",
  "Gdzie dwóch się bije tam trzeci korzysta",
  "Piękna i Bestia",
  "Paluszek i główka to szkolna wymówka",
  "Taniec z gwiazdami",
  "Strach ma wielkie oczy",
  "Rzucać słowa na wiatr",
  "Nie taki diabeł straszny jak go malują",
  "NADEPNĄĆ KOMUŚ NA ODCISK",
  "TRUĆ GŁOWĘ"
];
const index = Math.floor(Math.random() * justWords.length);

const pass = justWords[index].toUpperCase();
let password = "";
// other declarations
const word = document.querySelector(".word");
const apl = document.querySelector(".alphabet");
const imag = document.querySelector(".gallows img");
let counter = 1;
const showPassword = document.querySelector(".after");
const spanMistakes = document.querySelector(".mistake");
spanMistakes.textContent = "Pomyłki: 0";

//cover password
for (i = 0; i < pass.length; i++) {
  if (pass.charAt(i) == " ") password = password + " ";
  else password = password + "*";
}

word.textContent = password;

//functions

//init
function init() {
  for (let i = 0; i < alphabet.length; i++) {
    const divek = document.createElement("div");
    divek.textContent = alphabet[i];
    divek.classList.add("letter");
    apl.appendChild(divek);
  }
}
//repleace - with letter
String.prototype.ustawZnak = function(miejsce, znak) {
  if (miejsce > this.length - 1) return this.toString();
  else return this.substr(0, miejsce) + znak + this.substr(miejsce + 1);
};
//generate win/lose message
function finish(message, classToAdd) {
  apl.innerHTML = "";
  const spanMessage = document.createElement("span");
  spanMessage.textContent = message;
  spanMessage.classList.add(classToAdd);
  apl.appendChild(spanMessage);

  const spanRetry = document.createElement("span");
  spanRetry.textContent = "Jeszcze raz?";
  spanRetry.classList.add("reset");
  spanRetry.addEventListener("click", function() {
    location.reload();
  });
  apl.appendChild(spanRetry);
}
//button to show password if u lose
showPassword.addEventListener("click", function() {
  password = pass;
  word.textContent = pass;
});

init();

// sounds
const yes = new Audio("music/yes.wav");
const no = new Audio("music/no.wav");
const win = new Audio("music/win.wav");
const lose = new Audio("music/lose.wav");

apl.addEventListener("click", function(e) {
  const letter = e.target.textContent;
  const nameOfClass = e.target.className;
  if (letter.length == 1) {
    if (pass.includes(letter) && !nameOfClass.includes("correct")) {
      yes.play();
      e.target.classList.add("correct");
      //change correct letter
      for (let i = 0; i < pass.length; i++) {
        if (pass.charAt(i) == letter) {
          password = password.ustawZnak(i, letter);
          word.textContent = password;
        }
      }
    } else if (!nameOfClass.includes("correct")) {
      spanMistakes.textContent = `Pomyłki: ${counter}`;
      no.play();
      e.target.classList.add("incorrect");
      //if make mistake gallows progress
      if (counter < 10) {
        imag.src = `img/s${counter}.jpg`;

        counter++;
      }
    }
  }
  //if lose
  if (counter >= 10) {
    lose.play();
    finish("Przegrałeś :(", "lose");
    showPassword.classList.add("active");
    tryMeForm.style.display = "none";
  }
  //if win
  else if (pass === password) {
    finish("Wygrałeś!!! :)", "win");
    win.play();
    tryMeForm.style.display = "none";
  }
});

//let's try
const tryButton = document.querySelector(".tryMe");
const tryMeForm = document.querySelector(".tryMeForm");
const input = document.querySelector(".tryMeForm input");

let inpValue = "";
input.addEventListener("input", function(e) {
  inpValue = e.target.value.toUpperCase();
});

tryButton.addEventListener("click", function() {
  if (inpValue == pass) {
    finish("Wygrałeś!!! :)", "win");
    tryMeForm.style.display = "none";
    win.play();
  } else {
    finish("Przegrałeś :(", "lose");
    lose.play();
    showPassword.classList.add("active");
    tryMeForm.style.display = "none";
  }
});
