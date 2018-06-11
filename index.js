// STEP NUMBER TWO - USE ID=REPOSITORIES TO GET XML REQUEST 
function getRepositories() {
  const req = new XMLHttpRequest()
  req.addEventListener("load", showRepositories);
  req.open("GET", 'https://api.github.com/users/octocat/repos')
  req.send()
}

// STEP FOUR, GET OBJECT, CREATE TEMPLATE, CREATE HANDLEBARS WITH TEMPLATE, GET REPOS DATA
// FROM THIS TO TEMPLATE TO HANDLEBARS
function showRepositories(event, data) {
  const repos = JSON.parse(this.responseText)
  const src = document.getElementById("repository-template").innerHTML
  const template = Handlebars.compile(src)
  const repoList = template(repos)
  document.getElementById("repositories").innerHTML = repoList
}

//STEP 6 - MAKE JAVASCRIPT PARTIAL

document.addEventListener("DOMContentLoaded", function(event) {
  Handlebars.registerPartial("authorPartial", document.getElementById("author-partial-template").innerHTML)
});