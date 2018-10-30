function getRepositories(){
    const req = new XMLHttpRequest();
    req.addEventListener('load', showRespositories);
    req.open('GET', 'https://api.github.com/users/octocat/repos');
    req.send();
}

function showRespositories(event, data){
    const repos = JSON.parse(this.responseText);
    const src = 
        document.getElementById('repository-template').innerHTL;
        const template = Handlebars.compile(src);
        const repoList = template(repos);
        

    document.getElementById('repositories').innerHTML = repoList;
}

document.addEventListener('DOMcontentLoaded', 
    function(event){
        Handlebars.registerPartial(
            'authorPartial',
            document.getElementById('author-partial-template').innerHTLML
        );
})