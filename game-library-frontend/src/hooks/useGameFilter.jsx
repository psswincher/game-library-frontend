import { useReducer, useContext, useState, useEffect } from "react";
import { filters } from "../utils/constants";
import { GameFilterContext } from "../contexts/GameFilterContext";

const initialFilterState = () => {
  const status = {};
  status.filterCount = 0;
  filters.forEach((filter) => {
    status[filter.name] = {};
    status[filter.name].options = {};
    status[filter.name].activeCount = 0;

    status.filterCount += 1;
    filter.options.forEach((option) => {
      status[filter.name][option] = false;
    });
  });
  return status;
};

const filterReducer = (state, action) => {
  switch (action.type) {
    case "TOGGLE_FILTER": {
      const newStatus = !state[action.filter].options[action.option];
      const updatedCount = newStatus
        ? state[action.filter].activeCount + 1
        : state[action.filter].activeCount - 1;

      return {
        ...state,
        [action.filter]: {
          ...state[action.filter],
          options: {
            ...state[action.filter].options,
            [action.option]: newStatus,
          },
          activeCount: updatedCount,
        },
      };
    }

    case "RESET_FILTERS": {
      const resetState = {};
      Object.keys(state).forEach((filterName) => {
        resetState[filterName] = {
          options: Object.keys(state[filterName].options).reduce(
            (acc, option) => {
              acc[option] = false;
              return acc;
            },
            {}
          ),
          activeCount: 0,
        };
      });
      return resetState;
    }

    default:
      return state;
  }
};

export const GameFilterContextProvider = ({ children, gameLibrary }) => {
  const [filterState, dispatch] = useReducer(
    filterReducer,
    initialFilterState()
  );
  const [filteredGames, setFilteredGames] = useState(gameLibrary);

  const onFilterOptionClick = (filter, option) => {
    dispatch({ type: "TOGGLE_FILTER", filter, option });
  };

  const resetFilters = () => {
    dispatch({ type: "RESET_FILTERS" });
  };

  const getActiveFilterOptions = (gameFilter) => {
    return gameFilter.options.filter((option) => filterState[option]);
  };

  const getAllActiveFilterOptions = () => {
    const activeOptions = [];
    filters.forEach((filter) => {
      if (filterState[filter.name].activeCount) {
        activeOptions.push(
          Object.keys(filterState[filter.name].options).filter(
            (option) => filterState[filter.name].options[option]
          )
        );
      }
    });
    return activeOptions;
  };

  const getActiveFilterCount = () => {
    let activeCount = 0;
    filters.forEach((filter) => {
      if (filterState[filter.name].activeCount) {
        activeCount += filterState[filter.name].activeCount;
      }
    });
    return activeCount;
  };

  const isFilterActive = (filterName) => {
    return filterState[filterName].activeCount;
  };

  const isOptionActive = (filterName, option) => {
    return filterState[filterName].options[option];
  };

  const getFilterTitle = (gameFilter) => {
    if (filterState[gameFilter.name]) {
      switch (filterState[gameFilter.name].activeCount) {
        case 0:
          return gameFilter.title;
        case 1:
          return findActiveFilter(gameFilter.name);
        default:
          return findActiveFilter(gameFilter.name) + "+";
      }
    } else {
      return "...loading";
    }
  };

  const findActiveFilter = (filterName) => {
    if (filterState[filterName]) {
      return Object.entries(filterState[filterName].options).find(
        ([key, value]) => value === true
      )?.[0];
    } else {
      console.error(
        "Can't findActiveFilter, no filter exists by name",
        filterName
      );
      return filterName;
    }
  };

  const filterCount = () => {
    return filterState.filterCount;
  };

  const isAnyFilterActive = () => {
    let active = 0;
    filters.forEach((filter) => {
      active += filterState[filter.name].activeCount;
    });
    return active;
  };

  useEffect(() => {
    setFilteredGames(filterGames());
  }, [filterState, gameLibrary]);

  const filterGames = () => {
    if (isAnyFilterActive()) {
      return gameLibrary.filter((game) => {
        return filters.every((filter) => {
          if (filterState[filter.name].activeCount === 0) return true;
          const filterOptions = filterState[filter.name].options;

          const filterPasses = Object.keys(filterOptions).some((option) => {
            return filterOptions[option] && game.attributes.includes(option);
          });
          return filterPasses;
        });
      });
    }
    return gameLibrary;
  };

  return (
    <GameFilterContext.Provider
      value={{
        filterState,
        isFilterActive,
        isOptionActive,
        filteredGames,
        onFilterOptionClick,
        resetFilters,
        getActiveFilterOptions,
        getAllActiveFilterOptions,
        getFilterTitle,
        filterCount,
        getActiveFilterCount,
      }}
    >
      {children}
    </GameFilterContext.Provider>
  );
};

export const useGameFilters = () => {
  return useContext(GameFilterContext);
};
