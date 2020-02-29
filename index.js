document.addEventListener("DOMContentLoaded", function (e) {
  Handlebars.registerPartial("authorPartial", document.getElementById("author-partial-template").innerHTML)
});

function showRepositories (e, data) {
  const repos = JSON.parse(this.responseText);
  const templateSrcCode = document.getElementById("repository-template").innerHTML;
  const templateFn = Handlebars.compile(templateSrcCode);
  const repoList = templateFn(repos);
  document.getElementById("repositories").innerHTML = repoList;
}

function getRepositories () {
  const req = new XMLHttpRequest();
  req.addEventListener("load", showRepositories);
  req.open("GET", "https://api.github.com/users/octocat/repos");
  req.send();
}
