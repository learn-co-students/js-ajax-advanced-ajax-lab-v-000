function getRepositories() {
  //initialize request with XMLHttpRequest()
  const req = new XMLHttpRequest();
  //we are also defining a callbacl function: showRepositories to handle the response
  req.addEventListener('load', showRepositories);
  //make a GET request to the URI for the list user repositories API
  req.open('GET', 'https://api.github.com/users/octocat/repos');
  req.send();
}

//output the repositories to the page
function showRepositories(event, data) {
  const repos = JSON.parse(this.responseText);
  const src = document.getElementById('repository-template').innerHTML;
  const template = Handlebars.compile(src);
  const repoList = template(repos);
  document.getElementById('repositories').innerHTML = repoList;
}

document.addEventListener('DOMContentLoaded', function(event) {
  Handlebars.registerPartial(
    'authorPartial',
    document.getElementById('author-partial-template').innerHTML
  );
});