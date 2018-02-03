
// registering the partial with Handlebars

document.addEventListener("DOMContentLoaded", function(event) {
  Handlebars.registerPartial("authorPartial", document.getElementById("author-partial-template").innerHTML)
});

function getRepositories() {
  // make a new request, assign it to a variable
  const req = new XMLHttpRequest()
  // defining a callback function to handle the request
  req.addEventListener("load", showRepositories);
  // make a request (in this case, GET) along with the URL
  req.open("GET", 'https://api.github.com/users/octocat/repos')
  req.send()
}

function showRepositories(event, data) {
  // need to parse the string into objects
  const repos = JSON.parse(this.responseText)
  // telling the function to use the template in our HTML
  const src = document.getElementById("repository-template").innerHTML
  const template = Handlebars.compile(src)
  const repoList = template(repos)
  document.getElementById("repositories").innerHTML = repoList
}
