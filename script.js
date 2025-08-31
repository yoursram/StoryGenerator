// --- Core Game Data ---
const storyData = {
  plots: [
    "a lost circus animal needs to be found.",
    "a mysterious treasure is hidden under the big top.",
    "a mischievous clown is causing magical chaos.",
    "a grand magical show is in danger of being canceled."
  ],
  characters: [
    { name: "Penny", role: "acrobat", personality: "brave" },
    { name: "Barnaby", role: "ringmaster", personality: "cunning" },
    { name: "Zippy", role: "magician", personality: "wise" },
    { name: "Leo", role: "lion tamer", personality: "loyal" }
  ],
  settings: [
    "in the heart of the bustling circus tent.",
    "behind the scenes in the colorful dressing rooms.",
    "outside the circus grounds on a sunny day.",
    "high on the trapeze wire, looking down at the crowd."
  ],
  emotions: {
    brave: {
      choices: ["Face the challenge head-on!", "Help your friend in need.", "Take a risky leap."],
      outcomes: ["You overcome the obstacle with courage.", "Your bravery inspires a new ally.", "The crowd cheers for your daring feat!"]
    },
    cunning: {
      choices: ["Find a clever shortcut.", "Trick the villain.", "Use your wit to solve a puzzle."],
      outcomes: ["Your cleverness outsmarts the opposition.", "The villain falls for your prank.", "The puzzle is no match for your sharp mind."]
    },
    wise: {
      choices: ["Think carefully about the consequences.", "Ask the wise old fortune teller.", "Find a book with clues."],
      outcomes: ["Your careful planning prevents a disaster.", "The fortune teller gives you a valuable clue.", "The book reveals a secret passage."]
    },
    loyal: {
      choices: ["Stick with your best friend.", "Protect the circus's honor.", "Trust your companion's plan."],
      outcomes: ["Your friendship proves to be the greatest strength.", "The entire circus thanks you for your loyalty.", "Trusting your friend leads to a happy ending."]
    }
  }
};

// --- Image Mapping ---
const plotImages = {
  "a lost circus animal needs to be found.": "./animal.png",
  "a mysterious treasure is hidden under the big top.": "./treasure.png",
  "a mischievous clown is causing magical chaos.": "./circus.png",
  "a grand magical show is in danger of being canceled.": "./canceled_show.png"
};

// --- DOM Elements ---
const storyTextEl = document.getElementById("storyText");
const choiceBtns = [
  document.getElementById("choice1"),
  document.getElementById("choice2"),
  document.getElementById("choice3")
];
const imageContainerEl = document.getElementById("image-container");

// --- Game State Variables ---
let currentStory = {};
let playerPersonality = "";

// --- Helpers ---
function getRandomElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// --- Story Functions ---
function generateStory() {
  const plot = getRandomElement(storyData.plots);
  const character = getRandomElement(storyData.characters);
  const setting = getRandomElement(storyData.settings);

  currentStory = { plot, character, setting };
  playerPersonality = character.personality;
  updateStory();
}

function updateStory() {
  storyTextEl.innerHTML = `You are <b>${currentStory.character.name}</b>, the <b>${currentStory.character.role}</b>, and you're in charge of making sure <b>${currentStory.plot}</b> ${currentStory.setting} What's your first move?`;
  updateChoices();
  updateImage();
}

function updateChoices() {
  const personalityChoices = storyData.emotions[playerPersonality].choices;
  const shuffledChoices = [...personalityChoices].sort(() => 0.5 - Math.random());

  choiceBtns.forEach((btn, index) => {
    btn.textContent = shuffledChoices[index];
    btn.onclick = () => handleChoice(index);
  });
}

function handleChoice(index) {
  const chosenChoice = choiceBtns[index].textContent;
  const outcome = getRandomElement(storyData.emotions[playerPersonality].outcomes);

  storyTextEl.innerHTML = `<span style="font-size: 1.2em; font-weight: bold;">"${chosenChoice}"</span>! ${outcome}`;

  if (chosenChoice.includes("Face") || chosenChoice.includes("Help")) playerPersonality = "brave";
  else if (chosenChoice.includes("clever") || chosenChoice.includes("Trick")) playerPersonality = "cunning";
  else if (chosenChoice.includes("Think") || chosenChoice.includes("Ask")) playerPersonality = "wise";

  setTimeout(generateNextStep, 2000);
}

function generateNextStep() {
  const plotTwist = getRandomElement(storyData.plots.filter(p => p !== currentStory.plot));
  const newCharacter = getRandomElement(storyData.characters.filter(c => c.name !== currentStory.character.name));

  storyTextEl.innerHTML = `Suddenly, a new problem appears: <i>${plotTwist}</i>. You bump into <b>${newCharacter.name}</b>, the <b>${newCharacter.role}</b>, who might have a solution. What do you do now?`;

  currentStory.plot = plotTwist;
  currentStory.character = newCharacter;
  playerPersonality = newCharacter.personality;
  updateChoices();
  updateImage();
}

// --- Image Update ---
function updateImage() {
  imageContainerEl.innerHTML = "";
  const img = document.createElement("img");

  const imageName = plotImages[currentStory.plot];
  img.src = imageName ? `images/${imageName}` : "";

  imageContainerEl.appendChild(img);
}

// --- Start Game ---
generateStory();

