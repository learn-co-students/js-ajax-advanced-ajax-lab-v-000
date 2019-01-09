function getRepositories(){
  //Here we're initializing a new XMLHttpRequest() and making a GET request to the URI for the list user repositories API.
  const req = new XMLHttpRequest();
  //We're also defining a callback function, showRepositories, to handle the response, so let's jump in to that and output our repositories to the page.
  req.addEventListener('load', showRepositories);
  req.open('GET', 'https://api.github.com/users/octocat/repos');
  req.send();
}

//using handlebars templates
function showRepositories(event, data) {
  const repos = JSON.parse(this.responseText);
  const src = document.getElementById('repository-template').innerHTML;
  const template = Handlebars.compile(src);
  const repoList = template(repos);
  document.getElementById('repositories').innerHTML = repoList;
}

//To get this to work, we just need to register the partial with Handlebars when the page loads, so let's add the following to our index.js.
document.addEventListener('DOMContentLoaded', function(event) {
  Handlebars.registerPartial('authorPartial', document.getElementById('author-partial-template').innerHTML)
});
      //manual setup
//function showRepositories(){
//  //allows our output from getRepositories to load on the page
//  //We've used JSON.parse to parse the response string into proper objects, and we're simply building an unordered list by using map to create <li></li> nodes for each object in repos.
//
//    const repos = JSON.parse(this.responseText);
//    const repoList =
//                    '<ul>' +
//                    repos
//                          .map(r => {
//                            return `
//                              <li>
//                                <h2><a href="${r.html_url}">${r.name}</a></h2>
//                                <p>Watchers: ${r.watchers_count}</p>
//                                <p>Forks: ${r.forks_count}</p>
//                                <p>Issues: ${r.open_issues_count}</p>
//                              </li>`;
//                          }).join('') +
//                    '</ul>';
//      document.getElementById('repositories').innerHTML = repoList;
//    }
