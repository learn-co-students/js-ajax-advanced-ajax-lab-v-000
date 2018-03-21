document.addEventListener("DOMContentLoaded", function(event) {
  Handlebars.registerPartial("authorPartial", document.getElementById("author-partial-template").innerHTML)
});  //This will tell Handlebars to make a partial called authorPartial out of the contents of our partial template.

function getRepositories(){
	const req = new XMLHttpRequest()  //initializing a new XMLHttpRequest()
	req.addEventListener('load', showRepositories) //defining a callback function, showRepositories, to handle the response,
	req.open("get", 'https://api.github.com/users/octocat/repos') //making a GET request to the URI for the list user repositories API.
	req.send()
}

function showRepositories(event, data) {
  const repos = JSON.parse(this.responseText)
  const src = document.getElementById("repository-template").innerHTML // grabs the template in index.html
  const template = Handlebars.compile(src)  //this "compiles" the Handlebars template we grabbed in the last line
  const repoList = template(repos)  //this renders the template with our repos data
  document.getElementById("repositories").innerHTML = repoList
}
