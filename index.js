function getRepositories() {
  //initialize request with XMLHttpRequest()
  const req = new XMLHttpRequest();
  //we are also defining a callback function: showRepositories to handle the response
  req.addEventListener('load', showRepositories);
  //make a GET request to the URI for the list user repositories API
  req.open('GET', 'https://api.github.com/users/octocat/repos');
  req.send();
}

//output the repositories to the page with handlebars
function showRepositories(event, data) {
  //parse response string into objects
  const repos = JSON.parse(this.responseText);
  //get innerHTML of the template script tag to compile it into a template function that we pass our JSON response into
  const src = document.getElementById('repository-template').innerHTML;
  const template = Handlebars.compile(src);
  const repoList = template(repos);
  document.getElementById('repositories').innerHTML = repoList;
}

//to make this work, we need to register the partial with Handlebars when the page loads
document.addEventListener('DOMContentLoaded', function(event) {
//This will tell Handlebars to make a partial called authorPartial out of the contents of our partial template
  Handlebars.registerPartial(
    'authorPartial',
    document.getElementById('author-partial-template').innerHTML
  );
});