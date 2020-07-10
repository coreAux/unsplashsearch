const formTag = document.querySelector("form");
const inputTag = formTag.querySelector("input");

const accessKey = "CytvQs8dTBPOibHXszVtzgudhsC3ydpwmRaLHrTK8NI";
const apiUrl = "https://api.unsplash.com/search/photos?per_page=24&query=blue";

const searchUnsplash = function (term) {
  return fetch(apiUrl, {
    method: "GET",
    headers: {
      Authorization: "Client-ID " + accessKey,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    });
};

// When we submit the form we get what is in the inputTag
formTag.addEventListener("submit", (event) => {
  // Get the info from the inputTag
  const searchTerm = inputTag.value;

  // Run a search with the searchTerm
  searchUnsplash(searchTerm);

  // Stop the form from going to the usual next page
  event.preventDefault();
});
