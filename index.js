// Register a partial with Handlebars when the page loads
document.addEventListener("DOMContentLoaded", function(event) {
  Handlebars.registerPartial("authorPartial", document.getElementById("author-partial-template").innerHTML)
});

// Initiate a getRepositories function when a user clicks the "Get Repositories"
// anchor tag
function getRepositories() {
  const req = new XMLHttpRequest()
  req.addEventListener("load", showRepositories);
  req.open("GET", 'https://api.github.com/users/octocat/repos')
  req.send()
}

function showRepositories(event, data) {
  const repos = JSON.parse(this.responseText)
  // We get the innerHTML of our template script tag to compile into a template 
  // function that we pass our JSON response into.
  // Since we are giving the template function the entire collection of
  // repository objects, adding new fields to our template is as easy as
  // creating the markup
  const src = document.getElementById("repository-template").innerHTML
  const template = Handlebars.compile(src)
  const repoList = template(repos)
  document.getElementById("repositories").innerHTML = repoList
}
