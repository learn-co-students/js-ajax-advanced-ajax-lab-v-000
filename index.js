document.addEventListener("DOMContentLoaded", function(event) {
  Handlebars.registerPartial("authorPartial", document.getElementById("author-partial-template").innerHTML)
}); 

function getRepositories(){
  const req = new XMLHttpRequest()
  req.addEventListener("load", showRepositories); 
  req.open("GET", 'https://api.github.com/users/octocat/repos')
  req.send() 
}

function showRepositories(event, data) {
  const repos = JSON.parse(this.responseText) 
  const src = document.getElementById("repository-template").innerHTML //this grabs the template we made from index.html
  const template = Handelbars.compile(src) //this "compiles" the Handlebars template we grabbed in the last line 
  const repoList = template(repos) //this renders the template with our repos data 
  document.getElementById("repositories").innerHTML = repoList 
}