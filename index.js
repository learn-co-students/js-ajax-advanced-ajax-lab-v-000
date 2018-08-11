function getRepositories(){
  const req = new XMLHttpRequest()
  req.addEventListener("load", showRepositories);
  req.open("GET", "https://api.github.com/users/octocat/repos")
  req.send()
}

function showRepositories(event, data){
  const repos = JSON.parse(this.reponseText)
  console.log(repos)
   const repoList = `<ul>${repos.map(r => '<li>' + r.name + '</li>').join('')}</ul>`
   document.getElementbyId("repositories").innerHTML = repoList
}
