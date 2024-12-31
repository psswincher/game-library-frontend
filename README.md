# Game Library Browser - Frontend

This project's goal is to help users quickly and easily find a board game to play from among a collection of games. Users may:

- filter games by attributes and their personal preferences
- register a profile to save their preferences
- browse on both mobile and desktop

While backend features are detailed in the backend readme, it is important to note that game collection data is initially created in an Airtable base, allowing collection owners to maintain and share game information as they see fit.

Project is deployed to https://www.gamelibtest.twilightparadox.com/

## Setup

This frontend makes use of a custom api whose url is stored in ./utils/constants.js in the apiInfo.baseUrl variable. By default, that variable is currently "http://localhost:3001/"

## Technologies Used

- ReactJS - Vite
- Framer Motion
- AWS Buckets
- Custom Backend

## Game Presentation

A RESTful API with a custom backend fetches game data from a cloud driven database. Game images are stored in an AWS Bucket, with the database providing urls to the games.

Games are presented in a css grid, and each game card is dynamically driven: games can be flagged as featured, staff favorites or having strong art, which changes the layout, size and level of detail presented by each game. On click, a modal with the game's image and details is brought in.

## Filter Logic

Users can filter games based on two factors:

1. attributes of the games themselves, including players, game length, complexity and mechanics
2. user game preferences, including liking, being interested or having played a game

Depending on the filter, filters may operate additively or exclusively (eg. show me all games that have hand management OR bluffing vs. show me all games that have both hand management AND bluffing).

Filter logic and types of filters are loosely coupled, with types of filters being declared in utils/constants.js, allowing administrators to easily tailor differing types of filters to their own collection. Filter status is handled by a reactjs reducer. As the user updates filters, the card collection is immediately dynamically re-rendered.

## Filter Presentation

Filter buttons are strategically placed both within the games themselves and in a tabbed modal for ease of navigation. Reusing components and storing filter logic in a hook while passing it through a reactjs useContext allows clarity and strong separation of concerns.

Wherever filterable data is displayed, that data is also a button that can activate that filter. Filters can also be found in a tabbed modal. Whenever a filter is activated, the modal button pulses and shows a live count of the number of active filters.

Finally, a hero carousel on the main page rapidly leads the user through selecting key filters to immediately get them started on finding their game.

## User Registration, Login and Features

Users can register an account with their name and avatar. Upon doing so, users can find an interaction bar in featured games and in the game detail modal. This bar allows them to:

- like a game
- flag a game they are interested in
- note a game that they have played

Users can then filter the collection by these preferences.

Because game data is drawn from an Airtable base and user data is solely stored in the custom backend, a decorator pattern is used to add user preferences to game data upon logging in. This saves the app from having to recalculate the user's preferences for each game when viewing the game, instead injecting those preferences in one operation.

## Framer Motion Animation

Lightweight use of the Framer Motion library is used in this website to make navigation more pleasant and to highlight certain functionality:

- the css grid layout of game cards is driven by framer motion to make filtering games in and out of the view fun
- mechanics buttons have a one time entrance animation to demonstrate to the user that they are buttons

Thank you for you reviewing all of this code!
