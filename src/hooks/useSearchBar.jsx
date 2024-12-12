import { useState } from "react";

function useSearchBar(initialValue = "") {
  const [searchTerm, setSearchTerm] = useState(initialValue);

  const searchArray = ({ array, field, filterTerm = "" }) => {
    if (!filterTerm) {
      console.log("No filter term to filter searchArray by.");
      return array;
    }

    if (Array.isArray(array)) {
      return array.filter((entry) => {
        return (
          entry[field] &&
          entry[field]?.toLowerCase().includes(filterTerm.toLowerCase())
        );
      });
    } else {
      console.log("Can't complete array search. Not an array.");
      return array;
    }
  };

  return { searchTerm, setSearchTerm, searchArray };
}

export default useSearchBar;
