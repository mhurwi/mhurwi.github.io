(function(){
Template.__checkName("MasterLayout");
Template["MasterLayout"] = new Template("Template.MasterLayout", (function() {
  var view = this;
  return HTML.BODY("\n\n    ", Blaze.If(function() {
    return Spacebars.call(view.lookup("currentUser"));
  }, function() {
    return [ "\n      ", HTML.A({
      href: "#",
      id: "logoutLink",
      "data-action": "logout"
    }, "logout"), "\n    " ];
  }), "\n\n    ", Spacebars.include(view.lookupTemplate("yield")), "\n\n    ", Spacebars.include(view.lookupTemplate("debug")), "\n  ");
}));

Template.__checkName("debug");
Template["debug"] = new Template("Template.debug", (function() {
  var view = this;
  return HTML.DIV({
    id: "debugging"
  }, HTML.Raw('\n    <p class="text-muted">debug</p>\n    '), Blaze.If(function() {
    return Spacebars.call(view.lookup("currentUser"));
  }, function() {
    return [ "\n      ", HTML.P({
      "class": "text-muted"
    }, Blaze.View("lookup:currentUser", function() {
      return Spacebars.mustache(view.lookup("currentUser"));
    })), "\n    " ];
  }, function() {
    return [ "\n      ", HTML.P({
      "class": "text-muted"
    }, "not logged in"), "\n    " ];
  }), "\n  ");
}));

})();
