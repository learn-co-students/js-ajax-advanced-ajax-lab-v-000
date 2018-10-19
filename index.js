//register the partial with Handlebars
document.addEventListener('DOMContentLoaded', function(event) {
  Handlebars.registerPartial(
    'authorPartial',
    document.getElementById('author-partial-template').innerHTML
  );
});


//initializing a new XMLHttpRequest()
//and making a GET request to the URI for the list user repositories API

function getRepositories() {
  const req = new XMLHttpRequest();
  req.addEventListener('load', showRepositories);
  req.open('GET', 'https://api.github.com/users/octocat/repos');
  req.send();
}

//defining a callback function, showRepositories, to handle the response

//JSON.parse to parse the response string into proper objects
function showRepositories(event, data) {
  const repos = JSON.parse(this.responseText);
  const repoList = `<ul>${repos
    .map(r => '<li><a href="' + r.html_url + '">' + r.name + '</a></li>')
    .join('')}</ul>`;
  document.getElementById('repositories').innerHTML = repoList;
}

function showRepositories(event, data) {
  const repos = JSON.parse(this.responseText);
  const src = document.getElementById('repository-template').innerHTML;
  const template = Handlebars.compile(src);
  const repoList = template(repos);
  document.getElementById('repositories').innerHTML = repoList;
}
