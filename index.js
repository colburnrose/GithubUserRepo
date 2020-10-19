const URL = "https://api.github.com/users/";

// FUNC: GET getGithubUser()
function getGithubUser() {
  fetch(URL + userInput() + "/repos")
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(response.statusText);
      }
    })
    .then((responseJson) => displayResults(responseJson))
    .catch((error) => {
      $("#js-error-message").text(
        `Username not found, Status: 404 ${error.message}`
      );
    });
}

function displayResults(response) {
  console.log(response);
  $("#results-list").empty();

  for (let i = 0; i < response.length; i++) {
    $("#results-list").append(
      `<div>
        <li>
            <h3>${response[i].name}</h3>
            <p>
                <a href="${response[i].html_url}" target="_blank">${response[i].full_name}</a>
            </p>
        </li>
      </div>
        `
    );
  }
  $("#results").removeClass("hidden");
}

// FUNC: GET UserInput
function userInput() {
  let userSearch = $("#js-search-user").val();
  return userSearch;
}

function watchForm() {
  $("form").submit(function (e) {
    e.preventDefault();
    getGithubUser(userInput);
  });
}

$(watchForm);
