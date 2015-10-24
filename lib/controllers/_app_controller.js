(function(){// Note: the filename for this file
// begins with an underscore, so that it comes
// first alphabetically, and thus it loads first.

AppController = RouteController.extend({
  layoutTemplate: "MasterLayout",
  subscriptions: function () {
    this.subscribe('notifications');
  }
});

AppController.events({
  'click [data-action=logout]' : function() {
    Meteor.logout(function(){
      // Router.go('/sign-in');
    });
  }
});

})();
