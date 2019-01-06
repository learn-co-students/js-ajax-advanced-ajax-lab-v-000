function getRepositories() {
    // save a var as a new XML request
    const req = new XMLHttpRequest();
    // attach listener for the .html onclick function to retrieve data
    req.addEventListener('load', showRepositories);
    req.open('GET', 'https://api.github.com/users/octocat/repos');
    req.send();
}

// callback function for getRepositories()
function showRepositories(event, data) {
    const repos = JSON.parse(this.responseText);
    // creating nodes for the objects in repos using templates
    const src = document.getElementById('repository-template').innerHTML;
    const template = Handlebars.compile(src);
    const repoList = template(repos);

    document.getElementById('repositories').innerHTML = repoList;
    document.addEventListener('DOMContentLoaded', function(event) {
        Handlebars.registerPartial(
            'authorPartial',
            document.getElementById('author-partial-template').innerHTML
        );
    });
}

