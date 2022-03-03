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
}
/**
 * Represents a Person object.
 * @constructor object
 */
class Person {
  constructor(args) {
    Object.assign(this, args);
  }
}
(() => {
  document.getElementById("btn").addEventListener("click", (e) => {
    e.preventDefault();
    toggle();
    renderGrid();
  });

  document.getElementById("back").addEventListener("click", () => {
    toggle();
  });
})();
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

function renderGrid() {
  const grid = document.getElementById("grid");
  grid.innerHTML = "";
  const fragment = document.createDocumentFragment();
  const human = new Person(getUserInput());
  const collection = DinoJson.Dinos.map((dino) => {
    return new Dino(dino);
  });
  human.taller = collection
    .filter((dino) => dino.compareHeight(human.height))
    .map(({ species }) => species);
  console.log(human.taller);
  collection.splice(4, 0, human);
  collection.map((obj) => {
    fragment.appendChild(createCard(obj));
  });
  grid.appendChild(fragment);
}

function createCard(obj) {
  const card = document.createElement("div");
  card.classList.add("grid-item");
  card.innerHTML = `
	<img src="/images/${String(obj?.species || "human").toLowerCase()}.png" alt="${
    obj?.species
  }">	
		<h3>${obj?.species || obj?.name}</h3>
	${(obj?.species === "Pigeon" && "<p>All birds are Dinosaurs.</p>") || obj?.fact}
`;
  return card;
}

function toggle() {
  document.getElementById("back").classList.toggle("d-none");
  document.getElementById("dino-compare").classList.toggle("d-none");
  grid.innerHTML = "";
}
