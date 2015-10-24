(function(){Template.dashboard.events({
  'click button#startRecording': function (e, tmpl) {
    Session.set('isRecording', true);
  }
});

Template.dashboard.helpers({
  isRecording: function () {
    return Session.get('isRecording');
  }
})

Template.dashboard.created(function () {
  Session.setDefault('isRecording', false);
});

})();
