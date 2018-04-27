function getRepositories() {
  const req = new XMLHttpRequest()
  req.addEventListener("load", showRepositories);
  req.open("GET", 'https://api.github.com/users/octocat/repos')
  req.send()
}

function showRepositories(event, data) {
  // JSON.parse gives us the repositories as objects from the previous string returned from XMLHttpRequest
  const repos = JSON.parse(this.responseText);
  // returns the DOM element object with matching id "repository-template"
  const src = document.getElementById("repository-template").innerHTML;
  // compiles src using Handlebars templating
  const template = Handlebars.compile(src);
  // * is template(repos) still using Handlebars.compile?
  const repoList = template(repos);

  document.getElementById("repositories").innerHTML = repoList;
}

document.addEventListener("DOMContentLoaded", function(event) {
  Handlebars.registerPartial("authorPartial", document.getElementById("author-partial-template").innerHTML)
});
