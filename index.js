document.addEventListener("DOMContentLoaded",
  function(event) {
    Handlebars.registerPartial("authorPartial", document.getElementById("author-partial-template").innerHTML)
  });

function getRepositories() {
  const req = new XMLHttpRequest()
  req.addEventListener("load", showRepositories);
  req.open("GET", 'https://api.github.com/users/octocat/repos');
  req.send();
}

function showRepositories(event, data) {
  // parse our JSON response
  const repos = JSON.parse(this.responseText);
  //get the inner HTML of our template script tag
  const src = document.getElementById("repository-template").innerHTML;
  // compile src into a template function
  const template = Handlebars.compile(src);
  // pass our JSON response into our template
  const repoList = template(repos)
  // inserting template into our HTML markup
  document.getElementById("repositories").innerHTML = repoList;
}
