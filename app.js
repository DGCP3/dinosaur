import DinoJson from "./dino.json" assert { type: "json" };
/**
 * Represents a Dino object.
 * @constructor object
 */
class Dino {
  constructor(args) {
    Object.assign(this, args);
  }
  compareHeight(weight) {
    return this.weight > weight;
  }
  compareWeight(weight) {
    return this.weight > weight;
  }
  createCard() {
    const card = document.createElement("div");
    card.classList.add("grid-item");
    card.innerHTML = `
    <img src="/images/${String(this.species).toLowerCase()}.png" alt="${
      this.species
    }">
    <p>
    ${(this.species === "Pigeon" && "All birds are Dinosaurs.") || this.fact}
    </p>`;
    return card;
  }
}
/**
 * Represents a Person object.
 * @constructor object
 */
class Human {
  constructor(args) {
    Object.assign(this, args);
    this.heightComparison = [];
    this.weightComparison = [];
  }
  createCard() {
    const humanCard = document.createElement("div");
    humanCard.classList.add("grid-item");
    humanCard.dataset.info = `Weight: ${this.weight} pounds, Height: ${this.height} inches`;
    humanCard.innerHTML = `
      <img src="/images/human.png" alt="human">
      <h3>${this.name}</h3>`;
    return humanCard;
  }
}

(() => {
  document.getElementById("btn").addEventListener("click", (e) => {
    e.preventDefault();
    toggle();
    drawCards();
  });
  document.getElementById("back").addEventListener("click", () => {
    toggle();
  });
})();

/**
 * render grid of dino and human card
 * @return void
 */
function drawCards() {
  const fragment = document.createDocumentFragment();
  const dinoObj = DinoJson.Dinos.map((dino) => {
    return new Dino(dino);
  });
  const human = new Human(getUserInput());
  dinoObj
    .filter((dino) => !dino.compareHeight(human.height))
    .map(({ species }) => human.weightComparison.push(species));
  dinoObj
    .filter((dino) => !dino.compareWeight(human.weight))
    .map(({ species }) => human.weightComparison.push(species));
  dinoObj.splice(4, 0, human);
  dinoObj.map((obj) => {
    fragment.appendChild(obj.createCard());
  });
  grid.appendChild(fragment);
}
/**
 * toggle on and off gird of cards and reset
 * @constructor object
 * @return void
 */
function toggle() {
  document.getElementById("back").classList.toggle("d-none");
  document.getElementById("dino-compare").classList.toggle("d-none");
  document.getElementById("grid").innerHTML = "";
}

/**
 * get user input from form and return info as object
 * @constructor object
 * @return { weight, height, name, diet }
 */
function getUserInput() {
  const name = document.getElementById("name").value;
  const feet = document.getElementById("feet").value;
  const inch = document.getElementById("inches").value;
  const weight = document.getElementById("weight").value;
  const diet = document.getElementById("diet").value;

  return { weight, height: feet * 12 + inch, name, diet };
}
