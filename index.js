document.addEventListener("DOMContentLoaded", function(event) {  
  Handlebars.registerPartial("authorPartial", document.getElementById("author-partial-template").innerHTML)
});

function getRepositories() {
  const request = new XMLHttpRequest()
  request.addEventListener("load", showRepositories)
  request.open("GET", 'https://api.github.com/users/octocat/repos')
  request.send()
}

function showRepositories(event, data) {
    const repos = JSON.parse(this.responseText)
  // const repoList = `<ul>${repos.map(r => '<li><a href="' + r.html_url + '">' + r.name + '</a></li>').join('')}</ul>`
  // document.getElementById("repositories").innerHTML = repoList
  //replace with more, gets really ugly and too much HTML in js code 
  // 2d refactor 
  // const repoList = '<ul>' + repos.map(r => {
  //  return (`
  //         <li>
  //           <h2><a href="${r.html_url}">${r.name}</a></h2>
  //           <p>Watchers: ${r.watchers_count}</p>
  //           <p>Forks: ${r.forks_count}</p>
  //           <p>Issues: ${r.open_issues_count}</p>
  //         </li>`
  //         )
  // }).join('') + "</ul>"
  //now to refactgor with handlebars
    // const source = document.getElementById("repository-template").innerHTML
    // const template = Handlebars.compile(source)
    // const repoList = template(repos)
    // document.getElementById("repositories").innerHTML = repoList

     const src = document.getElementById("repository-template").innerHTML
    const template = Handlebars.compile(src)
    const repoList = template(repos)
    document.getElementById("repositories").innerHTML = repoList
}
//too much concatenation => use handlebars 
// 

