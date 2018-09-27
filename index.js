function getRepositories() {
  const req = new XMLHttpRequest();
  req.addEventListener('load', showRepositories);
  req.open('GET', 'https://api.github.com/users/octocat/repos');
  req.send();
}
function showRepositories(event, data) {
  const repos = JSON.parse(this.responseText);
  const repoList =
    '<ul>' +
    repos
      .map(r => {
        return `
          <li>
            <h2><a href="${r.html_url}">${r.name}</a></h2>
            <p>Watchers: ${r.watchers_count}</p>
            <p>Forks: ${r.forks_count}</p>
            <p>Issues: ${r.open_issues_count}</p>
          </li>`;
      })
      .join('') +
    '</ul>';
  document.getElementById('repositories').innerHTML = repoList;
}
