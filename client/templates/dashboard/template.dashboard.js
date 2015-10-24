(function(){
Template.__checkName("dashboard");
Template["dashboard"] = new Template("Template.dashboard", (function() {
  var view = this;
  return [ HTML.Raw('<h1>Dashboard</h1>\n  <button id="startRecording">Start Recording</button>\n\n  '), Blaze.If(function() {
    return Spacebars.call(view.lookup("isRecording"));
  }, function() {
    return [ "\n    ", HTML.DIV({
      id: "nowRecordingMessage"
    }, "\n      ", HTML.P("Now recording..."), "\n    "), "\n  " ];
  }) ];
}));

})();
