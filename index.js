//XHR
function getRepositories() {
  //initializing a new XHR
  const req = new XMLHttpRequest();
  //Adding an event to the XHR, and listen for it. When it hits, run the CB. This fn is to handle the response.
  req.addEventListener('load', showRepositories);//added to req so in the CB function 'this' can be referred to as the XHR
  //making a GET request to the URI for the list user repos
  req.open('GET', 'https://api.github.com/users/octocat/repos');
  req.send();
}

function showRepositories(event, data) {
  const repos = JSON.parse(this.responseText);
  const src = document.getElementById('repository-template').innerHTML;
  const template = Handlebars.compile(src);
  const repoList = template(repos);

  document.getElementById('repositories').innerHTML = repoList;
}

//Tells Handlebars to make a partial called authorPartial out of the contents of our partial template.
document.addEventListener('DOMContentLoaded', function(event) {
  Handlebars.registerPartial(
    'authorsPartial',
    document.getElementById('author-partial-template').innerHTML
  );
});
