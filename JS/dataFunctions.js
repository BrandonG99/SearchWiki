export const getSearchTerm = () => {
  const rawSearchTerm = document.getElementById("search").value.trim();
  
  // If there's two or more spaces (in a row) in a search replace it with one space
  const regex = /[ ]{2,}/gi;
  const searchTerm = rawSearchTerm.replaceAll(regex, " ");
  return searchTerm;
};

export const retrieveSearchResults = async (searchTerm) => {
const wikiSearchString = getWikiSearchString(searchTerm);
const wikiSearchResults = await requestData(wikiSearchString);
let resultsArray = [];
if (wikiSearchResults.hasOwnProperty("query")) {
  resultsArray = processWikiResults(wikiSearchResults.query.pages);
}
return resultsArray;
};

const getWikiSearchString = (searchTerm) => {
  const maxCharacters = getMaxCharacters(); 
  const rawSearchString = `https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=${searchTerm}&gsrlimit=20&prop=pageimages|extracts&exchars=${maxCharacters}&exintro&explaintext&exlimit=max&format=json&origin=*`;
  const searchString = encodeURI(rawSearchString);
  return searchString;
};

const getMaxCharacters = () => {
  const width = window.innerWidth || document.body.clientWidth;
  let maxCharacters;
  if (width < 414) maxCharacters = 65;
  if (width >= 414 && width < 1400) maxCharacters = 100;
  if (width >= 1400) maxCharacters = 130;
  return maxCharacters;
};

const requestData = async (searchString) => {
  try {
    const response = await fetch(searchString);
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
  }
}

const processWikiResults = (results) => {
  const resultsArray = [];
  Object.keys(results).forEach(key => {
    const id = key;
    const title = results[key].title;
    const text = results[key].extract;
    const img = results[key].hasOwnProperty("thumbnail")
      ? results[key].thumbnail.source 
      : null;
    const item = {
    id: id,
    title: title,
    img: img,
    text: text
    };
    resultsArray.push(item);
  });
  return resultsArray;
}
