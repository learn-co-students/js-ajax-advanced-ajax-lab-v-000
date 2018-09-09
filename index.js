function getRepositories(){
    const req = new XMLHttpRequest();

    req.addEventListener("load", displayRepositories);

    req.open(
        'GET',
        'https://api.github.com/users/octocat/repos'
    );

    req.send();
}

// AJAX CALLBACKS
function displayRepositories(event, data){
    const reposJSON = JSON.parse(this.responseText);

    console.log(reposJSON);

    /*
    non-template way
    const repoList = 
        '<ul>' +
            reposJSON.map(r => `<li><a target="blank" href="${r.html_url}">${r.name}</a></li>`).join('') +
        '</ul>';
    */

    /*
    // template way
    const src = document.getElementById('repository-template').innerHTML;
    const template = Handlebars.compile(src);
    const repoList = template(reposJSON);
    */

    // precompiled template way
    const template = Handlebars.templates['repository-list'];
    const repoList = template(reposJSON);


    // whichever way, now we stick the HTML into the slot we planned
    document.getElementById('details').innerHTML = repoList;
}