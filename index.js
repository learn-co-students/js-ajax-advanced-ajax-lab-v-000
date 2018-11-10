document.addEventListener('DOMContentLoaded', function(event) {
  Handlebars.registerPartial(
    'authorPartial',
    document.getElementById('author-partial-template').innerHTML
  );
});

function getRepositories(){
  const req = new XMLHttpRequest();
  //showRepositories is our callback function
  req.addEventListener('load', showRepositories);
  req.open('GET', 'https://api.github.com/users/octocat/repos');
  req.send();
}

function showRepositories(event, data){
  //JSON.parse is parsing the response string into proper objects
  const repos = JSON.parse(this.responseText);
  //Getting the innerhTML of our template script tag
  const src = document.getElementById('repository-template').innerHTML;
  //compile this into a template function
  const template = Handlebars.compile(src);
  const repoList = template(repos);
  document.getElementById('repositories').innerHTML = repoList;
}
