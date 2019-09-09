function getRepositories() {
  const req = new XMLHttpRequest()
  req.addEventListener('load', showRepositories)
  req.open("GET", 'https://api.github.com/users/yehudamakarov/repos')
  req.send()
}

function showRepositories() {
  const arrOfRepos = JSON.parse(this.responseText)
  const template = document.getElementById('repository-template').innerHTML
  const templateFn = Handlebars.compile(template)
  document.getElementById('repositories').innerHTML = templateFn(arrOfRepos)
}

document.addEventListener("DOMContentLoaded", () => {
  Handlebars.registerPartial("authorPartial", document.getElementById('author-partial-template').innerHTML)
})
