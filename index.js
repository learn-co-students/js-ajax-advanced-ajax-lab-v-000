document.addEventListener('DOMContentLoaded', function(event) {
    Handlebars.registerPartial(
        'authorPartial', document.getElementById('author-partial-template').innerHTML
    );
});

const rootURL = 'https://api.github.com';

function getRepositories() {
    const req = new XMLHttpRequest(); 
    const uri = rootURL + '/users/octocat/repos'
    req.addEventListener('load', displayRepositories);
    req.open('GET', uri);
    req.send();
}

function displayRepositories(event, data) {
    const repos = JSON.parse(this.responseText);
    const src = document.getElementById('repository-template').innerHTML;
    const template = Handlebars.compile(src);
    const repoList = template(repos);     
    document.getElementById('repositories').innerHTML = repoList;
}