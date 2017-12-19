// This will tell Handlebars to make a partial called authorPartial out of the contents of our partial template.
document.addEventListener("DOMContentLoaded", function(event){
  Handlebars.registerPartial("authorPartial", document.getElementById('author-partial-template').innerHTML)
});

function getRepositories() {
  const req = new XMLHttpRequest()
  req.addEventListener("load", showRepositories);
  req.open("GET", 'https://api.github.com/users/octocat/repos')
  req.send()
}

// We get the innerHTML of our template script tag to compile into a template function that we pass our JSON response into.
function showRepositories(event, data) {
  const repos = JSON.parse(this.responseTEXT)
  const src = document.getElementById('repository-template'.innerHTML)
  const template = Handlebars.compile(src)
  const repoList = template(repos)
  document.getElementById('repositories').innerHTML = repoList
}
