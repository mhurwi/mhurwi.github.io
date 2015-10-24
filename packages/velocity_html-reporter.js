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
var Template = Package.templating.Template;
var Blaze = Package.blaze.Blaze;
var UI = Package.blaze.UI;
var Handlebars = Package.blaze.Handlebars;
var HTML = Package.htmljs.HTML;

/* Package-scope variables */
var reamplify, suiteHasFailed, frameworkStatus;

(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/velocity:html-reporter/lib/reamplify.js                                                                  //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
// A reactive version of amplify.store(). This object acts a little like the Session object, but                     // 1
// the key/value store is persisted on the client using amplify, so it survives page refresh                         // 2
// and retains its values between sessions.                                                                          // 3
                                                                                                                     // 4
reamplify = {                                                                                                        // 5
  deps: {},                                                                                                          // 6
  store: function (key, value) {                                                                                     // 7
    var self = this;                                                                                                 // 8
    if (value === null) {                                                                                            // 9
      //delete key                                                                                                   // 10
      if (self.deps[key])                                                                                            // 11
        delete self.deps[key];                                                                                       // 12
      return amplify.store(key, null);                                                                               // 13
    }                                                                                                                // 14
    else if (value !== undefined) {                                                                                  // 15
      //add/update                                                                                                   // 16
      var previousValue = amplify.store(key);                                                                        // 17
      if (self.deps[key] && value !== previousValue) {                                                               // 18
        self.deps[key].changed()                                                                                     // 19
      }                                                                                                              // 20
      return amplify.store(key, value);                                                                              // 21
    }                                                                                                                // 22
    else if (key) {                                                                                                  // 23
      // get value of key                                                                                            // 24
      var result;                                                                                                    // 25
      result = amplify.store(key);                                                                                   // 26
      if (!self.deps[key])                                                                                           // 27
        self.deps[key] = new Deps.Dependency;                                                                        // 28
      self.deps[key].depend();                                                                                       // 29
      return result;                                                                                                 // 30
    }                                                                                                                // 31
    else {                                                                                                           // 32
      //not implemented                                                                                              // 33
      throw new Error('reAmplify cannot reactively return the entire amplify store. ' +                              // 34
      'Use amplify.store() instead');                                                                                // 35
    }                                                                                                                // 36
  }                                                                                                                  // 37
};                                                                                                                   // 38
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/velocity:html-reporter/lib/velocity.js                                                                   //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
// Make Velocity globals available in this package                                                                   // 1
var packageContext = this;                                                                                           // 2
_.forEach(Package['velocity:core'], function (globalValue, globalName) {                                             // 3
  packageContext[globalName] = globalValue;                                                                          // 4
});                                                                                                                  // 5
                                                                                                                     // 6
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/velocity:html-reporter/lib/template.client-report.js                                                     //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
                                                                                                                     // 1
Template.body.addContent((function() {                                                                               // 2
  var view = this;                                                                                                   // 3
  return Spacebars.include(view.lookupTemplate("velocity"));                                                         // 4
}));                                                                                                                 // 5
Meteor.startup(Template.body.renderToDocument);                                                                      // 6
                                                                                                                     // 7
Template.__checkName("velocity");                                                                                    // 8
Template["velocity"] = new Template("Template.velocity", (function() {                                               // 9
  var view = this;                                                                                                   // 10
  return Blaze.If(function() {                                                                                       // 11
    return Spacebars.call(view.lookup("showVelocity"));                                                              // 12
  }, function() {                                                                                                    // 13
    return [ "\n      ", HTML.DIV({                                                                                  // 14
      id: "velocityOverlay",                                                                                         // 15
      "class": function() {                                                                                          // 16
        return [ Blaze.If(function() {                                                                               // 17
          return Spacebars.call(view.lookup("overlayIsVisible"));                                                    // 18
        }, function() {                                                                                              // 19
          return "visible";                                                                                          // 20
        }), " ", Spacebars.mustache(view.lookup("statusWidgetClass")) ];                                             // 21
      },                                                                                                             // 22
      "aria-hidden": function() {                                                                                    // 23
        return Blaze.If(function() {                                                                                 // 24
          return Spacebars.call(view.lookup("overlayIsVisible"));                                                    // 25
        }, function() {                                                                                              // 26
          return "false";                                                                                            // 27
        }, function() {                                                                                              // 28
          return "true";                                                                                             // 29
        });                                                                                                          // 30
      }                                                                                                              // 31
    }, "\n          ", HTML.BUTTON({                                                                                 // 32
      "class": "velocity-btn-close display-toggle",                                                                  // 33
      "data-target": "velocityOverlay"                                                                               // 34
    }), "\n\n          ", HTML.DIV({                                                                                 // 35
      "class": "velocity-logo"                                                                                       // 36
    }, "Velocity"), "\n\n        ", Blaze.If(function() {                                                            // 37
      return Spacebars.call(view.lookup("resetting"));                                                               // 38
    }, function() {                                                                                                  // 39
      return [ "\n          ", Spacebars.include(view.lookupTemplate("velocityResetNotification")), "\n        " ];  // 40
    }), "\n\n        ", Spacebars.include(view.lookupTemplate("velocitySummary")), "\n\n        ", Spacebars.include(view.lookupTemplate("velocityControlPanel")), "\n\n        ", Blaze.Each(function() {
      return Spacebars.call(view.lookup("frameworks"));                                                              // 42
    }, function() {                                                                                                  // 43
      return [ "\n          ", Spacebars.include(view.lookupTemplate("velocityReports")), "\n        " ];            // 44
    }), "\n\n        ", Blaze.If(function() {                                                                        // 45
      return Spacebars.dataMustache(view.lookup("active"), "showLogs");                                              // 46
    }, function() {                                                                                                  // 47
      return [ "\n            ", HTML.DIV({                                                                          // 48
        "class": "velocity-section-header"                                                                           // 49
      }, "\n                ", HTML.SPAN({                                                                           // 50
        "class": "velocity-section-name"                                                                             // 51
      }, "Logs"), "\n            "), "\n          ", Spacebars.include(view.lookupTemplate("velocityLogs")), "\n        " ];
    }), "\n\n        ", Blaze.If(function() {                                                                        // 53
      return Spacebars.dataMustache(view.lookup("active"), "showFiles");                                             // 54
    }, function() {                                                                                                  // 55
      return [ "\n            ", HTML.DIV({                                                                          // 56
        "class": "velocity-section-header"                                                                           // 57
      }, "\n                ", HTML.SPAN({                                                                           // 58
        "class": "velocity-section-name"                                                                             // 59
      }, "Test files"), "\n            "), "\n          ", Spacebars.include(view.lookupTemplate("velocityTestFiles")), "\n        " ];
    }), "\n\n        ", Blaze.If(function() {                                                                        // 61
      return Spacebars.call(view.lookup("mochaPresent"));                                                            // 62
    }, function() {                                                                                                  // 63
      return [ "\n            ", HTML.DIV({                                                                          // 64
        "class": function() {                                                                                        // 65
          return [ "velocity-iframe ", Blaze.If(function() {                                                         // 66
            return Spacebars.dataMustache(view.lookup("active"), "showMochaIframe");                                 // 67
          }, function() {                                                                                            // 68
            return "visible";                                                                                        // 69
          }) ];                                                                                                      // 70
        }                                                                                                            // 71
      }, "\n                ", HTML.DIV({                                                                            // 72
        "class": "velocity-section-header"                                                                           // 73
      }, "\n                    ", HTML.SPAN({                                                                       // 74
        "class": "velocity-section-name"                                                                             // 75
      }, "Mocha iframe"), "\n                "), "\n              ", Spacebars.include(view.lookupTemplate("mochaweb")), "\n            "), "\n        " ];
    }), "\n      "), "\n\n      ", HTML.DIV({                                                                        // 77
      tabindex: function() {                                                                                         // 78
        return Spacebars.mustache(view.lookup("statusWidgetTabIndex"));                                              // 79
      },                                                                                                             // 80
      id: "velocity-status-widget",                                                                                  // 81
      "aria-label": function() {                                                                                     // 82
        return [ Spacebars.mustache(view.lookup("statusWidgetClass")), " " ];                                        // 83
      },                                                                                                             // 84
      "class": function() {                                                                                          // 85
        return [ Spacebars.mustache(view.lookup("statusWidgetPosition")), " ", Spacebars.mustache(view.lookup("statusWidgetClass")), " display-toggle" ];
      },                                                                                                             // 87
      "data-target": "velocityOverlay",                                                                              // 88
      title: "Show test results"                                                                                     // 89
    }, "\n          ", HTML.I({                                                                                      // 90
      "class": "velocity-icon-status"                                                                                // 91
    }), "\n      "), "\n  " ];                                                                                       // 92
  });                                                                                                                // 93
}));                                                                                                                 // 94
                                                                                                                     // 95
Template.__checkName("velocitySummary");                                                                             // 96
Template["velocitySummary"] = new Template("Template.velocitySummary", (function() {                                 // 97
  var view = this;                                                                                                   // 98
  return [ HTML.DIV({                                                                                                // 99
    "class": "velocity-summary"                                                                                      // 100
  }, "\n        ", HTML.Raw('<i class="velocity-icon-status"></i>'), "\n        ", HTML.I({                          // 101
    "class": "velocity-icon-total"                                                                                   // 102
  }, "\n          ", Blaze.If(function() {                                                                           // 103
    return Spacebars.call(view.lookup("anyFailed"));                                                                 // 104
  }, function() {                                                                                                    // 105
    return [ "\n            ", Blaze.View("lookup:totalFailedTestCount", function() {                                // 106
      return Spacebars.mustache(view.lookup("totalFailedTestCount"));                                                // 107
    }), "\n              ", HTML.SMALL("Fail"), "\n          " ];                                                    // 108
  }, function() {                                                                                                    // 109
    return [ "\n            ", Blaze.View("lookup:totalPassedTestCount", function() {                                // 110
      return Spacebars.mustache(view.lookup("totalPassedTestCount"));                                                // 111
    }), "\n              ", HTML.SMALL("Pass"), "\n          " ];                                                    // 112
  }), "\n        "), "\n        ", HTML.I({                                                                          // 113
    "class": "velocity-icon-time"                                                                                    // 114
  }, "\n            ", HTML.SPAN(Blaze.View("lookup:totalTime", function() {                                         // 115
    return Spacebars.mustache(view.lookup("totalTime"));                                                             // 116
  })), "\n        "), "\n    "), "\n    ", HTML.DIV({                                                                // 117
    "class": "velocity-summary-text"                                                                                 // 118
  }, "\n      ", Blaze.If(function() {                                                                               // 119
    return Spacebars.call(view.lookup("anyFailed"));                                                                 // 120
  }, function() {                                                                                                    // 121
    return [ "\n        ", Blaze.View("lookup:totalFailedTestCount", function() {                                    // 122
      return Spacebars.mustache(view.lookup("totalFailedTestCount"));                                                // 123
    }), " ", Blaze.View("lookup:regularPlural", function() {                                                         // 124
      return Spacebars.mustache(view.lookup("regularPlural"), view.lookup("totalFailedTestCount"), "test", "s");     // 125
    }), " failed\n      " ];                                                                                         // 126
  }, function() {                                                                                                    // 127
    return [ "\n        ", Blaze.View("lookup:totalPassedTestCount", function() {                                    // 128
      return Spacebars.mustache(view.lookup("totalPassedTestCount"));                                                // 129
    }), " ", Blaze.View("lookup:regularPlural", function() {                                                         // 130
      return Spacebars.mustache(view.lookup("regularPlural"), view.lookup("totalPassedTestCount"), "test", "s");     // 131
    }), " passed in ", Blaze.View("lookup:totalTime", function() {                                                   // 132
      return Spacebars.mustache(view.lookup("totalTime"));                                                           // 133
    }), "\n      " ];                                                                                                // 134
  }), "\n    ") ];                                                                                                   // 135
}));                                                                                                                 // 136
                                                                                                                     // 137
Template.__checkName("velocityControlPanel");                                                                        // 138
Template["velocityControlPanel"] = new Template("Template.velocityControlPanel", (function() {                       // 139
  var view = this;                                                                                                   // 140
  return [ HTML.Raw('<button aria-label="reporter options" class="velocity-options-toggle">\n        <i class="velocity-icon-cog"></i>\n    </button>\n\n    '), HTML.DIV({
    "class": "velocity-options"                                                                                      // 142
  }, "\n        ", HTML.BUTTON({                                                                                     // 143
    "aria-label": "Show passing tests",                                                                              // 144
    id: "showSuccessful",                                                                                            // 145
    "class": function() {                                                                                            // 146
      return [ "btn-velocity control-toggle ", Spacebars.mustache(view.lookup("showActive"), "showSuccessful") ];    // 147
    }                                                                                                                // 148
  }, "Show passing tests"), "\n        ", HTML.BUTTON({                                                              // 149
    "aria-label": "Show files",                                                                                      // 150
    id: "showFiles",                                                                                                 // 151
    "class": function() {                                                                                            // 152
      return [ "btn-velocity control-toggle ", Spacebars.mustache(view.lookup("showActive"), "showFiles") ];         // 153
    }                                                                                                                // 154
  }, "Show files"), "\n      ", Blaze.If(function() {                                                                // 155
    return Spacebars.call(view.lookup("mochaPresent"));                                                              // 156
  }, function() {                                                                                                    // 157
    return [ "\n          ", HTML.BUTTON({                                                                           // 158
      "aria-label": "Show mocha iframe",                                                                             // 159
      id: "showMochaIframe",                                                                                         // 160
      "class": function() {                                                                                          // 161
        return [ "btn-velocity control-toggle ", Spacebars.mustache(view.lookup("showActive"), "showMochaIframe") ]; // 162
      }                                                                                                              // 163
    }, "Show mocha iframe"), "\n      " ];                                                                           // 164
  }), "\n      ", Blaze.If(function() {                                                                              // 165
    return Spacebars.call(view.lookup("nightwatchPresent"));                                                         // 166
  }, function() {                                                                                                    // 167
    return [ "\n          ", HTML.BUTTON({                                                                           // 168
      "aria-label": "Run nightwatch tests",                                                                          // 169
      id: "runNightwatchTests",                                                                                      // 170
      "class": "btn-velocity"                                                                                        // 171
    }, "Run nightwatch tests"), "\n      " ];                                                                        // 172
  }), "\n    ") ];                                                                                                   // 173
}));                                                                                                                 // 174
                                                                                                                     // 175
Template.__checkName("velocityReports");                                                                             // 176
Template["velocityReports"] = new Template("Template.velocityReports", (function() {                                 // 177
  var view = this;                                                                                                   // 178
  return HTML.SECTION({                                                                                              // 179
    "class": function() {                                                                                            // 180
      return [ "velocity-report ", Spacebars.mustache(view.lookup("frameworkStatus")) ];                             // 181
    }                                                                                                                // 182
  }, "\n        ", HTML.DIV({                                                                                        // 183
    "class": "velocity-section-header"                                                                               // 184
  }, "\n            ", HTML.SPAN({                                                                                   // 185
    "class": "velocity-section-name"                                                                                 // 186
  }, Blaze.View("lookup:name", function() {                                                                          // 187
    return Spacebars.mustache(view.lookup("name"));                                                                  // 188
  })), "\n        "), "\n\n      ", Blaze.If(function() {                                                            // 189
    return Spacebars.dataMustache(view.lookup("isPassed"), view.lookup("frameworkStatus"));                          // 190
  }, function() {                                                                                                    // 191
    return [ "\n          ", HTML.I({                                                                                // 192
      "class": "velocity-icon-status"                                                                                // 193
    }), "\n      " ];                                                                                                // 194
  }), "\n\n      ", Blaze.Unless(function() {                                                                        // 195
    return Spacebars.call(view.lookup("frameworkTotalTestCount"));                                                   // 196
  }, function() {                                                                                                    // 197
    return [ "\n        ", Blaze.If(function() {                                                                     // 198
      return Spacebars.call(view.lookup("noFrameworkFiles"));                                                        // 199
    }, function() {                                                                                                  // 200
      return [ "\n            ", HTML.DIV({                                                                          // 201
        "class": "velocity-notice-inline"                                                                            // 202
      }, "\n                ", HTML.P("It appears that you don't have any tests for this framework. Would you like to add some?"), "\n                ", HTML.BUTTON({
        "aria-label": "Add sample tests",                                                                            // 204
        "class": "btn-velocity copy-sample-tests"                                                                    // 205
      }, "Add ", Blaze.View("lookup:name", function() {                                                              // 206
        return Spacebars.mustache(view.lookup("name"));                                                              // 207
      }), " sample tests"), "\n            "), "\n        " ];                                                       // 208
    }, function() {                                                                                                  // 209
      return [ "\n            ", HTML.DIV({                                                                          // 210
        "class": "velocity-loading"                                                                                  // 211
      }, "\n                ", HTML.I({                                                                              // 212
        "class": "velocity-icon-loading"                                                                             // 213
      }), "\n\n                ", HTML.P("Loading"), "\n            "), "\n        " ];                              // 214
    }), "\n      " ];                                                                                                // 215
  }), "\n\n      ", Blaze.Each(function() {                                                                          // 216
    return Spacebars.call(view.lookup("suites"));                                                                    // 217
  }, function() {                                                                                                    // 218
    return [ "\n        ", Blaze.If(function() {                                                                     // 219
      return Spacebars.call(view.lookup("suiteNotHidden"));                                                          // 220
    }, function() {                                                                                                  // 221
      return [ "\n            ", HTML.DIV({                                                                          // 222
        "class": function() {                                                                                        // 223
          return [ "velocity-suite ", Spacebars.mustache(view.lookup("suiteStatus")) ];                              // 224
        }                                                                                                            // 225
      }, "\n                ", HTML.DIV({                                                                            // 226
        "class": function() {                                                                                        // 227
          return [ "velocity-suite-header ", Spacebars.mustache(view.lookup("suiteStatus")) ];                       // 228
        }                                                                                                            // 229
      }, "\n                  ", Blaze.View("lookup:suite", function() {                                             // 230
        return Spacebars.mustache(view.lookup("suite"));                                                             // 231
      }), "\n                "), "\n                ", HTML.TABLE({                                                  // 232
        "class": "velocity-result-table"                                                                             // 233
      }, "\n                    ", HTML.TBODY("\n                    ", Blaze.Each(function() {                      // 234
        return Spacebars.call(view.lookup("reports"));                                                               // 235
      }, function() {                                                                                                // 236
        return [ "\n                      ", Spacebars.include(view.lookupTemplate("velocityTestReport")), "\n                    " ];
      }), "\n                    "), "\n                "), "\n            "), "\n        " ];                       // 238
    }), "\n      " ];                                                                                                // 239
  }), "\n    ");                                                                                                     // 240
}));                                                                                                                 // 241
                                                                                                                     // 242
Template.__checkName("velocityTestReport");                                                                          // 243
Template["velocityTestReport"] = new Template("Template.velocityTestReport", (function() {                           // 244
  var view = this;                                                                                                   // 245
  return Blaze.If(function() {                                                                                       // 246
    return Spacebars.call(view.lookup("reportNotHidden"));                                                           // 247
  }, function() {                                                                                                    // 248
    return [ "\n      ", HTML.TR({                                                                                   // 249
      "class": function() {                                                                                          // 250
        return [ "velocity-test ", Blaze.If(function() {                                                             // 251
          return Spacebars.call(view.lookup("failed"));                                                              // 252
        }, function() {                                                                                              // 253
          return "failed";                                                                                           // 254
        }, function() {                                                                                              // 255
          return "passed";                                                                                           // 256
        }) ];                                                                                                        // 257
      }                                                                                                              // 258
    }, "\n          ", HTML.TD({                                                                                     // 259
      "class": "velocity-test-name"                                                                                  // 260
    }, Blaze.View("lookup:name", function() {                                                                        // 261
      return Spacebars.makeRaw(Spacebars.mustache(view.lookup("name")));                                             // 262
    })), " \n          ", HTML.TD({                                                                                  // 263
      "class": "velocity-test-time"                                                                                  // 264
    }, Blaze.If(function() {                                                                                         // 265
      return Spacebars.call(view.lookup("failed"));                                                                  // 266
    }, function() {                                                                                                  // 267
      return "Fail";                                                                                                 // 268
    }, function() {                                                                                                  // 269
      return [ Blaze.View("lookup:duration", function() {                                                            // 270
        return Spacebars.mustache(view.lookup("duration"));                                                          // 271
      }), " ms" ];                                                                                                   // 272
    })), "\n      "), "\n    ", Blaze.If(function() {                                                                // 273
      return Spacebars.call(view.lookup("failed"));                                                                  // 274
    }, function() {                                                                                                  // 275
      return [ "\n        ", HTML.TR("\n            ", HTML.TD({                                                     // 276
        "class": "velocity-fail-msg",                                                                                // 277
        colspan: "2"                                                                                                 // 278
      }, "\n                ", HTML.I({                                                                              // 279
        "class": "velocity-icon-status"                                                                              // 280
      }), " ", Blaze.View("lookup:failureMessage", function() {                                                      // 281
        return Spacebars.mustache(view.lookup("failureMessage"));                                                    // 282
      }), "\n            "), "\n        "), "\n        ", HTML.TR("\n            ", HTML.TD({                        // 283
        colspan: "2"                                                                                                 // 284
      }, "\n              ", Blaze.If(function() {                                                                   // 285
        return Spacebars.call(view.lookup("failureStackTrace"));                                                     // 286
      }, function() {                                                                                                // 287
        return [ "\n                  ", HTML.PRE({                                                                  // 288
          "class": "velocity-stack-trace"                                                                            // 289
        }, Blaze.View("lookup:failureStackTrace", function() {                                                       // 290
          return Spacebars.mustache(view.lookup("failureStackTrace"));                                               // 291
        })), "\n              " ];                                                                                   // 292
      }), "\n            "), "\n        "), "\n    " ];                                                              // 293
    }), "\n  " ];                                                                                                    // 294
  });                                                                                                                // 295
}));                                                                                                                 // 296
                                                                                                                     // 297
Template.__checkName("velocityLogs");                                                                                // 298
Template["velocityLogs"] = new Template("Template.velocityLogs", (function() {                                       // 299
  var view = this;                                                                                                   // 300
  return HTML.DIV({                                                                                                  // 301
    "class": "velocity-table-box"                                                                                    // 302
  }, "\n        ", HTML.TABLE({                                                                                      // 303
    id: "velocityLogs",                                                                                              // 304
    "class": "velocity-table"                                                                                        // 305
  }, "\n            ", HTML.THEAD("\n            ", HTML.TR("\n                ", HTML.TH("Timestamp"), "\n                ", HTML.TH("Level"), "\n                ", HTML.TH("Message"), "\n                ", HTML.TH("Framework"), "\n            "), "\n            "), "\n            ", HTML.TBODY("\n            ", Blaze.Each(function() {
    return Spacebars.call(view.lookup("logs"));                                                                      // 307
  }, function() {                                                                                                    // 308
    return [ "\n              ", Spacebars.include(view.lookupTemplate("velocityLog")), "\n            " ];          // 309
  }), "\n            "), "\n        "), "\n    ");                                                                   // 310
}));                                                                                                                 // 311
                                                                                                                     // 312
Template.__checkName("velocityLog");                                                                                 // 313
Template["velocityLog"] = new Template("Template.velocityLog", (function() {                                         // 314
  var view = this;                                                                                                   // 315
  return HTML.TR({                                                                                                   // 316
    "class": function() {                                                                                            // 317
      return Spacebars.mustache(view.lookup("result"));                                                              // 318
    }                                                                                                                // 319
  }, "\n        ", HTML.TD(Blaze.View("lookup:timestamp", function() {                                               // 320
    return Spacebars.mustache(view.lookup("timestamp"));                                                             // 321
  })), "\n        ", HTML.TD(Blaze.View("lookup:level", function() {                                                 // 322
    return Spacebars.mustache(view.lookup("level"));                                                                 // 323
  })), "\n        ", HTML.TD(Blaze.View("lookup:message", function() {                                               // 324
    return Spacebars.mustache(view.lookup("message"));                                                               // 325
  })), "\n        ", HTML.TD(Blaze.View("lookup:framework", function() {                                             // 326
    return Spacebars.mustache(view.lookup("framework"));                                                             // 327
  })), "\n    ");                                                                                                    // 328
}));                                                                                                                 // 329
                                                                                                                     // 330
Template.__checkName("velocityTestFiles");                                                                           // 331
Template["velocityTestFiles"] = new Template("Template.velocityTestFiles", (function() {                             // 332
  var view = this;                                                                                                   // 333
  return HTML.DIV({                                                                                                  // 334
    "class": "velocity-table-box"                                                                                    // 335
  }, "\n        ", HTML.TABLE({                                                                                      // 336
    id: "velocityTestFiles",                                                                                         // 337
    "class": "velocity-table"                                                                                        // 338
  }, "\n            ", HTML.THEAD("\n            ", HTML.TR("\n                ", HTML.TH("ID"), "\n                ", HTML.TH("Relative Path"), "\n                ", HTML.TH("Target Framework"), "\n                ", HTML.TH("Last Modified"), "\n            "), "\n            "), "\n            ", HTML.TBODY("\n            ", Blaze.Each(function() {
    return Spacebars.call(view.lookup("testFiles"));                                                                 // 340
  }, function() {                                                                                                    // 341
    return [ "\n              ", Spacebars.include(view.lookupTemplate("velocityTestFile")), "\n            " ];     // 342
  }), "\n            "), "\n        "), "\n    ");                                                                   // 343
}));                                                                                                                 // 344
                                                                                                                     // 345
Template.__checkName("velocityTestFile");                                                                            // 346
Template["velocityTestFile"] = new Template("Template.velocityTestFile", (function() {                               // 347
  var view = this;                                                                                                   // 348
  return HTML.TR({                                                                                                   // 349
    "class": function() {                                                                                            // 350
      return Spacebars.mustache(view.lookup("result"));                                                              // 351
    }                                                                                                                // 352
  }, "\n        ", HTML.TD(Blaze.View("lookup:_id", function() {                                                     // 353
    return Spacebars.mustache(view.lookup("_id"));                                                                   // 354
  })), "\n        ", HTML.TD(Blaze.View("lookup:relativePath", function() {                                          // 355
    return Spacebars.mustache(view.lookup("relativePath"));                                                          // 356
  })), "\n        ", HTML.TD(Blaze.View("lookup:targetFramework", function() {                                       // 357
    return Spacebars.mustache(view.lookup("targetFramework"));                                                       // 358
  })), "\n        ", HTML.TD(Blaze.View("lookup:lastModified", function() {                                          // 359
    return Spacebars.mustache(view.lookup("lastModified"));                                                          // 360
  })), "\n    ");                                                                                                    // 361
}));                                                                                                                 // 362
                                                                                                                     // 363
Template.__checkName("velocityResetNotification");                                                                   // 364
Template["velocityResetNotification"] = new Template("Template.velocityResetNotification", (function() {             // 365
  var view = this;                                                                                                   // 366
  return HTML.Raw('<div id="velocityResetNotification">\n        <div class="velocity-notice-inline">\n            <div class="velocity-section-header">\n                <span class="velocity-section-name">Please wait</span>\n            </div>\n            <p>Velocity is updating your files.</p>\n        </div>\n    </div>');
}));                                                                                                                 // 368
                                                                                                                     // 369
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/velocity:html-reporter/lib/client-report.js                                                              //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
suiteHasFailed = function (suite) {                                                                                  // 1
  return !!VelocityTestReports.findOne({                                                                             // 2
    framework: suite.framework,                                                                                      // 3
    ancestors: suite.ancestors,                                                                                      // 4
    result: "failed"                                                                                                 // 5
  });                                                                                                                // 6
};                                                                                                                   // 7
                                                                                                                     // 8
frameworkStatus = function (name) {                                                                                  // 9
  var hasTests = VelocityTestReports.find({framework: name}).count() > 0;                                            // 10
  if (!hasTests) return "empty";                                                                                     // 11
                                                                                                                     // 12
  var frameworkExecStatus = VelocityAggregateReports.findOne({name: name});                                          // 13
  var isComplete = (frameworkExecStatus && frameworkExecStatus.result === "completed");                              // 14
  var hasFailed = !!VelocityTestReports.findOne({framework: name, result: "failed"});                                // 15
                                                                                                                     // 16
  if (hasFailed)                                                                                                     // 17
    return "failed";                                                                                                 // 18
  else if (isComplete)                                                                                               // 19
    return "passed";                                                                                                 // 20
  else                                                                                                               // 21
    return "pending";                                                                                                // 22
};                                                                                                                   // 23
                                                                                                                     // 24
function mochaPresent () {                                                                                           // 25
  //XXX hard-coding mocha iframe support for now                                                                     // 26
  return !!VelocityAggregateReports.findOne({'name': 'mocha'});                                                      // 27
}                                                                                                                    // 28
function nightwatchPresent () {                                                                                      // 29
  return !!VelocityAggregateReports.findOne({'name': 'nightwatch'});                                                 // 30
}                                                                                                                    // 31
                                                                                                                     // 32
Template.velocity.created = function () {                                                                            // 33
  // Only show widget when we know we are NOT running in a Velocity Mirror                                           // 34
  Session.setDefault('velocity.isMirror', true);                                                                     // 35
  // Determine if user has disabled velocity                                                                         // 36
  Meteor.call('velocity/isEnabled', function (error, result) {                                                       // 37
    if (error) {                                                                                                     // 38
      // Log error. HTML Reporter will not be shown                                                                  // 39
      console.error(error);                                                                                          // 40
    } else {                                                                                                         // 41
      Session.set('velocity.isEnabled', result);                                                                     // 42
    }                                                                                                                // 43
  });                                                                                                                // 44
                                                                                                                     // 45
  // Determine if session is running in a Velocity mirror or not                                                     // 46
  Meteor.call('velocity/isMirror', function (error, result) {                                                        // 47
    if (error) {                                                                                                     // 48
      // Log error. HTML Reporter will not be shown                                                                  // 49
      console.error(error);                                                                                          // 50
    } else {                                                                                                         // 51
      Session.set('velocity.isMirror', result);                                                                      // 52
    }                                                                                                                // 53
  })                                                                                                                 // 54
};                                                                                                                   // 55
                                                                                                                     // 56
Template.velocity.helpers({                                                                                          // 57
  statusWidgetClass: function () {                                                                                   // 58
    var aggregateResult = VelocityAggregateReports.findOne({name: 'aggregateResult'});                               // 59
    if (aggregateResult && aggregateResult.result === 'failed') {                                                    // 60
      return 'failed';                                                                                               // 61
    }                                                                                                                // 62
                                                                                                                     // 63
    var aggregateComplete = VelocityAggregateReports.findOne({name: 'aggregateComplete'});                           // 64
    if (aggregateComplete && aggregateResult                                                                         // 65
      && aggregateResult.result === 'passed' && aggregateComplete.result === 'completed') {                          // 66
      return 'passed';                                                                                               // 67
    }                                                                                                                // 68
    return 'pending';                                                                                                // 69
  },                                                                                                                 // 70
  statusWidgetPosition: function () {                                                                                // 71
    var defaultPosition = "top right";                                                                               // 72
    if (Meteor.settings && Meteor.settings.public && Meteor.settings.public['velocity:html-reporter']) {             // 73
      return Meteor.settings.public['velocity:html-reporter'].position || defaultPosition;                           // 74
    }                                                                                                                // 75
    return defaultPosition;                                                                                          // 76
  },                                                                                                                 // 77
  statusWidgetTabIndex: function () {                                                                                // 78
    var defaultIndex = "1";                                                                                          // 79
    if (Meteor.settings && Meteor.settings.public && Meteor.settings.public['velocity:html-reporter']) {             // 80
      return Meteor.settings.public['velocity:html-reporter']['tab-index'] || defaultIndex;                          // 81
    }                                                                                                                // 82
    return defaultIndex;                                                                                             // 83
  },                                                                                                                 // 84
  resetting: function () {                                                                                           // 85
    return Session.get('resettingVelocity')                                                                          // 86
  },                                                                                                                 // 87
  testReports: function () {                                                                                         // 88
    return VelocityTestReports.find();                                                                               // 89
  },                                                                                                                 // 90
  frameworks: function () {                                                                                          // 91
    return VelocityAggregateReports.find({name: {$nin: ["aggregateResult", "aggregateComplete"]}});                  // 92
  },                                                                                                                 // 93
  active: function (id) {                                                                                            // 94
    return reamplify.store(id);                                                                                      // 95
  },                                                                                                                 // 96
  overlayIsVisible: function () {                                                                                    // 97
    return amplify.store('velocityOverlayIsVisible')                                                                 // 98
  },                                                                                                                 // 99
  showVelocity: function () {                                                                                        // 100
    // This causes the html reporter to remain hidden if running in a Velocity mirror                                // 101
    return Session.equals('velocity.isEnabled', true) && Session.equals('velocity.isMirror', false);                 // 102
  },                                                                                                                 // 103
  mochaPresent: mochaPresent,                                                                                        // 104
  nightwatchPresent: nightwatchPresent                                                                               // 105
});                                                                                                                  // 106
                                                                                                                     // 107
Template.velocityReports.helpers({                                                                                   // 108
  frameworkStatus: function () {                                                                                     // 109
    return frameworkStatus(this.name)                                                                                // 110
  },                                                                                                                 // 111
  isPassed: function (status) {                                                                                      // 112
    return status === 'passed'                                                                                       // 113
  },                                                                                                                 // 114
  frameworkTotalTestCount: function () {                                                                             // 115
    return VelocityTestReports.find({framework: this.name}).count();                                                 // 116
  },                                                                                                                 // 117
  frameworkPassedTestCount: function () {                                                                            // 118
    return VelocityTestReports.find({framework: this.name, result: 'passed'}).count();                               // 119
  },                                                                                                                 // 120
  noFrameworkFiles: function () {                                                                                    // 121
    // XXX presence of VelocityAggregateReports is a stand-in for                                                    // 122
    // Velocity being loaded. This is a bit brittle. It breaks                                                       // 123
    // if you call the Velocity "reset" method.                                                                      // 124
    var velocityIsLoaded = !!VelocityAggregateReports;                                                               // 125
    return !velocityIsLoaded ? false : !VelocityTestFiles.findOne({targetFramework: this.name});                     // 126
  },                                                                                                                 // 127
  suites: function () {                                                                                              // 128
    var result = [];                                                                                                 // 129
    var allReports = VelocityTestReports.find({framework: this.name}).fetch();                                       // 130
    // XXX for now, ancestors get reduced to a single-tier suite                                                     // 131
    // Should we do fancier indenting, etc. for nested suites?                                                       // 132
    // If not, forcing packages to concatenate their own "suite" string                                              // 133
    // instead of ancestors array would clean this up.                                                               // 134
    if (allReports.length > 0) {                                                                                     // 135
                                                                                                                     // 136
      var reports = _.map(allReports, function (report) {                                                            // 137
        //must clone report.ancestors to not mutate report.ancestors with .reverse()                                 // 138
        var ancestors = report.ancestors ? _.clone(report.ancestors) : [];                                           // 139
        report.suite = ancestors.reverse().join(".");                                                                // 140
        return report;                                                                                               // 141
      });                                                                                                            // 142
                                                                                                                     // 143
      _.each(reports, function (report) {                                                                            // 144
        if (!_.findWhere(result, {suite: report.suite}))                                                             // 145
          result.push({                                                                                              // 146
            framework: report.framework,                                                                             // 147
            ancestors: report.ancestors, //needed for future queries                                                 // 148
            suite: report.suite                                                                                      // 149
          })                                                                                                         // 150
      });                                                                                                            // 151
                                                                                                                     // 152
      return result;                                                                                                 // 153
    }                                                                                                                // 154
  },                                                                                                                 // 155
  suiteStatus: function () {                                                                                         // 156
    return suiteHasFailed(this) ? 'failed' : 'passed';                                                               // 157
  },                                                                                                                 // 158
  suiteNotHidden: function () {                                                                                      // 159
    if (!reamplify.store('showSuccessful'))                                                                          // 160
      return suiteHasFailed(this);                                                                                   // 161
    return true;                                                                                                     // 162
  },                                                                                                                 // 163
  reports: function () {                                                                                             // 164
    return VelocityTestReports.find({                                                                                // 165
      framework: this.framework,                                                                                     // 166
      ancestors: this.ancestors                                                                                      // 167
    });                                                                                                              // 168
  }                                                                                                                  // 169
});                                                                                                                  // 170
                                                                                                                     // 171
Template.velocitySummary.helpers({                                                                                   // 172
  anyFailed: function () {                                                                                           // 173
    var aggregateResult = VelocityAggregateReports.findOne({name: 'aggregateResult'});                               // 174
    if (aggregateResult && aggregateResult.result === 'failed') {                                                    // 175
      return true;                                                                                                   // 176
    }                                                                                                                // 177
    return false;                                                                                                    // 178
  },                                                                                                                 // 179
  totalTime: function () {                                                                                           // 180
    var results = VelocityTestReports.find().fetch();                                                                // 181
                                                                                                                     // 182
    var firstTimeStamp, lastTimestamp, lastDuration;                                                                 // 183
    _.each(results, function (result) {                                                                              // 184
      if (!firstTimeStamp || firstTimeStamp > result.timestamp.getTime()) {                                          // 185
        firstTimeStamp = result.timestamp.getTime();                                                                 // 186
      }                                                                                                              // 187
      if (!lastTimestamp || lastTimestamp < result.timestamp.getTime()) {                                            // 188
        lastTimestamp = result.timestamp.getTime();                                                                  // 189
        lastDuration = result.duration;                                                                              // 190
      }                                                                                                              // 191
    });                                                                                                              // 192
                                                                                                                     // 193
    //var ms = results                                                                                               // 194
    //  .reduce(function (tot, i) { return tot + (i.duration || 0) }, 0);                                            // 195
                                                                                                                     // 196
    var ms = lastTimestamp + lastDuration - firstTimeStamp;                                                          // 197
                                                                                                                     // 198
    if (ms >= 1000) return Math.round(ms / 1000) + ' s';                                                             // 199
                                                                                                                     // 200
    return ms ? ms : 0 + ' ms';                                                                                      // 201
  },                                                                                                                 // 202
  regularPlural: function (count, word, suffix) {                                                                    // 203
    if (count === 1) return word;                                                                                    // 204
    return word + suffix;                                                                                            // 205
  },                                                                                                                 // 206
  totalFailedTestCount: function () {                                                                                // 207
    return VelocityTestReports.find({result: 'failed'}).count();                                                     // 208
  },                                                                                                                 // 209
  totalTestCount: function () {                                                                                      // 210
    return VelocityTestReports.find().count();                                                                       // 211
  },                                                                                                                 // 212
  totalPassedTestCount: function () {                                                                                // 213
    return VelocityTestReports.find({result: 'passed'}).count();                                                     // 214
  }                                                                                                                  // 215
});                                                                                                                  // 216
                                                                                                                     // 217
Template.velocityControlPanel.helpers({                                                                              // 218
  mochaPresent: mochaPresent,                                                                                        // 219
  nightwatchPresent: nightwatchPresent,                                                                              // 220
  showActive: function (self) {                                                                                      // 221
    return reamplify.store(self) ? 'active' : ''                                                                     // 222
  }                                                                                                                  // 223
});                                                                                                                  // 224
                                                                                                                     // 225
Template.velocityControlPanel.events({                                                                               // 226
  'click #runNightwatchTests': function () {                                                                         // 227
    Meteor.call('nightwatch/run');                                                                                   // 228
  }                                                                                                                  // 229
});                                                                                                                  // 230
                                                                                                                     // 231
Template.velocityTestReport.helpers({                                                                                // 232
  reportNotHidden: function () {                                                                                     // 233
    if (this.result === "failed")                                                                                    // 234
      return true;                                                                                                   // 235
    else {                                                                                                           // 236
      return (reamplify.store('showSuccessful'));                                                                    // 237
    }                                                                                                                // 238
  },                                                                                                                 // 239
  failed: function () {                                                                                              // 240
    return (this.result === "failed");                                                                               // 241
  }                                                                                                                  // 242
});                                                                                                                  // 243
                                                                                                                     // 244
Template.velocityTestFiles.helpers({                                                                                 // 245
  testFiles: function () {                                                                                           // 246
    return VelocityTestFiles.find();                                                                                 // 247
  },                                                                                                                 // 248
  isVisible: function () {                                                                                           // 249
    return amplify.store('velocityTestFilesIsVisible') ? 'block' : 'none';                                           // 250
  }                                                                                                                  // 251
});                                                                                                                  // 252
                                                                                                                     // 253
Template.velocityLogs.helpers({                                                                                      // 254
  logs: function () {                                                                                                // 255
    return VelocityLogs.find();                                                                                      // 256
  },                                                                                                                 // 257
  isVisible: function () {                                                                                           // 258
    return amplify.store('velocityLogsIsVisible') ? 'block' : 'none';                                                // 259
  }                                                                                                                  // 260
});                                                                                                                  // 261
                                                                                                                     // 262
Template.velocity.events({                                                                                           // 263
  'keypress .display-toggle, click .display-toggle': function (e) {                                                  // 264
    var targetId = $(e.currentTarget).data('target'),                                                                // 265
        $target = $('#' + targetId);                                                                                 // 266
    $target.toggleClass('visible');                                                                                  // 267
    $target.attr("aria-hidden", !$target.hasClass('visible'));                                                       // 268
    amplify.store(targetId + 'IsVisible', $target.hasClass('visible'));                                              // 269
  },                                                                                                                 // 270
  'change input:checkbox': function (e) {                                                                            // 271
    var targetId = e.target.id;                                                                                      // 272
    reamplify.store(e.target.id, e.target.checked);                                                                  // 273
  },                                                                                                                 // 274
  'click button.control-toggle': function (e) {                                                                      // 275
    var $target = $('#' + e.target.id);                                                                              // 276
    $target.toggleClass('active');                                                                                   // 277
    reamplify.store(e.target.id, $target.hasClass('active'));                                                        // 278
  },                                                                                                                 // 279
  'click .velocity-options-toggle': function (e, tpl) {                                                              // 280
    tpl.$('.velocity-options').toggleClass('visible')                                                                // 281
  }                                                                                                                  // 282
});                                                                                                                  // 283
                                                                                                                     // 284
Template.velocityReports.events({                                                                                    // 285
  'click .copy-sample-tests': function (e) {                                                                         // 286
    Meteor.call('velocity/copySampleTests', {framework: this.name}, function () {                                    // 287
      // XXX This method for getting the new files to register is slow, but it                                       // 288
      // works. The reset method gets Velocity to see the new files.                                                 // 289
      // We then disconnect altogether to prevent flapping of reactive                                               // 290
      // template elements (& overlay a notification to show the user                                                // 291
      // what's happening). Then we simply reload. Is there a way to do this                                         // 292
      // with a lighter touch?                                                                                       // 293
                                                                                                                     // 294
      // make sure the user can see the demo tests, which generally pass.                                            // 295
      reamplify.store('showSuccessful', true);                                                                       // 296
      Session.set('resettingVelocity', true);                                                                        // 297
      Meteor.call('velocity/reset');                                                                                 // 298
      Meteor.disconnect();                                                                                           // 299
      location.reload();                                                                                             // 300
    });                                                                                                              // 301
  }                                                                                                                  // 302
});                                                                                                                  // 303
                                                                                                                     // 304
Meteor.startup(function () {                                                                                         // 305
                                                                                                                     // 306
  $(document).keydown(function (e) {                                                                                 // 307
    if (e.keyCode === 86 && e.ctrlKey) {                                                                             // 308
      var state = Session.get('velocity.isEnabled');                                                                 // 309
      Session.set('velocity.isEnabled', !state);                                                                     // 310
    }                                                                                                                // 311
  });                                                                                                                // 312
                                                                                                                     // 313
});                                                                                                                  // 314
                                                                                                                     // 315
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['velocity:html-reporter'] = {};

})();
