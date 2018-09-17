document.addEventListener('DOMContentLoaded', function(event) {
  Handlebars.registerPartial(
    'authorPartial',
    document.getElementById('author-partial-template').innerHTML
  );
});

function getRepositories() {
  const req = new XMLHttpRequest();
  req.addEventListener('load', showRepositories);
  req.open('GET', 'https://api.github.com/users/jenna424/repos');
  req.send();
}

function showRepositories(event, data) {
  const repos = JSON.parse(this.responseText);
  const src = document.getElementById('repository-template').innerHTML;
  const template = Handlebars.compile(src);
  const repoList = template(repos);
  document.getElementById('repositories').innerHTML = repoList;
}
// Inside showRepositories callback function, this refers to the req object
// that fired the load event in getRepositories() to indicate that the
// request to retrieve a GitHub user's list of public repos is complete
// this.responseText lets us access the full body of the JSON response from our XHR request req
// and we pass this JSON response to JSON.parse() to tell the JS engine
// that we're dealing w/ JSON (so it doesn't interpret it as normal string text, which
// would result in a bunch of 'undefined's in the browser)
// repos stores an array of repo objects (repos is our JSON response)
// document.getElementById('repository-template') is <script id="repository-template type="text/x-handlebars-template"...></script>
// inside this <script> is our Handlebars template for listing a user's repositories on GitHub
// src stores the string HTML from '<ul> to </ul>' that is found inside <script id="repository-template"...>
// We pass this string HTML (stored in src) to Handlebars.compile()
// which compiles the HTML markup and {{}} delimiters as part of a function called template
// that we can call with a context (argument)
// We call the template function, passing in our context
// (the JSON response which is our repos array of repo objects)
// repoList stores the string HTML from '<ul> through </ul>' with values inserted from
// the repos array of repo objects (the data retrieved from GitHub API using XHR)
// document.getElementById('repositories') is the <div id="repositories"></div>
// which will contain the list of repositories for a given GitHub user.
// Therefore, we put the string HTML '<ul> through </ul>' w/ values inserted
// from context (repos array of repo objects) inside <div id="repositories"></div>
