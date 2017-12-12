function getRepositories() {
  const req = new XMLHttpRequest()
  req.addEventListener("load", showRepositories);
  req.open("GET", 'https://api.github.com/users/octocat/repos')
  req.send()
}
function showRepositories(event, data) {
  const repos = JSON.parse(this.responseText)
  const repoList = `<ul>${repos.map(r => '<li><a href="' + r.html_url + '">' + r.name + '</a></li>').join('')}</ul>`
  document.getElementById("repositories").innerHTML = repoList
}
