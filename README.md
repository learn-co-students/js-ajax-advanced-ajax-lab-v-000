Turning API Responses into Views with Handlebars
---

## Objectives

1. Explain how to update the DOM based on new data
2. Review writing and using Handlebars templates
3. Use Handlebars to update the DOM

## Introduction

When we use XHR to make dynamic web applications, we often need to
manipulate the DOM in repeatable, reusable chunks, keeping the same
structure but filling it in with new data.

Think about a bookstore. That's a place where you can go to buy books.
Like, physically. Like a grocery store but there's a coffee shop inside
and books instead of food. Picturing it?

![louie](http://i.giphy.com/h01OpEeFWverS.gif)

Okay. So the basic unit of display in a bookstore is a bay of shelves.
Each bay has a number of shelves that fit a number of books. A certain
number of books are shelved "facing," that is, turned so that we can
see the cover, and the rest are shelved the standard way with the spine
out.

So the bay is the basic presentation unit of books, and it defines how
we see the books. Every bay is the same, it's just the
books that change. So the bay is the structure and the books are the
data.

Similarly, our web pages are built up of chunks of markup (structure),
with values (data). And when we get new data via an XHR request, we
generally are outputting that new data within an already defined
structure.

![jon stewart](http://i.giphy.com/qzIYGsxePPyP6.gif)

Yeah. Let's look at it in action.

## Adding Data from XHR Responses to the DOM

We're going to be using some public functions of the [Github
repositories API](https://developer.github.com/v3/repos/) to illustrate.

Let's create a simple request to list our own public repositories.
First, we need a way to trigger the request and display the data. Let's
add this to our `index.html`.

```html
<body>
  <main id="main">
    <a href="#" onclick="getRepositories()">Get Repositories</a>
    <div id="repositories"></div>
  </main>
  <script src="handlebars.js"></script>
  <script src="index.js"></script>
</body>
```

In our link, we're firing a `getRepositories` function when a user clicks the
"Get Repositories" anchor tag, so let's implement that in `index.js`.

```js
function getRepositories() {
  const req = new XMLHttpRequest()
  req.addEventListener("load", showRepositories);
  req.open("GET", 'https://api.github.com/users/octocat/repos')
  req.send()
}
```

Here we're initializing a new `XMLHttpRequest()` and making a `GET`
request to the URI for the list user repositories API.

We're also defining a callback function, `showRepositories`, to handle
the response, so let's jump in to that and output our repositories to
the page.

```js
function showRepositories(event, data) {
  const repos = JSON.parse(this.responseText)
  const repoList = `<ul>${repos.map(r => '<li>' + r.name + '</li>').join('')}</ul>`
  document.getElementById("repositories").innerHTML = repoList
}
```

We've used `JSON.parse` to parse the response string into proper
objects, and we're simply building an unordered list by using `map` to
create `<li></li>` nodes for each object in `repos`.

This is easy enough, we can get it done in one line, and if we load up
`index.html` in our browser, everything should work.

But let's look again at the [response](https://developer.github.com/v3/repos/#response) for our repository list. Each object has so much information available! Surely we want to display more than just the name.

Let's add the HTML URL as a link.

```js
function showRepositories(event, data) {
  const repos = JSON.parse(this.responseText)
  const repoList = `<ul>${repos.map(r => '<li><a href="' + r.html_url + '">' + r.name + '</a></li>').join('')}</ul>`
  document.getElementById("repositories").innerHTML = repoList
}
```

Still manageable, but getting kind of ugly with all that concatenation
in there. If we want to add anything else, surely we'll need to break it
up into more lines.

Let's add the watcher, fork, and issues counts.

```js
function showRepositories(event, data) {
  const repos = JSON.parse(this.responseText)
  const repoList = '<ul>' + repos.map(r => {
   return (`
          <li>
            <h2><a href="${r.html_url}">${r.name}</a></h2>
            <p>Watchers: ${r.watchers_count}</p>
            <p>Forks: ${r.forks_count}</p>
            <p>Issues: ${r.open_issues_count}</p>
          </li>`
          )
  }).join('') + "</ul>"
  document.getElementById("repositories").innerHTML = repoList
}
```

Now it's getting a little uglier. And that's with the benefit of
interpolation. If we were concatenating all of these strings, even
worse!

We don't want all this HTMl code in our JavaScript functions. First, it
just doesn't belong there. Putting a presentation concern inside a
function whose purpose is to parse data is a violation of [SoC](https://en.wikipedia.org/wiki/Separation_of_concerns) and just bad code organization.

But more practically, it's just going to get harder and harder to edit
and keep track of this HTML as long as we have to wrap it in this
JavaScript function. We'll inevitably need to change it, add styling,
add more fields, and every time we'll be running the risk of misplacing
that little backtick or introducing some other bug.

It's as if every box of books also came with the wood and shelves to
build a new bay, and we had to construct it by hand every single time.

We need a way to have a pre-fabricated bay of shelves ready to go and
receive a new stack of books. We need a *template*.

## Handlebars Templatess

[Handlebars](http://handlebarsjs.com/) is a template engine **that** gives us a way to build HTML templates separately from
our code and allow us to use those templates to dynamically update the DOM.

Creating a Handlebars template is simple. We just create the HTML that
we want within a `script` tag, and use the `{{}}` delimiters to hold
places for data. Let's convert our repository template to Handlebars
inside `index.html`.

```html
<script id="repository-template" type="text/x-handlebars-template">
  <ul>
   {{#each this}}
     <li>
       <h2><a href="{{html_url}}">{{name}}</a></h2>
       <p>Watchers: {{watchers_count}}</p>
       <p>Forks: {{forks_count}}</p>
       <p>Issues: {{open_issues_count}}</p>
     </li>
    {{/each}}
  </ul>
</script>
```

Keep in mind that the variable names between the double-curly-brace
delimiters should match the names of the properties of the context
object, in this case, our JSON response.

Note that rather than build each list item separately in a loop, we're
making use of the `{{#each}}` helper to build our list for us based on
the array of objects we pass in.

Now let's update our `showRepositories` code to use the template.

```js
function showRepositories(event, data) {
  const repos = JSON.parse(this.responseText)
  const src = document.getElementById("repository-template").innerHTML
  const template = Handlebars.compile(src)
  const repoList = template(repos)
  document.getElementById("repositories").innerHTML = repoList
}
```

We get the `innerHTML` of our template `script` tag to compile into a
`template` function that we pass our JSON response into.

Since we are giving the template function the entire collection of
repository objects, adding new fields to our template is as easy as
creating the markup.

Let's add the owner information to our template.

```html
<script id="repository-template" type="text/x-handlebars-template">
  <ul>
   {{#each this}}
     <li>
       <h2><a href="{{html_url}}">{{name}}</a></h2>
       <section>
          <header><h4>Created By {{owner.login}}</h4></header>
          <img src="{{owner.avatar_url}}" height="32" width="32">
       </section>
       <p>Watchers: {{watchers_count}}</p>
       <p>Forks: {{forks_count}}</p>
       <p>Issues: {{open_issues_count}}</p>
     </li>
    {{/each}}
  </ul>
</script>
```

If we reload our page, everything works! Handlebars allows us to access
the entire object graph, so `{{owner.login}}` works just fine to access
the `login` property of the `owner` property of the repository and we
didn't have to make any JavaScript edits.

And that's the power of using a template engine like Handlebars. The
presentation, or HTML code, can be managed separately from the logic and
data.

Before we end, let's take this one step further. This author section
looks like something we might be able to reuse, say for a list of
commits. Let's extract it into a Handlebars partial.

First, we have to make some edits to our template, and create a new
template for our partial.

```html
<script id="repository-template" type="text/x-handlebars-template">
  <ul>
   {{#each this}}
     <li>
       <h2><a href="{{html_url}}">{{name}}</a></h2>
       {{> authorPartial owner }}
       <p>Watchers: {{watchers_count}}</p>
       <p>Forks: {{forks_count}}</p>
       <p>Issues: {{open_issues_count}}</p>
     </li>
    {{/each}}
  </ul>
</script>
<script id="author-partial-template" type="text/x-handlebars-template">
  <section>
    <header><h4>Created By {{login}}</h4></header>
    <img src="{{avatar_url}}" height="32" width="32">
  </section>
</script>
```

We created a new `script` tag for our partial template, and we're
rendering it within our repository template via the `{{> authorPartial
owner}}` line. We're passing `owner` to the template, which is really
`this.owner`, or the `owner` property of the current repository object
since we are inside the `{{#each}}` block.

To get this to work, we just need to register the partial with
Handlebars when the page loads, so let's add the following to our
`index.js`.

```js
document.addEventListener("DOMContentLoaded", function(event) {
  Handlebars.registerPartial("authorPartial", document.getElementById("author-partial-template").innerHTML)
});
```

This will tell Handlebars to make a partial called `authorPartial` out
of the contents of our partial template.

Now if we reload everything and get those repositories, everything
should still work, and we have nice, modular code to keep future changes
as hassle-free as possible!

## Summary

In this lesson we reviewed getting data via XHR, and using that data to
manipulate the DOM. Then we saw how powerful it is to pair Handlebars
templates with XHR to create dynamic web applications, and how we can use these tools to adhere to
separation of concerns and write modular, well-organized code.

## Resources

- [Handlebars](http://handlebarsjs.com/)
- [MDN: AJAX](https://developer.mozilla.org/en-US/docs/AJAX)

<p class='util--hide'>View <a href='https://learn.co/lessons/javascript-turning-api-responses-into-views-with-handlebars'>Turning API Responses Into Views </a> on Learn.co and start learning to code for free.</p>
