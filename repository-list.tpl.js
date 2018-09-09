(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['repository-list'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression, alias5=container.lambda;

  return "    <li>\r\n        <h2><a target=\"blank\" href=\""
    + alias4(((helper = (helper = helpers.html_url || (depth0 != null ? depth0.html_url : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"html_url","hash":{},"data":data}) : helper)))
    + "\">"
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "</a></h2>\r\n        <section>\r\n        <header><h4>Created By "
    + alias4(alias5(((stack1 = (depth0 != null ? depth0.owner : depth0)) != null ? stack1.login : stack1), depth0))
    + "</h4></header>\r\n        <img src=\""
    + alias4(alias5(((stack1 = (depth0 != null ? depth0.owner : depth0)) != null ? stack1.avatar_url : stack1), depth0))
    + "\" height=\"32\" width=\"32\">\r\n        </section>\r\n        <p>Watchers: "
    + alias4(((helper = (helper = helpers.watchers_count || (depth0 != null ? depth0.watchers_count : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"watchers_count","hash":{},"data":data}) : helper)))
    + "</p>\r\n        <p>Forks: "
    + alias4(((helper = (helper = helpers.forks_count || (depth0 != null ? depth0.forks_count : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"forks_count","hash":{},"data":data}) : helper)))
    + "</p>\r\n        <p>Issues: "
    + alias4(((helper = (helper = helpers.open_issues_count || (depth0 != null ? depth0.open_issues_count : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"open_issues_count","hash":{},"data":data}) : helper)))
    + "</p>\r\n    </li>\r\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<ul>\r\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),depth0,{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</ul>";
},"useData":true});
})();