const formTag = document.querySelector("form");
const inputTag = formTag.querySelector("input");
const resultsTag = document.querySelector("section.results");

const accessKey = "CytvQs8dTBPOibHXszVtzgudhsC3ydpwmRaLHrTK8NI";
const apiUrl = "https://api.unsplash.com/search/photos?per_page=24&query=";

const searchUnsplash = function (term) {
  return fetch(apiUrl + term, {
    method: "GET",
    headers: {
      Authorization: "Client-ID " + accessKey,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      // format unsplash's results to suis our needs
      return data.results.map((result) => {
        return {
          imageSrc: result.urls.regular,
          width: result.width,
          height: result.height,
          name: result.user.name,
          title: result.description || "Untitled",
          backgroundColor: (result.color || "#cccccc") + "33",
        };
      });
    });
};

// Add results to the page
const addResults = function (results) {
  // Remove all the loading tags
  resultsTag.innerHTML = "";

  // Loop over each individual result and add to the results tag
  results.forEach((result) => {
    resultsTag.innerHTML =
      resultsTag.innerHTML +
      `
      <div class="single-result">
        <div class="image" style="background-color: ${result.backgroundColor}">
          <img src="${result.imageSrc}" />
        </div>
        <h2>${
          result.title.length > 100
            ? result.title.slice(0, 100).trim() + "..."
            : result.title
        }</h2>
        <p>by ${result.name} — ${result.width} x ${result.height}</p>
      </div>
    `;
  });
};

// When we submit the form we get what is in the inputTag
formTag.addEventListener("submit", (event) => {
  // Get the info from the inputTag
  const searchTerm = inputTag.value;

  // Run a search with the searchTerm
  searchUnsplash(searchTerm).then((results) => {
    addResults(results);
  });

  // Stop the form from going to the usual next page
  event.preventDefault();
});
