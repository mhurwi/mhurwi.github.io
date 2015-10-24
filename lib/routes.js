(function(){/////////////////////////////////////////////////
// Config
/////////////////////////////////////////////////
Router.configure({
  layoutTemplate: 'MasterLayout',
  loadingTemplate: 'Loading',
  notFoundTemplate: 'NotFound',
  load: function() {
    $('#main').hide().fadeIn(800);
    this.next();
  }
});

Router.plugin('ensureSignedIn', {
  except: [
    'atSignIn',
    'atSignUp'
  ]
});
/////////////////////////////////////////////////
// Dashboard
/////////////////////////////////////////////////
Router.route('/', {
  name: 'dashboard',
  controller: 'DashboardController',
  action: 'action',
  where: 'client'
})

})();
