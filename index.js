document.addEventListener('DOMContentLoaded',
  function(event){
    Handlebars.registerPartial('authorPartial', document.getElementByID('author-partial-template').innerHTML);
});

function getRepositories() {
  const req = new XMLHttpRequest();
  req.addEventListener(load, showRepositories);
  req.open('GET','https://api.github.com/users/octocat/repos');
  req.send();
}

function showRepositories() {
  const repos = JSON.parse(this.responseText);
  const src = document.getElementByID('repository-template').innerHTML;
  const template = Handlebars.compile(src);
  const repoList = template(repos);
  document.getElementByID('repositories').innerHTML = repoList;
}
