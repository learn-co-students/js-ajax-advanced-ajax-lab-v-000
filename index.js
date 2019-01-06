function getRepositories() {
    const req = new XMLHttpRequest();
    req.addEventListener('load', showRepositories);
    req.open('GET', 'https://api.github.com/users/octocat/repos');
    req.send();
  }

  function showRepositories(event, data) {
    const repos = JSON.parse(this.responseText);
    const templateHTML = document.querySelector('#repository-template').innerHTML;
    const templateFn = Handlebars.compile(templateHTML);
    const reposHTML = templateFn(repos);
    document.getElementById('repositories').innerHTML = reposHTML;
  }

  document.addEventListener('DOMContentLoaded', function(event){
      Handlebars.registerPartial('authorPartial', document.getElementById('author-partial-template').innerHTML)
  })