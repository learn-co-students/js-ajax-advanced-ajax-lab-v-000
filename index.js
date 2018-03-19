// initializing a new XMLHttpRequest() and making a GET request to the URI for the list user repositories API
//defining a callback function, showRepositories, to handle the response
function getRepositories() {
  const req = new XMLHttpRequest()
  req.addEventListener("load", showRepositories);
  req.open("GET", 'https://api.github.com/users/octocat/repos')
  req.send()
}

//used JSON.parse to parse the response string into proper objects
//building an unordered list by using map to create <li></li> nodes for each object in repos
// function showRepositories(event, data) {
//   const repos = JSON.parse(this.responseText)
//   const repoList = `<ul>${repos.map(r => '<li>' + r.name + '</li>').join('')}</ul>`
//   document.getElementById("repositories").innerHTML = repoList
// }

//Pull in more data:
// function showRepositories(event, data) {
//   const repos = JSON.parse(this.responseText)
//   const repoList = '<ul>' + repos.map(r => {
//    return (`
//           <li>
//             <h2><a href="${r.html_url}">${r.name}</a></h2>
//             <p>Watchers: ${r.watchers_count}</p>
//             <p>Forks: ${r.forks_count}</p>
//             <p>Issues: ${r.open_issues_count}</p>
//           </li>`
//           )
//   }).join('') + "</ul>"
//   document.getElementById("repositories").innerHTML = repoList
// }
//The above is poorly organized & a bad separation of concern

//Use Handlebars:

//get the innerHTML of our template script tag to compile 
//into a template function that we pass our JSON response into
function showRepositories(event, data) {
  const repos = JSON.parse(this.responseText)
  const src = document.getElementById("repository-template").innerHTML
  const template = Handlebars.compile(src)
  const repoList = template(repos)
  document.getElementById("repositories").innerHTML = repoList
}

//register partial to show authors

document.addEventListener("DOMContentLoaded", function(event) {
  Handlebars.registerPartial("authorPartial", document.getElementById("author-partial-template").innerHTML)
});