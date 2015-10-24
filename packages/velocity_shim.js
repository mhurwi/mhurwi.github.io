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
var _ = Package.underscore._;

(function () {

///////////////////////////////////////////////////////////////////////
//                                                                   //
// packages/velocity:shim/shim.js                                    //
//                                                                   //
///////////////////////////////////////////////////////////////////////
                                                                     //
// Make Velocity globals available in this package                   // 1
var packageContext = this,                                           // 2
    packages       = [                                               // 3
      'velocity:core'                                                // 4
    ];                                                               // 5
_.forEach(packages, function (packageName) {                         // 6
  var packageGlobals = Package[packageName];                         // 7
  if (packageGlobals) {                                              // 8
    _.forEach(packageGlobals, function (globalValue, globalName) {   // 9
      packageContext[globalName] = globalValue;                      // 10
    });                                                              // 11
  }                                                                  // 12
});                                                                  // 13
                                                                     // 14
///////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['velocity:shim'] = {};

})();
