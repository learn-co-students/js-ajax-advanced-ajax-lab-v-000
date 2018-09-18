function getRepositories() {
  const req = new XMLHttpRequest()
  req.addEventListener('load',showRepositories)
  req.open('GET','https://api.github.com/users/octocat/repos')
  req.send()
}

function showRepositories(event, data) {
  const repos = JSON.parse(this.responseText)
  console.log(repos)
  const src = document.getElementById('repository-template').innerHTML
  const template = Handlebars.compile(src)
  const repolist = template(repos)
  document.getElementById('repositories').innerHTML = repolist
}

document.addEventListener('DOMContentLoaded', function(event) {
  Handlebars.registerPartial(
    'authorPartial',
    document.getElementById('author-partial-template').innerHTML
  )
})
