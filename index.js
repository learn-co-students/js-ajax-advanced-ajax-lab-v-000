const masterURI = 'https://api.github.com'

function getRepositories() {
  const req = new XMLHttpRequest()
  const uri = masterURI + '/users/' + 'octocat' + '/repos'
  req.addEventListener("load", showRepositories);
  req.open("GET", uri)
  req.send()
}

function showRepositories(event, data) {
  const repos = JSON.parse(this.responseText)
  const src = document.getElementById("repository-template").innerHTML
  const template = Handlebars.compile(src)
  const repoList = template(repos)
  document.getElementById("repositories").innerHTML = repoList
}

document.addEventListener("DOMContentLoaded", function(event) {
  Handlebars.registerPartial("authorPartial", document.getElementById("author-partial-template").innerHTML)
});
