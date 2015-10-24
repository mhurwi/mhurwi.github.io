//////////////////////////////////////////////////////////////////////////
//                                                                      //
// This is a generated file. You can view the original                  //
// source in your browser if your browser supports source maps.         //
//                                                                      //
// If you are using Chrome, open the Developer Tools and click the gear //
// icon in its lower right corner. In the General Settings panel, turn  //
// on 'Enable source maps'.                                             //
//                                                                      //
// If you are using Firefox 23, go to `about:config` and set the        //
// `devtools.debugger.source-maps-enabled` preference to true.          //
// (The preference should be on by default in Firefox 24; versions      //
// older than 23 do not support source maps.)                           //
//                                                                      //
//////////////////////////////////////////////////////////////////////////


(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var Tracker = Package.tracker.Tracker;
var Deps = Package.tracker.Deps;
var Mongo = Package.mongo.Mongo;
var _ = Package.underscore._;

/* Package-scope variables */
var Presences, Presence;

(function () {

///////////////////////////////////////////////////////////////////////
//                                                                   //
// packages/tmeasday:presence/lib/common.js                          //
//                                                                   //
///////////////////////////////////////////////////////////////////////
                                                                     //
Presences = new Mongo.Collection('presences');                       // 1
// For backwards compatibilty                                        // 2
Meteor.presences = Presences;                                        // 3
                                                                     // 4
Meteor.methods({                                                     // 5
  updatePresence: function(state) {                                  // 6
    check(state, Match.Any);                                         // 7
                                                                     // 8
    var connectionId = this.isSimulation                             // 9
      ? Meteor.connection._lastSessionId                             // 10
      : this.connection.id;                                          // 11
                                                                     // 12
    // Should never happen                                           // 13
    if (! connectionId)                                              // 14
      return;                                                        // 15
                                                                     // 16
    var update = {};                                                 // 17
    update.state = state;                                            // 18
    if (typeof Meteor.userId !== 'undefined' && Meteor.userId())     // 19
      update.userId = Meteor.userId();                               // 20
                                                                     // 21
    Presences.update(connectionId, update);                          // 22
  }                                                                  // 23
});                                                                  // 24
                                                                     // 25
///////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////
//                                                                   //
// packages/tmeasday:presence/lib/client.js                          //
//                                                                   //
///////////////////////////////////////////////////////////////////////
                                                                     //
Presence = {};                                                       // 1
Presence.state = function() {                                        // 2
  return 'online';                                                   // 3
};                                                                   // 4
                                                                     // 5
// For backwards compatibilty                                        // 6
Meteor.Presence = Presence;                                          // 7
                                                                     // 8
Meteor.startup(function() {                                          // 9
  Tracker.autorun(function() {                                       // 10
    // This also runs on sign-in/sign-out                            // 11
    if (Meteor.status().status === 'connected')                      // 12
      Meteor.call('updatePresence', Presence.state());               // 13
  });                                                                // 14
                                                                     // 15
  Meteor.setInterval(function() {                                    // 16
    Meteor.call('presenceTick');                                     // 17
  }, 5000);                                                          // 18
});                                                                  // 19
                                                                     // 20
///////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['tmeasday:presence'] = {
  Presences: Presences,
  Presence: Presence
};

})();
