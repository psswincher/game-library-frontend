import playersImage from "../assets/socialHall.jpg";
import gameLengthImage from "../assets/game wall-2.jpg";
import complexityImage from "../assets/calltoadventure.jpg";

export const tempTokenKey = "jwt";

export const apiInfo = {
  baseUrl: "http://localhost:3001/",
};

export const initialFormValues = {
  addItem: {
    name: "",
    weather: "",
    imageUrl: "",
  },
  signUp: {
    email: "",
    password: "",
    name: "",
    avatar: "",
  },
  login: {
    email: "",
    password: "",
  },
};

export const nullUser = {
  name: "",
  avatar: "",
  email: "",
};

export const categories = [
  {
    name: "Cooperative",
    title: "Cooperative",
    filter: "Category",
    filterValue: "Cooperative",
    subtitle: "Team up with your friends to beat the game!",
  },
  {
    name: "Social",
    title: "Social",
    filter: "Category",
    filterValue: "Social",
    subtitle: "Competive or team-based party games!",
  },
  {
    name: "Competitive",
    title: "Competitive",
    filter: "Category",
    filterValue: "Cooperative",
    subtitle: "Battle against your friends to see who wins!",
  },
  {
    name: "Deception",
    title: "Deception",
    filter: "Category",
    filterValue: "Cooperative",
    subtitle: "Figure out who is and isn't on your side!",
  },
];

export const filters = [
  {
    name: "Players",
    title: "Players",
    options: [
      "2 Players",
      "3 Players",
      "4 Players",
      "5 Players",
      "6 Players",
      "7 Players",
      "8 Players",
    ],
    gameKey: "playerCount",
    heroImg: playersImage,
    heroSubtitle: "How many players are you gaming with?",
    buttonStyle: "default",
    showModeToggle: false,
  },
  {
    name: "Category",
    title: "Category",
    options: ["Cooperative", "Competitive", "Deception", "Social"],
    gameKey: "category",
    heroImg: complexityImage,
    heroSubtitle: "What kind of game?",
    heroFilter: true,
    buttonStyle: "default",
    showModeToggle: false,
  },

  {
    name: "Complexity",
    title: "Complexity",
    options: [
      "Lowest Complexity",
      "Lightweight",
      "Middleweight",
      "Heavyweight",
      "Top Complexity",
    ],
    gameKey: "complexity",
    heroImg: complexityImage,
    heroSubtitle: "How complex of a game are you feeling?",
    heroFilter: true,
    buttonStyle: "default",
    showModeToggle: false,
  },
  {
    name: "Game Length",
    title: "Length",
    options: ["20-30 Mins", "30-60 Mins", "1-2 Hours", "2+ Hours"],
    gameKey: "gameLength",
    heroImg: gameLengthImage,
    heroSubtitle: "How long do you want to spend playing a game?",
    heroFilter: true,
    buttonStyle: "default",
    showModeToggle: false,
  },
  {
    name: "Mechanics",
    title: "Mechanics",
    gameKey: "mechanics",
    heroImg: complexityImage,
    heroSubtitle: "Are there any mechanics you enjoy in a game?",
    options: [
      "Cooperative",
      "Unique Player Powers",
      "Hand/Card Management",
      "Area Control",
      "Economic",
      "Pick Up and Deliver",
      "Tile Laying",
      "Push Your Luck",
      "Worker Placement",
      "Abstract",
      "Perfect Information",
      "Asymmetric",
      "Wargame",
      "Drafting",
      "Gathering Resources",
      "Tug of War",
      "Engine Building",
      "Take That!",
      "Hidden Traitor",
      "Deck Building",
      "Trading",
      "Building Routes",
      "Exploration",
      "Real-Time",
      "Deduction",
      "Auctioning",
      "Betting",
      "Bag Building",
      "Hidden Movement",
      "Team Game",
      "Word Game",
      "Limited Communication",
      "Social Deduction",
      "Role-Playing",
      "Giving Clues",
      "Voting",
      "Racing",
      "Programming",
      "Dexterity",
      "Trick Taking",
      "Bluffing",
      "Negotiation",
      "Humor",
      "Roll and Write",
      "Storytelling",
      "NSFW",
      "Trivia",
      "Memory",
      "Creativity",
      "Drawing",
      "Conversation Starter",
    ],
    buttonStyle: "mechanic",
    heroFilter: false,
    showModeToggle: true,
  },
  {
    name: "User Preferences",
    title: "Preferences",
    options: ["Interested", "Has Played", "Likes"],
    gameKey: "preferences",
    heroImg: gameLengthImage,
    heroSubtitle: "Log in to save your preferences!",
    heroFilter: true,
    buttonStyle: "default",
    showModeToggle: true,
  },
];

export const testFavorites = [
  "Forbidden Island",
  "The Mind",
  "Mascarade",
  "Camel Up",
  "Obscurio",
  "Honey Buzz",
  "High Society",
  "Cascadia",
  "Raiders of the North Sea",
  "Azul",
  "Machi Koro",
  "Modern Art",
  "Pandemic",
  "Parks",
  "Call to Adventure",
  "Concept",
  "Splendor",
];

export const testMajorFavorites = [
  "Dune: Imperium",
  "Brass: Birmingham",
  "Azul",
  "Horrified",
  "Wingspan",
];
