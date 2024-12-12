import { filters } from "./constants";

export default function gameLibraryFilterDecorator(games) {
  games.forEach((game) => {
    game.attributes = [];
    filters.forEach((filter) => {
      game.attributes = game.attributes.concat(game[filter.gameKey]);
    });
  });
}

//greatArt
//staffRecommended
//gameOfTheMonth
