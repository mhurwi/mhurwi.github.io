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
var WebApp = Package.webapp.WebApp;
var Mongo = Package.mongo.Mongo;
var check = Package.check.check;
var Match = Package.check.Match;

/* Package-scope variables */
var Velocity, VelocityTestFiles, VelocityFixtureFiles, VelocityTestReports, VelocityAggregateReports, VelocityLogs, VelocityMirrors, VelocityOptions, VelocityInternals;

(function () {

//////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                          //
// packages/velocity:core/src/globals.js                                                    //
//                                                                                          //
//////////////////////////////////////////////////////////////////////////////////////////////
                                                                                            //
/* globals                                                                                  // 1
   Velocity: true,                                                                          // 2
   VelocityInternals: true                                                                  // 3
*/                                                                                          // 4
                                                                                            // 5
/**                                                                                         // 6
 * The `Velocity` object provides a common API for test frameworks to report                // 7
 * test results.  Frameworks can also request assets, such as a copy of the                 // 8
 * user's application (the 'mirror') in which tests can be safely run without               // 9
 * impacting on-going development.                                                          // 10
 *                                                                                          // 11
 * Test results and log activity are reported via                                           // 12
 * {{#crossLink "Meteor.methods"}}Meteor methods{{/crossLink}}.                             // 13
 *                                                                                          // 14
 * @class Velocity                                                                          // 15
 */                                                                                         // 16
Velocity = {};                                                                              // 17
                                                                                            // 18
VelocityInternals = {};                                                                     // 19
                                                                                            // 20
//////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

//////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                          //
// packages/velocity:core/src/collections.js                                                //
//                                                                                          //
//////////////////////////////////////////////////////////////////////////////////////////////
                                                                                            //
/*jshint -W117 */                                                                           // 1
/* global                                                                                   // 2
 VelocityTestFiles: true,                                                                   // 3
 VelocityFixtureFiles: true,                                                                // 4
 VelocityTestReports: true,                                                                 // 5
 VelocityAggregateReports: true,                                                            // 6
 VelocityLogs: true,                                                                        // 7
 VelocityMirrors: true,                                                                     // 8
 VelocityOptions: true                                                                      // 9
 */                                                                                         // 10
                                                                                            // 11
/**                                                                                         // 12
 * @class Collections                                                                       // 13
 */                                                                                         // 14
                                                                                            // 15
/**                                                                                         // 16
 * TODO: Needs description and example records                                              // 17
 *                                                                                          // 18
 * @property VelocityTestFiles                                                              // 19
 * @type Mongo.Collection                                                                   // 20
 */                                                                                         // 21
VelocityTestFiles = new Mongo.Collection('velocityTestFiles');                              // 22
/**                                                                                         // 23
 * TODO: Needs description and example records                                              // 24
 *                                                                                          // 25
 * @property VelocityFixtureFiles                                                           // 26
 * @type Mongo.Collection                                                                   // 27
 */                                                                                         // 28
VelocityFixtureFiles = new Mongo.Collection('velocityFixtureFiles');                        // 29
/**                                                                                         // 30
 * TODO: Needs description and example records                                              // 31
 *                                                                                          // 32
 * @property VelocityTestReports                                                            // 33
 * @type Mongo.Collection                                                                   // 34
 */                                                                                         // 35
VelocityTestReports = new Mongo.Collection('velocityTestReports');                          // 36
/**                                                                                         // 37
 * TODO: Needs description and example records                                              // 38
 *                                                                                          // 39
 * @property VelocityAggregateReports                                                       // 40
 * @type Mongo.Collection                                                                   // 41
 */                                                                                         // 42
VelocityAggregateReports = new Mongo.Collection('velocityAggregateReports');                // 43
/**                                                                                         // 44
 * TODO: Needs description and example records                                              // 45
 *                                                                                          // 46
 * @property VelocityLogs                                                                   // 47
 * @type Mongo.Collection                                                                   // 48
 */                                                                                         // 49
VelocityLogs = new Mongo.Collection('velocityLogs');                                        // 50
/**                                                                                         // 51
 * TODO: Needs description and example records                                              // 52
 *                                                                                          // 53
 * @property VelocityMirrors                                                                // 54
 * @type Mongo.Collection                                                                   // 55
 */                                                                                         // 56
VelocityMirrors = new Mongo.Collection('velocityMirrors');                                  // 57
/**                                                                                         // 58
 * TODO: Needs description and example records                                              // 59
 *                                                                                          // 60
 * @property VelocityOptions                                                                // 61
 * @type Mongo.Collection                                                                   // 62
 */                                                                                         // 63
VelocityOptions = new Mongo.Collection('velocityOptions');                                  // 64
                                                                                            // 65
                                                                                            // 66
(function () {                                                                              // 67
  'use strict';                                                                             // 68
                                                                                            // 69
  if (Meteor.isServer) {                                                                    // 70
    Meteor.publish('VelocityTestFiles', function () {                                       // 71
      return VelocityTestFiles.find({});                                                    // 72
    });                                                                                     // 73
    Meteor.publish('VelocityFixtureFiles', function () {                                    // 74
      return VelocityFixtureFiles.find({});                                                 // 75
    });                                                                                     // 76
    Meteor.publish('VelocityTestReports', function () {                                     // 77
      return VelocityTestReports.find({});                                                  // 78
    });                                                                                     // 79
    Meteor.publish('VelocityAggregateReports', function () {                                // 80
      return VelocityAggregateReports.find({});                                             // 81
    });                                                                                     // 82
    Meteor.publish('VelocityLogs', function () {                                            // 83
      return VelocityLogs.find({});                                                         // 84
    });                                                                                     // 85
    Meteor.publish('VelocityMirrors', function () {                                         // 86
      return VelocityMirrors.find({});                                                      // 87
    });                                                                                     // 88
    Meteor.publish('VelocityOptions', function () {                                         // 89
      return VelocityOptions.find({});                                                      // 90
    });                                                                                     // 91
  }                                                                                         // 92
                                                                                            // 93
  if (Meteor.isClient) {                                                                    // 94
    Meteor.subscribe('VelocityTestFiles');                                                  // 95
    Meteor.subscribe('VelocityFixtureFiles');                                               // 96
    Meteor.subscribe('VelocityTestReports');                                                // 97
    Meteor.subscribe('VelocityAggregateReports');                                           // 98
    Meteor.subscribe('VelocityLogs');                                                       // 99
    Meteor.subscribe('VelocityMirrors');                                                    // 100
    Meteor.subscribe('VelocityOptions');                                                    // 101
  }                                                                                         // 102
})();                                                                                       // 103
                                                                                            // 104
//////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

//////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                          //
// packages/velocity:core/src/core-shared.js                                                //
//                                                                                          //
//////////////////////////////////////////////////////////////////////////////////////////////
                                                                                            //
/*jshint -W117 */                                                                           // 1
                                                                                            // 2
(function () {                                                                              // 3
  'use strict';                                                                             // 4
                                                                                            // 5
  //////////////////////////////////////////////////////////////////////                    // 6
  // Public Methods                                                                         // 7
  //                                                                                        // 8
                                                                                            // 9
  /**                                                                                       // 10
   * Mirrors can share the same codebase as the main process.                               // 11
   * This method will run provided code inside a mirror only.                               // 12
   *                                                                                        // 13
   * where: client / server                                                                 // 14
   *                                                                                        // 15
   * @method onTest                                                                         // 16
   * @for Velocity                                                                          // 17
   * @param {Function} code                                                                 // 18
   */                                                                                       // 19
  Velocity.onTest = function (code) {                                                       // 20
    Meteor.call('velocity/isMirror', function (err, res) {                                  // 21
      if (res) {                                                                            // 22
        code();                                                                             // 23
      }                                                                                     // 24
    });                                                                                     // 25
  };                                                                                        // 26
                                                                                            // 27
  if (Meteor.isServer) {                                                                    // 28
    /**                                                                                     // 29
     * See <a href="Meteor.methods.html#method_velocity/setOption">velocity/setOption</a>   // 30
     *                                                                                      // 31
     * @method setOption                                                                    // 32
     */                                                                                     // 33
    Velocity.setOption = function (name, value) {                                           // 34
      Meteor.call('velocity/setOption', name, value);                                       // 35
    };                                                                                      // 36
                                                                                            // 37
    /**                                                                                     // 38
     * See <a href="Meteor.methods.html#method_velocity/setOptions">velocity/setOptions</a> // 39
     *                                                                                      // 40
     * @method setOptions                                                                   // 41
     */                                                                                     // 42
    Velocity.setOptions = function (options) {                                              // 43
      Meteor.call('velocity/setOptions', options);                                          // 44
    };                                                                                      // 45
                                                                                            // 46
    /**                                                                                     // 47
     * See <a href="Meteor.methods.html#method_velocity/getOption">velocity/getOption</a>   // 48
     *                                                                                      // 49
     * @method getOption                                                                    // 50
     * @for Velocity                                                                        // 51
     */                                                                                     // 52
    Velocity.getOption = function (name) {                                                  // 53
      Meteor.call('velocity/getOption', name);                                              // 54
    };                                                                                      // 55
  }                                                                                         // 56
                                                                                            // 57
                                                                                            // 58
  Meteor.methods({                                                                          // 59
    /**                                                                                     // 60
     * Set an option.                                                                       // 61
     *                                                                                      // 62
     * @method velocity/setOption                                                           // 63
     * @for Meteor.methods                                                                  // 64
     * @param {String} name The name of the option.                                         // 65
     * @param {*} value The value of the option.                                            // 66
     */                                                                                     // 67
    'velocity/setOption': function (name, value) {                                          // 68
      check(name, String);                                                                  // 69
      check(value, Match.Any);                                                              // 70
                                                                                            // 71
      VelocityOptions.upsert(                                                               // 72
        {name: name},                                                                       // 73
        {$set: {name: name, value: value}}                                                  // 74
      );                                                                                    // 75
    },                                                                                      // 76
                                                                                            // 77
    /**                                                                                     // 78
     * Set multiple options.                                                                // 79
     *                                                                                      // 80
     * @method velocity/setOptions                                                          // 81
     * @param options Hash with options (name: value).                                      // 82
     */                                                                                     // 83
    'velocity/setOptions': function (options) {                                             // 84
      check(options, Object);                                                               // 85
                                                                                            // 86
      for (var name in options) {                                                           // 87
        if (options.hasOwnProperty(name)) {                                                 // 88
          Meteor.call('velocity/setOption', name, options[name]);                           // 89
        }                                                                                   // 90
      }                                                                                     // 91
    },                                                                                      // 92
                                                                                            // 93
    /**                                                                                     // 94
     * Get an option                                                                        // 95
     *                                                                                      // 96
     * @method velocity/getOption                                                           // 97
     * @param {String} name The name of the option.                                         // 98
     * @return {*} The value of the option or null.                                         // 99
     */                                                                                     // 100
    'velocity/getOption': function (name) {                                                 // 101
      check(name, String);                                                                  // 102
                                                                                            // 103
      var option = VelocityOptions.findOne({name: name});                                   // 104
      return option ? option.value : null;                                                  // 105
    },                                                                                      // 106
  });                                                                                       // 107
                                                                                            // 108
                                                                                            // 109
  if (Meteor.isServer) {                                                                    // 110
    Meteor.methods({                                                                        // 111
      /**                                                                                   // 112
       * Exposes the VELOCITY environment variable.                                         // 113
       *                                                                                    // 114
       * @method velocity/isEnabled                                                         // 115
       * @for Meteor.methods                                                                // 116
       * @return {Boolean} true if VELOCITY environment variable is truthy                  // 117
       */                                                                                   // 118
      'velocity/isEnabled': function () {                                                   // 119
        if (process.env.VELOCITY === undefined) {                                           // 120
          return true;                                                                      // 121
        } else {                                                                            // 122
          return !!parseInt(process.env.VELOCITY);                                          // 123
        }                                                                                   // 124
      }                                                                                     // 125
    });                                                                                     // 126
  }                                                                                         // 127
                                                                                            // 128
})();                                                                                       // 129
                                                                                            // 130
//////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['velocity:core'] = {
  Velocity: Velocity,
  VelocityTestFiles: VelocityTestFiles,
  VelocityFixtureFiles: VelocityFixtureFiles,
  VelocityTestReports: VelocityTestReports,
  VelocityAggregateReports: VelocityAggregateReports,
  VelocityLogs: VelocityLogs,
  VelocityMirrors: VelocityMirrors,
  VelocityOptions: VelocityOptions
};

})();
