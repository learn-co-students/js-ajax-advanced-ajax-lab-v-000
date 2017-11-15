function getRepositories() {
	const req = new XMLHttpRequest();
	req.addEventListener("load", showRepositories);
	req.open("GET", 'js-ajax-advanced-ajax-lab-v-000');
	req.send();
}

function showRepositories(event, data) {
	const repos = JSON.parse(this.responseText);
	const src = document.getElementById("repository-template").innerHTML;
	const template = Handlebars.compile("src");
	const repoList = template(repos);
	document.getElementById("repositories").innerHTML = repoList;
}

document.addEventListener("DOMContentLoaded", function(event) {
	Handlebars.registerPartial("authorPartial", document.getElementById("author-partial-template").innerHTML);
});