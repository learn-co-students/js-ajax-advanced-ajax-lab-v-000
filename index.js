function getRepositories() {
  const req = new XMLHttpRequest();
  req.addEvenListener("load", showRepositories);
  req.open("GET", "https://api.github.com/users/octocat/repos");
  req.send();
}

function showRepositories(event, data) {
  const repos = JSON.parse(this.responseText);
  const repoList = `<ul>${repos.map(r => "<li> + r.name + "</li>").join(" ")}</ul`;
}
