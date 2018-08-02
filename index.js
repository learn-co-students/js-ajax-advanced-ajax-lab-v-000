// Initialize new xml request and make a GET request to the GH URI
function getRepositories(){
  const req = new XMLHttpRequest()
  req.addEventListener("load", showRepositories);
  req.open("GET", 'https://api.github.com/users/octocat/repos')
  req.send()
}

//define a callback function showRepsoitories to handle that response

// function showRepositories(event, data){
//   const repos = JSON.parse(this.responseText)
//   const repoList = `<ul>${repos.map(r => 
//     '<li>' + r.name + '</li>').join('')}<ul>`
//     document.getElementById("repositories").innerHTML = repoList
// }

function showRepositories(event, data){
  const repos = JSON.parse(this.responseText)
  const src = document.getElementById("repository-template").innerHTML
  const template = Handlebars.compile(src)
  const repoList = template(repos)

  document.getElementById("repositories").innerHTML = repoList
}


// once adding the author partial to the index.html file we need to register the partial with handlebars

document.addEventListener("DOMContentLoaded", 
function(event){
  Handlebars.registerPartial("authorPartial",
document.getElementById("author-partial-template").innerHTML)
})