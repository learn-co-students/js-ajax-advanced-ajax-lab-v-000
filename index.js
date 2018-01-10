function getRepositories() {
  const request = new XMLHttpRequest();
  request.addEventListener("load", showRepositories);
  request.open("GET", 'https://api.github.com/users/octocat/repos');
  request.send()
}

function showRepositories() {
  const repos = JSON.parse(this.responseText);
  const src = document.getElementById("repository-template").innerHTML;
  const template = Handlebars.compile(src);
  const repoList = template(repos);
  document.getElementById("repositories").innerHTML = repoList
}

document.addEventListener("DOMContentLoaded", function(event) {
  Handlebars.registerPartial("authorPartial", document.getElementById("author-partial-template").innerHTML)
});
