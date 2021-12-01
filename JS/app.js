import { setSearchFocus, showClearTextButton, clearSearchText, clearKeyListener } from "./searchBar.js"
import { deleteSearchResults, buildSearchResults, clearStatsLine, setStatsLine} from "./searchResults.js"
import { getSearchTerm, retrieveSearchResults } from "./dataFunctions.js"

document.addEventListener("readystatechange", (event) => {
  if (event.target.readyState === "complete") {
    initApp();
  }
});

const initApp = () => {
  setSearchFocus();
  const search = document.getElementById("search");
  search.addEventListener("input", showClearTextButton);
  const clear = document.getElementById("clear");
  clear.addEventListener("click", clearSearchText);
  clear.addEventListener("keydown", clearKeyListener);
  const form = document.getElementById("searchBar");
  form.addEventListener("submit", submitTheSearch)};

  // Procedural "workflow" function
  const submitTheSearch = (event) => {
    event.preventDefault();
    deleteSearchResults();
    // Process the search
    processTheSearch();
    // Set the focus
    setSearchFocus();
};

// Procedural
const processTheSearch = async () => {
  clearStatsLine();
  const searchTerm = getSearchTerm();
  if(searchTerm === "") return; 
  const resultsArray = await retrieveSearchResults(searchTerm);
  if (resultsArray.length) buildSearchResults(resultsArray);
  setStatsLine(resultsArray.length);
};