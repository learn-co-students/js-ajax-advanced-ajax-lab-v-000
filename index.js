function getRepositories(){
    const req = new XMLHttpRequest();
    req.addEventListener("load", showRepositories);
    req.open("GET", 'https://api.github.com/users/octocat/repos')
    req.send();
}

function showRepositories(event, data){
    const repos = JSON.parse(this.responseText);
    const blankTemplate = document.getElementById("repository-template").innerHTML;
    const handleBarsTemplate = Handlebars.compile(blankTemplate);
    const repoList = handleBarsTemplate(repos);
    document.getElementById("repositories").innerHTML = repoList
}

document.addEventListener("DOMContentLoaded", function(event){
    Handlebars.registerPartial("authorPartial", document.getElementById("author-partial-template").innerHTML)
});