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
  compareDit(diet) {
    return this.diet === diet;
  }
}
/**
 * Represents a Person object.
 * @constructor object
 */
 const dinoObj = DinoJson.Dinos.map((dino) => {
  return new Dino(dino);
});
class Human {
  constructor(args) {
    Object.assign(this, args);
    this.heightComparison = [];
    this.weightComparison = [];
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
  const human = new Human(getUserInput());
  dinoObj.forEach((dino) => {
    !dino.compareHeight(human.height) && human.heightComparison.push(dino.fact);
    !dino.compareWeight(human.weight) && human.weightComparison.push(dino.fact);
  });
  shuffle(dinoObj);
  dinoObj.splice(4, 0, human);
  dinoObj.map((obj) => {
    fragment.appendChild(createCard(obj));
  });
  grid.appendChild(fragment);
}
/**
 * reset and toggle grid
 * @constructor object
 * @return void
 */
function toggle() {
  document.getElementById("back").classList.toggle("d-none");
  document.getElementById("dino-compare").classList.toggle("d-none");
  document.getElementById("grid").innerHTML = "";
}
function createCard(obj) {
  const card = document.createElement("div");
  card.classList.add("grid-item");
  if (obj instanceof Human) {
    card.dataset.info = `Weight: ${obj.weight} pounds, Height: ${obj.height} inches`;
    card.innerHTML = `
      <img src="/images/human.png" alt="human">
      <h3>${obj.name}</h3>`;
  } else {
    card.innerHTML = `
    <img src="/images/${String(obj.species).toLowerCase()}.png" alt="${
      obj.species
    }">
    <p>
    ${(obj.species === "Pigeon" && "All birds are Dinosaurs.") || obj.fact}
    </p>`;
  }
  return card;
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
  return { weight, height: feet * 12 + Number(inch), name, diet };
}

function shuffle(array) {
  for (let i = 0; i < array.length; i++) {
    let randomIndex = Math.floor(Math.random() * i);
    let temp = array[i];
    array[i] = array[randomIndex];
    array[randomIndex] = temp;
  }
  return array;
}
