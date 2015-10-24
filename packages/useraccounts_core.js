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
var Accounts = Package['accounts-base'].Accounts;
var check = Package.check.check;
var Match = Package.check.Match;
var _ = Package.underscore._;
var Router = Package['iron:router'].Router;
var RouteController = Package['iron:router'].RouteController;
var ReactiveVar = Package['reactive-var'].ReactiveVar;
var Blaze = Package.blaze.Blaze;
var UI = Package.blaze.UI;
var Handlebars = Package.blaze.Handlebars;
var ReactiveDict = Package['reactive-dict'].ReactiveDict;
var Iron = Package['iron:core'].Iron;
var HTML = Package.htmljs.HTML;

/* Package-scope variables */
var AccountsTemplates, capitalize, signedInAs, Field, STATE_PAT, ERRORS_PAT, INFO_PAT, INPUT_ICONS_PAT, ObjWithStringValues, TEXTS_PAT, CONFIG_PAT, FIELD_SUB_PAT, FIELD_PAT, AT, form, markIfMissing, options;

(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/useraccounts:core/lib/utils.js                                                                           //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
capitalize = function(str) {                                                                                         // 1
    return str.charAt(0).toUpperCase() + str.slice(1);                                                               // 2
};                                                                                                                   // 3
                                                                                                                     // 4
signedInAs =  function() {                                                                                           // 5
    var user = Meteor.user();                                                                                        // 6
    if (user) {                                                                                                      // 7
        if (user.username) {                                                                                         // 8
            return user.username;                                                                                    // 9
        } else if (user.profile && user.profile.name) {                                                              // 10
            return user.profile.name;                                                                                // 11
        } else if (user.emails && user.emails[0]) {                                                                  // 12
            return user.emails[0].address;                                                                           // 13
        } else {                                                                                                     // 14
            return "Signed In";                                                                                      // 15
        }                                                                                                            // 16
    }                                                                                                                // 17
};                                                                                                                   // 18
                                                                                                                     // 19
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/useraccounts:core/lib/field.js                                                                           //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
// ---------------------------------------------------------------------------------                                 // 1
                                                                                                                     // 2
// Field object                                                                                                      // 3
                                                                                                                     // 4
// ---------------------------------------------------------------------------------                                 // 5
                                                                                                                     // 6
                                                                                                                     // 7
Field = function(field){                                                                                             // 8
    check(field, FIELD_PAT);                                                                                         // 9
    _.defaults(this, field);                                                                                         // 10
                                                                                                                     // 11
    this.validating = new ReactiveVar(false);                                                                        // 12
    this.status = new ReactiveVar(null);                                                                             // 13
};                                                                                                                   // 14
                                                                                                                     // 15
if (Meteor.isClient)                                                                                                 // 16
    Field.prototype.clearStatus = function(){                                                                        // 17
        return this.status.set(null);                                                                                // 18
    };                                                                                                               // 19
if (Meteor.isServer)                                                                                                 // 20
    Field.prototype.clearStatus = function(){                                                                        // 21
        // Nothing to do server-side                                                                                 // 22
        return                                                                                                       // 23
    };                                                                                                               // 24
                                                                                                                     // 25
Field.prototype.fixValue = function(value){                                                                          // 26
    if (this.type === "checkbox")                                                                                    // 27
        return !!value;                                                                                              // 28
    if (this.type === "select")                                                                                      // 29
        // TODO: something working...                                                                                // 30
        return value;                                                                                                // 31
    if (this.type === "radio")                                                                                       // 32
        // TODO: something working...                                                                                // 33
        return value;                                                                                                // 34
    // Possibly applies required transformations to the input value                                                  // 35
    if (this.trim)                                                                                                   // 36
        value = value.trim();                                                                                        // 37
    if (this.lowercase)                                                                                              // 38
        value = value.toLowerCase();                                                                                 // 39
    if (this.uppercase)                                                                                              // 40
        value = value.toUpperCase();                                                                                 // 41
    if (!!this.transform)                                                                                            // 42
        value = this.transform(value);                                                                               // 43
    return value;                                                                                                    // 44
};                                                                                                                   // 45
                                                                                                                     // 46
if (Meteor.isClient)                                                                                                 // 47
    Field.prototype.getDisplayName = function(state){                                                                // 48
        var dN = this.displayName;                                                                                   // 49
        if (_.isObject(dN))                                                                                          // 50
            dN = dN[state] || dN["default"];                                                                         // 51
        if (!dN)                                                                                                     // 52
            dN = capitalize(this._id);                                                                               // 53
        return dN;                                                                                                   // 54
    };                                                                                                               // 55
                                                                                                                     // 56
if (Meteor.isClient)                                                                                                 // 57
    Field.prototype.getPlaceholder = function(state){                                                                // 58
        var placeholder = this.placeholder;                                                                          // 59
        if (_.isObject(placeholder))                                                                                 // 60
            placeholder = placeholder[state] || placeholder["default"];                                              // 61
        if (!placeholder)                                                                                            // 62
            placeholder = capitalize(this._id);                                                                      // 63
        return placeholder;                                                                                          // 64
    };                                                                                                               // 65
                                                                                                                     // 66
Field.prototype.getStatus = function(){                                                                              // 67
    return this.status.get();                                                                                        // 68
};                                                                                                                   // 69
                                                                                                                     // 70
if (Meteor.isClient)                                                                                                 // 71
    Field.prototype.getValue = function(tempalteInstance){                                                           // 72
        if (this.type === "checkbox")                                                                                // 73
            return !!(tempalteInstance.$("#at-field-" + this._id + ":checked").val());                               // 74
        if (this.type === "radio")                                                                                   // 75
            return tempalteInstance.$("[name=at-field-"+ this._id + "]:checked").val();                              // 76
        return tempalteInstance.$("#at-field-" + this._id).val();                                                    // 77
    };                                                                                                               // 78
                                                                                                                     // 79
if (Meteor.isClient)                                                                                                 // 80
    Field.prototype.hasError = function() {                                                                          // 81
        return this.negativeValidation && this.status.get();                                                         // 82
    };                                                                                                               // 83
                                                                                                                     // 84
if (Meteor.isClient)                                                                                                 // 85
    Field.prototype.hasIcon = function(){                                                                            // 86
        if (this.showValidating && this.isValidating())                                                              // 87
            return true;                                                                                             // 88
        if (this.negativeFeedback && this.hasError())                                                                // 89
            return true;                                                                                             // 90
        if (this.positiveFeedback && this.hasSuccess())                                                              // 91
            return true;                                                                                             // 92
    };                                                                                                               // 93
                                                                                                                     // 94
if (Meteor.isClient)                                                                                                 // 95
    Field.prototype.hasSuccess = function() {                                                                        // 96
        return this.positiveValidation && this.status.get() === false;                                               // 97
    };                                                                                                               // 98
                                                                                                                     // 99
if (Meteor.isClient)                                                                                                 // 100
    Field.prototype.iconClass = function(){                                                                          // 101
        if (this.isValidating())                                                                                     // 102
            return AccountsTemplates.texts.inputIcons["isValidating"];                                               // 103
        if (this.hasError())                                                                                         // 104
            return AccountsTemplates.texts.inputIcons["hasError"];                                                   // 105
        if (this.hasSuccess())                                                                                       // 106
            return AccountsTemplates.texts.inputIcons["hasSuccess"];                                                 // 107
    };                                                                                                               // 108
                                                                                                                     // 109
if (Meteor.isClient)                                                                                                 // 110
    Field.prototype.isValidating = function(){                                                                       // 111
        return this.validating.get();                                                                                // 112
    };                                                                                                               // 113
                                                                                                                     // 114
if (Meteor.isClient)                                                                                                 // 115
    Field.prototype.setError = function(err){                                                                        // 116
        check(err, Match.OneOf(String, undefined, Boolean));                                                         // 117
        if (err === false)                                                                                           // 118
            return this.status.set(false);                                                                           // 119
        return this.status.set(err || true);                                                                         // 120
    };                                                                                                               // 121
if (Meteor.isServer)                                                                                                 // 122
    Field.prototype.setError = function(err){                                                                        // 123
        // Nothing to do server-side                                                                                 // 124
        return;                                                                                                      // 125
    };                                                                                                               // 126
                                                                                                                     // 127
if (Meteor.isClient)                                                                                                 // 128
    Field.prototype.setSuccess = function(){                                                                         // 129
        return this.status.set(false);                                                                               // 130
    };                                                                                                               // 131
if (Meteor.isServer)                                                                                                 // 132
    Field.prototype.setSuccess = function(){                                                                         // 133
        // Nothing to do server-side                                                                                 // 134
        return;                                                                                                      // 135
    };                                                                                                               // 136
                                                                                                                     // 137
                                                                                                                     // 138
if (Meteor.isClient)                                                                                                 // 139
    Field.prototype.setValidating = function(state){                                                                 // 140
        check(state, Boolean);                                                                                       // 141
        return this.validating.set(state);                                                                           // 142
    };                                                                                                               // 143
if (Meteor.isServer)                                                                                                 // 144
    Field.prototype.setValidating = function(state){                                                                 // 145
        // Nothing to do server-side                                                                                 // 146
        return;                                                                                                      // 147
    };                                                                                                               // 148
                                                                                                                     // 149
if (Meteor.isClient)                                                                                                 // 150
    Field.prototype.setValue = function(tempalteInstance, value){                                                    // 151
        if (this.type === "checkbox") {                                                                              // 152
            tempalteInstance.$("#at-field-" + this._id).prop('checked', true);                                       // 153
            return;                                                                                                  // 154
        }                                                                                                            // 155
        if (this.type === "radio") {                                                                                 // 156
            tempalteInstance.$("[name=at-field-"+ this._id + "]").prop('checked', true);                             // 157
            return;                                                                                                  // 158
        }                                                                                                            // 159
        tempalteInstance.$("#at-field-" + this._id).val(value);                                                      // 160
    };                                                                                                               // 161
                                                                                                                     // 162
Field.prototype.validate = function(value, strict) {                                                                 // 163
    check(value, Match.OneOf(undefined, String, Boolean));                                                           // 164
    this.setValidating(true);                                                                                        // 165
    this.clearStatus();                                                                                              // 166
    if (value === undefined || value === ''){                                                                        // 167
        if (!!strict){                                                                                               // 168
            if (this.required) {                                                                                     // 169
                this.setError(AccountsTemplates.texts.requiredField);                                                // 170
                this.setValidating(false);                                                                           // 171
                return AccountsTemplates.texts.requiredField;                                                        // 172
            }                                                                                                        // 173
            else {                                                                                                   // 174
                this.setSuccess();                                                                                   // 175
                this.setValidating(false);                                                                           // 176
                return false;                                                                                        // 177
            }                                                                                                        // 178
        }                                                                                                            // 179
        else {                                                                                                       // 180
            this.clearStatus();                                                                                      // 181
            this.setValidating(false);                                                                               // 182
            return null;                                                                                             // 183
        }                                                                                                            // 184
    }                                                                                                                // 185
    var valueLength = value.length;                                                                                  // 186
    var minLength = this.minLength;                                                                                  // 187
    if (minLength && valueLength < minLength) {                                                                      // 188
        this.setError(AccountsTemplates.texts.minRequiredLength + ": " + minLength);                                 // 189
        this.setValidating(false);                                                                                   // 190
        return AccountsTemplates.texts.minRequiredLength + ": " + minLength;                                         // 191
    }                                                                                                                // 192
    var maxLength = this.maxLength;                                                                                  // 193
    if (maxLength && valueLength > maxLength) {                                                                      // 194
        this.setError(AccountsTemplates.texts.maxAllowedLength + ": " + maxLength);                                  // 195
        this.setValidating(false);                                                                                   // 196
        return AccountsTemplates.texts.maxAllowedLength + ": " + maxLength;                                          // 197
    }                                                                                                                // 198
    if (this.re && valueLength && !value.match(this.re)) {                                                           // 199
        this.setError(this.errStr);                                                                                  // 200
        this.setValidating(false);                                                                                   // 201
        return this.errStr;                                                                                          // 202
    }                                                                                                                // 203
    if (this.func){                                                                                                  // 204
        var result = this.func(value);                                                                               // 205
        var err = result === true ? this.errStr || true : result;                                                    // 206
        if (result === undefined)                                                                                    // 207
            return err;                                                                                              // 208
        this.status.set(err);                                                                                        // 209
        this.setValidating(false);                                                                                   // 210
        return err;                                                                                                  // 211
    }                                                                                                                // 212
    this.setSuccess();                                                                                               // 213
    this.setValidating(false);                                                                                       // 214
    return false;                                                                                                    // 215
};                                                                                                                   // 216
                                                                                                                     // 217
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/useraccounts:core/lib/core.js                                                                            //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
// ---------------------------------------------------------------------------------                                 // 1
                                                                                                                     // 2
// Patterns for methods" parameters                                                                                  // 3
                                                                                                                     // 4
// ---------------------------------------------------------------------------------                                 // 5
                                                                                                                     // 6
STATE_PAT = {                                                                                                        // 7
    changePwd: Match.Optional(String),                                                                               // 8
    enrollAccount: Match.Optional(String),                                                                           // 9
    forgotPwd: Match.Optional(String),                                                                               // 10
    resetPwd: Match.Optional(String),                                                                                // 11
    signIn: Match.Optional(String),                                                                                  // 12
    signUp: Match.Optional(String),                                                                                  // 13
    verifyEmail: Match.Optional(String),                                                                             // 14
    resendVerificationEmail: Match.Optional(String),                                                                 // 15
};                                                                                                                   // 16
                                                                                                                     // 17
ERRORS_PAT = {                                                                                                       // 18
    accountsCreationDisabled: Match.Optional(String),                                                                // 19
    cannotRemoveService: Match.Optional(String),                                                                     // 20
    captchaVerification: Match.Optional(String),                                                                     // 21
    loginForbidden: Match.Optional(String),                                                                          // 22
    mustBeLoggedIn: Match.Optional(String),                                                                          // 23
    pwdMismatch: Match.Optional(String),                                                                             // 24
    validationErrors: Match.Optional(String),                                                                        // 25
    verifyEmailFirst: Match.Optional(String),                                                                        // 26
};                                                                                                                   // 27
                                                                                                                     // 28
INFO_PAT = {                                                                                                         // 29
    emailSent: Match.Optional(String),                                                                               // 30
    emailVerified: Match.Optional(String),                                                                           // 31
    pwdChanged: Match.Optional(String),                                                                              // 32
    pwdReset: Match.Optional(String),                                                                                // 33
    pwdSet: Match.Optional(String),                                                                                  // 34
    signUpVerifyEmail: Match.Optional(String),                                                                       // 35
    verificationEmailSent: Match.Optional(String),                                                                   // 36
};                                                                                                                   // 37
                                                                                                                     // 38
INPUT_ICONS_PAT = {                                                                                                  // 39
    hasError: Match.Optional(String),                                                                                // 40
    hasSuccess: Match.Optional(String),                                                                              // 41
    isValidating: Match.Optional(String),                                                                            // 42
};                                                                                                                   // 43
                                                                                                                     // 44
ObjWithStringValues = Match.Where(function (x) {                                                                     // 45
    check(x, Object);                                                                                                // 46
    _.each(_.values(x), function(value){                                                                             // 47
        check(value, String);                                                                                        // 48
    });                                                                                                              // 49
    return true;                                                                                                     // 50
});                                                                                                                  // 51
                                                                                                                     // 52
TEXTS_PAT = {                                                                                                        // 53
    button: Match.Optional(STATE_PAT),                                                                               // 54
    errors: Match.Optional(ERRORS_PAT),                                                                              // 55
    info: Match.Optional(INFO_PAT),                                                                                  // 56
    inputIcons: Match.Optional(INPUT_ICONS_PAT),                                                                     // 57
    maxAllowedLength: Match.Optional(String),                                                                        // 58
    minRequiredLength: Match.Optional(String),                                                                       // 59
    navSignIn: Match.Optional(String),                                                                               // 60
    navSignOut: Match.Optional(String),                                                                              // 61
    optionalField: Match.Optional(String),                                                                           // 62
    pwdLink_link: Match.Optional(String),                                                                            // 63
    pwdLink_pre: Match.Optional(String),                                                                             // 64
    pwdLink_suff: Match.Optional(String),                                                                            // 65
    requiredField: Match.Optional(String),                                                                           // 66
    resendVerificationEmailLink_pre: Match.Optional(String),                                                         // 67
    resendVerificationEmailLink_link: Match.Optional(String),                                                        // 68
    resendVerificationEmailLink_suff: Match.Optional(String),                                                        // 69
    sep: Match.Optional(String),                                                                                     // 70
    signInLink_link: Match.Optional(String),                                                                         // 71
    signInLink_pre: Match.Optional(String),                                                                          // 72
    signInLink_suff: Match.Optional(String),                                                                         // 73
    signUpLink_link: Match.Optional(String),                                                                         // 74
    signUpLink_pre: Match.Optional(String),                                                                          // 75
    signUpLink_suff: Match.Optional(String),                                                                         // 76
    socialAdd: Match.Optional(String),                                                                               // 77
    socialConfigure: Match.Optional(String),                                                                         // 78
    socialIcons: Match.Optional(ObjWithStringValues),                                                                // 79
    socialRemove: Match.Optional(String),                                                                            // 80
    socialSignIn: Match.Optional(String),                                                                            // 81
    socialSignUp: Match.Optional(String),                                                                            // 82
    socialWith: Match.Optional(String),                                                                              // 83
    termsAnd: Match.Optional(String),                                                                                // 84
    termsPreamble: Match.Optional(String),                                                                           // 85
    termsPrivacy: Match.Optional(String),                                                                            // 86
    termsTerms: Match.Optional(String),                                                                              // 87
    title: Match.Optional(STATE_PAT),                                                                                // 88
};                                                                                                                   // 89
                                                                                                                     // 90
// Configuration pattern to be checked with check                                                                    // 91
CONFIG_PAT = {                                                                                                       // 92
    // Behaviour                                                                                                     // 93
    confirmPassword: Match.Optional(Boolean),                                                                        // 94
    defaultState: Match.Optional(String),                                                                            // 95
    enablePasswordChange: Match.Optional(Boolean),                                                                   // 96
    enforceEmailVerification: Match.Optional(Boolean),                                                               // 97
    forbidClientAccountCreation: Match.Optional(Boolean),                                                            // 98
    lowercaseUsername: Match.Optional(Boolean),                                                                      // 99
    overrideLoginErrors: Match.Optional(Boolean),                                                                    // 100
    sendVerificationEmail: Match.Optional(Boolean),                                                                  // 101
    socialLoginStyle: Match.Optional(Match.OneOf("popup", "redirect")),                                              // 102
                                                                                                                     // 103
    // Appearance                                                                                                    // 104
    defaultLayout: Match.Optional(String),                                                                           // 105
    hideSignInLink: Match.Optional(Boolean),                                                                         // 106
    hideSignUpLink: Match.Optional(Boolean),                                                                         // 107
    showAddRemoveServices: Match.Optional(Boolean),                                                                  // 108
    showForgotPasswordLink: Match.Optional(Boolean),                                                                 // 109
    showResendVerificationEmailLink: Match.Optional(Boolean),                                                        // 110
    showLabels: Match.Optional(Boolean),                                                                             // 111
    showPlaceholders: Match.Optional(Boolean),                                                                       // 112
                                                                                                                     // 113
    // Client-side Validation                                                                                        // 114
    continuousValidation: Match.Optional(Boolean),                                                                   // 115
    negativeFeedback: Match.Optional(Boolean),                                                                       // 116
    negativeValidation: Match.Optional(Boolean),                                                                     // 117
    positiveFeedback: Match.Optional(Boolean),                                                                       // 118
    positiveValidation: Match.Optional(Boolean),                                                                     // 119
    showValidating: Match.Optional(Boolean),                                                                         // 120
                                                                                                                     // 121
    // Privacy Policy and Terms of Use                                                                               // 122
    privacyUrl: Match.Optional(String),                                                                              // 123
    termsUrl: Match.Optional(String),                                                                                // 124
                                                                                                                     // 125
    // Redirects                                                                                                     // 126
    homeRoutePath: Match.Optional(String),                                                                           // 127
    redirectTimeout: Match.Optional(Number),                                                                         // 128
                                                                                                                     // 129
    // Hooks                                                                                                         // 130
    onLogoutHook: Match.Optional(Function),                                                                          // 131
    onSubmitHook: Match.Optional(Function),                                                                          // 132
    preSignUpHook: Match.Optional(Function),                                                                         // 133
                                                                                                                     // 134
    texts: Match.Optional(TEXTS_PAT),                                                                                // 135
                                                                                                                     // 136
    //reCaptcha config                                                                                               // 137
    reCaptcha: Match.Optional({                                                                                      // 138
        data_type: Match.Optional(Match.OneOf("audio", "image")),                                                    // 139
        secretKey: Match.Optional(String),                                                                           // 140
        siteKey: Match.Optional(String),                                                                             // 141
        theme: Match.Optional(Match.OneOf("dark", "light")),                                                         // 142
    }),                                                                                                              // 143
                                                                                                                     // 144
    showReCaptcha: Match.Optional(Boolean),                                                                          // 145
};                                                                                                                   // 146
                                                                                                                     // 147
                                                                                                                     // 148
FIELD_SUB_PAT = {                                                                                                    // 149
    "default": Match.Optional(String),                                                                               // 150
    changePwd: Match.Optional(String),                                                                               // 151
    enrollAccount: Match.Optional(String),                                                                           // 152
    forgotPwd: Match.Optional(String),                                                                               // 153
    resetPwd: Match.Optional(String),                                                                                // 154
    signIn: Match.Optional(String),                                                                                  // 155
    signUp: Match.Optional(String),                                                                                  // 156
};                                                                                                                   // 157
                                                                                                                     // 158
                                                                                                                     // 159
// Field pattern                                                                                                     // 160
FIELD_PAT = {                                                                                                        // 161
    _id: String,                                                                                                     // 162
    type: String,                                                                                                    // 163
    required: Match.Optional(Boolean),                                                                               // 164
    displayName: Match.Optional(Match.OneOf(String, FIELD_SUB_PAT)),                                                 // 165
    placeholder: Match.Optional(Match.OneOf(String, FIELD_SUB_PAT)),                                                 // 166
    select: Match.Optional([{text: String, value: Match.Any}]),                                                      // 167
    minLength: Match.Optional(Match.Integer),                                                                        // 168
    maxLength: Match.Optional(Match.Integer),                                                                        // 169
    re: Match.Optional(RegExp),                                                                                      // 170
    func: Match.Optional(Match.Where(_.isFunction)),                                                                 // 171
    errStr: Match.Optional(String),                                                                                  // 172
                                                                                                                     // 173
    // Client-side Validation                                                                                        // 174
    continuousValidation: Match.Optional(Boolean),                                                                   // 175
    negativeFeedback: Match.Optional(Boolean),                                                                       // 176
    negativeValidation: Match.Optional(Boolean),                                                                     // 177
    positiveValidation: Match.Optional(Boolean),                                                                     // 178
    positiveFeedback: Match.Optional(Boolean),                                                                       // 179
                                                                                                                     // 180
    // Transforms                                                                                                    // 181
    trim: Match.Optional(Boolean),                                                                                   // 182
    lowercase: Match.Optional(Boolean),                                                                              // 183
    uppercase: Match.Optional(Boolean),                                                                              // 184
    transform: Match.Optional(Match.Where(_.isFunction)),                                                            // 185
                                                                                                                     // 186
    // Custom options                                                                                                // 187
    options: Match.Optional(Object),                                                                                 // 188
    template: Match.Optional(String),                                                                                // 189
};                                                                                                                   // 190
                                                                                                                     // 191
// Route configuration pattern to be checked with check                                                              // 192
var ROUTE_PAT = {                                                                                                    // 193
    name: Match.Optional(String),                                                                                    // 194
    path: Match.Optional(String),                                                                                    // 195
    template: Match.Optional(String),                                                                                // 196
    layoutTemplate: Match.Optional(String),                                                                          // 197
    redirect: Match.Optional(Match.OneOf(String, Match.Where(_.isFunction))),                                        // 198
};                                                                                                                   // 199
                                                                                                                     // 200
                                                                                                                     // 201
// -----------------------------------------------------------------------------                                     // 202
                                                                                                                     // 203
// AccountsTemplates object                                                                                          // 204
                                                                                                                     // 205
// -----------------------------------------------------------------------------                                     // 206
                                                                                                                     // 207
                                                                                                                     // 208
                                                                                                                     // 209
// -------------------                                                                                               // 210
// Client/Server stuff                                                                                               // 211
// -------------------                                                                                               // 212
                                                                                                                     // 213
// Constructor                                                                                                       // 214
AT = function() {                                                                                                    // 215
                                                                                                                     // 216
};                                                                                                                   // 217
                                                                                                                     // 218
                                                                                                                     // 219
                                                                                                                     // 220
                                                                                                                     // 221
/*                                                                                                                   // 222
    Each field object is represented by the following properties:                                                    // 223
        _id:         String   (required)  // A unique field"s id / name                                              // 224
        type:        String   (required)  // Displayed input type                                                    // 225
        required:    Boolean  (optional)  // Specifies Whether to fail or not when field is left empty               // 226
        displayName: String   (optional)  // The field"s name to be displayed as a label above the input element     // 227
        placeholder: String   (optional)  // The placeholder text to be displayed inside the input element           // 228
        minLength:   Integer  (optional)  // Possibly specifies the minimum allowed length                           // 229
        maxLength:   Integer  (optional)  // Possibly specifies the maximum allowed length                           // 230
        re:          RegExp   (optional)  // Regular expression for validation                                       // 231
        func:        Function (optional)  // Custom function for validation                                          // 232
        errStr:      String   (optional)  // Error message to be displayed in case re validation fails               // 233
*/                                                                                                                   // 234
                                                                                                                     // 235
                                                                                                                     // 236
                                                                                                                     // 237
/*                                                                                                                   // 238
    Routes configuration can be done by calling AccountsTemplates.configureRoute with the route name and the         // 239
    following options in a separate object. E.g. AccountsTemplates.configureRoute("gingIn", option);                 // 240
        name:           String (optional). A unique route"s name to be passed to iron-router                         // 241
        path:           String (optional). A unique route"s path to be passed to iron-router                         // 242
        template:       String (optional). The name of the template to be rendered                                   // 243
        layoutTemplate: String (optional). The name of the layout to be used                                         // 244
        redirect:       String (optional). The name of the route (or its path) where to redirect after form submit   // 245
*/                                                                                                                   // 246
                                                                                                                     // 247
                                                                                                                     // 248
// Allowed routes along with theirs default configuration values                                                     // 249
AT.prototype.ROUTE_DEFAULT = {                                                                                       // 250
    changePwd:      { name: "atChangePwd",      path: "/change-password"},                                           // 251
    enrollAccount:  { name: "atEnrollAccount",  path: "/enroll-account"},                                            // 252
    ensureSignedIn: { name: "atEnsureSignedIn", path: null},                                                         // 253
    forgotPwd:      { name: "atForgotPwd",      path: "/forgot-password"},                                           // 254
    resetPwd:       { name: "atResetPwd",       path: "/reset-password"},                                            // 255
    signIn:         { name: "atSignIn",         path: "/sign-in"},                                                   // 256
    signUp:         { name: "atSignUp",         path: "/sign-up"},                                                   // 257
    verifyEmail:    { name: "atVerifyEmail",    path: "/verify-email"},                                              // 258
    resendVerificationEmail: { name: "atResendVerificationEmail", path: "/send-again"},                              // 259
};                                                                                                                   // 260
                                                                                                                     // 261
                                                                                                                     // 262
                                                                                                                     // 263
// Allowed input types                                                                                               // 264
AT.prototype.INPUT_TYPES = [                                                                                         // 265
    "checkbox",                                                                                                      // 266
    "email",                                                                                                         // 267
    "hidden",                                                                                                        // 268
    "password",                                                                                                      // 269
    "radio",                                                                                                         // 270
    "select",                                                                                                        // 271
    "tel",                                                                                                           // 272
    "text",                                                                                                          // 273
    "url",                                                                                                           // 274
];                                                                                                                   // 275
                                                                                                                     // 276
// Current configuration values                                                                                      // 277
AT.prototype.options = {                                                                                             // 278
    // Appearance                                                                                                    // 279
    //defaultLayout: undefined,                                                                                      // 280
    showAddRemoveServices: false,                                                                                    // 281
    showForgotPasswordLink: false,                                                                                   // 282
    showResendVerificationEmailLink: false,                                                                          // 283
    showLabels: true,                                                                                                // 284
    showPlaceholders: true,                                                                                          // 285
                                                                                                                     // 286
    // Behaviour                                                                                                     // 287
    confirmPassword: true,                                                                                           // 288
    defaultState: "signIn",                                                                                          // 289
    enablePasswordChange: false,                                                                                     // 290
    forbidClientAccountCreation: false,                                                                              // 291
    lowercaseUsername: false,                                                                                        // 292
    overrideLoginErrors: true,                                                                                       // 293
    sendVerificationEmail: false,                                                                                    // 294
    socialLoginStyle: "popup",                                                                                       // 295
                                                                                                                     // 296
    // Client-side Validation                                                                                        // 297
    //continuousValidation: false,                                                                                   // 298
    //negativeFeedback: false,                                                                                       // 299
    //negativeValidation: false,                                                                                     // 300
    //positiveValidation: false,                                                                                     // 301
    //positiveFeedback: false,                                                                                       // 302
    //showValidating: false,                                                                                         // 303
                                                                                                                     // 304
    // Privacy Policy and Terms of Use                                                                               // 305
    privacyUrl: undefined,                                                                                           // 306
    termsUrl: undefined,                                                                                             // 307
                                                                                                                     // 308
    // Redirects                                                                                                     // 309
    homeRoutePath: "/",                                                                                              // 310
    redirectTimeout: 2000, // 2 seconds                                                                              // 311
                                                                                                                     // 312
    // Hooks                                                                                                         // 313
    onSubmitHook: undefined,                                                                                         // 314
};                                                                                                                   // 315
                                                                                                                     // 316
AT.prototype.texts = {                                                                                               // 317
    button: {                                                                                                        // 318
        changePwd: "updateYourPassword",                                                                             // 319
        //enrollAccount: "createAccount",                                                                            // 320
        enrollAccount: "signUp",                                                                                     // 321
        forgotPwd: "emailResetLink",                                                                                 // 322
        resetPwd: "setPassword",                                                                                     // 323
        signIn: "signIn",                                                                                            // 324
        signUp: "signUp",                                                                                            // 325
        resendVerificationEmail: "Send email again",                                                                 // 326
    },                                                                                                               // 327
    errors: {                                                                                                        // 328
        accountsCreationDisabled: "Client side accounts creation is disabled!!!",                                    // 329
        cannotRemoveService: "Cannot remove the only active service!",                                               // 330
        captchaVerification: "Captcha verification failed!",                                                         // 331
        loginForbidden: "error.accounts.Login forbidden",                                                            // 332
        mustBeLoggedIn: "error.accounts.Must be logged in",                                                          // 333
        pwdMismatch: "error.pwdsDontMatch",                                                                          // 334
        validationErrors: "Validation Errors",                                                                       // 335
        verifyEmailFirst: "Please verify your email first. Check the email and follow the link!",                    // 336
    },                                                                                                               // 337
    navSignIn: 'signIn',                                                                                             // 338
    navSignOut: 'signOut',                                                                                           // 339
    info: {                                                                                                          // 340
        emailSent: "info.emailSent",                                                                                 // 341
        emailVerified: "info.emailVerified",                                                                         // 342
        pwdChanged: "info.passwordChanged",                                                                          // 343
        pwdReset: "info.passwordReset",                                                                              // 344
        pwdSet: "Password Set",                                                                                      // 345
        signUpVerifyEmail: "Successful Registration! Please check your email and follow the instructions.",          // 346
        verificationEmailSent: "A new email has been sent to you. If the email doesn't show up in your inbox, be sure to check your spam folder.",
    },                                                                                                               // 348
    inputIcons: {                                                                                                    // 349
        isValidating: "fa fa-spinner fa-spin",                                                                       // 350
        hasSuccess: "fa fa-check",                                                                                   // 351
        hasError: "fa fa-times",                                                                                     // 352
    },                                                                                                               // 353
    maxAllowedLength: "Maximum allowed length",                                                                      // 354
    minRequiredLength: "Minimum required length",                                                                    // 355
    optionalField: "optional",                                                                                       // 356
    pwdLink_pre: "",                                                                                                 // 357
    pwdLink_link: "forgotPassword",                                                                                  // 358
    pwdLink_suff: "",                                                                                                // 359
    requiredField: "Required Field",                                                                                 // 360
    resendVerificationEmailLink_pre: "Verification email lost?",                                                     // 361
    resendVerificationEmailLink_link: "Send again",                                                                  // 362
    resendVerificationEmailLink_suff: "",                                                                            // 363
    sep: "OR",                                                                                                       // 364
    signInLink_pre: "ifYouAlreadyHaveAnAccount",                                                                     // 365
    signInLink_link: "signin",                                                                                       // 366
    signInLink_suff: "",                                                                                             // 367
    signUpLink_pre: "dontHaveAnAccount",                                                                             // 368
    signUpLink_link: "signUp",                                                                                       // 369
    signUpLink_suff: "",                                                                                             // 370
    socialAdd: "add",                                                                                                // 371
    socialConfigure: "configure",                                                                                    // 372
    socialIcons: {                                                                                                   // 373
        "meteor-developer": "fa fa-rocket"                                                                           // 374
    },                                                                                                               // 375
    socialRemove: "remove",                                                                                          // 376
    socialSignIn: "signIn",                                                                                          // 377
    socialSignUp: "signUp",                                                                                          // 378
    socialWith: "with",                                                                                              // 379
    termsPreamble: "clickAgree",                                                                                     // 380
    termsPrivacy: "privacyPolicy",                                                                                   // 381
    termsAnd: "and",                                                                                                 // 382
    termsTerms: "terms",                                                                                             // 383
    title: {                                                                                                         // 384
        changePwd: "changePassword",                                                                                 // 385
        enrollAccount: "createAccount",                                                                              // 386
        forgotPwd: "resetYourPassword",                                                                              // 387
        resetPwd: "resetYourPassword",                                                                               // 388
        signIn: "signIn",                                                                                            // 389
        signUp: "createAccount",                                                                                     // 390
        verifyEmail: "",                                                                                             // 391
        resendVerificationEmail: "Send the verification email again",                                                // 392
    },                                                                                                               // 393
};                                                                                                                   // 394
                                                                                                                     // 395
AT.prototype.SPECIAL_FIELDS = [                                                                                      // 396
    "password_again",                                                                                                // 397
    "username_and_email",                                                                                            // 398
];                                                                                                                   // 399
                                                                                                                     // 400
// SignIn / SignUp fields                                                                                            // 401
AT.prototype._fields = [                                                                                             // 402
    new Field({                                                                                                      // 403
        _id: "email",                                                                                                // 404
        type: "email",                                                                                               // 405
        required: true,                                                                                              // 406
        lowercase: true,                                                                                             // 407
        trim: true,                                                                                                  // 408
        func: function(email){                                                                                       // 409
            return !_.contains(email, '@');                                                                          // 410
        },                                                                                                           // 411
        errStr: 'Invalid email',                                                                                     // 412
    }),                                                                                                              // 413
    new Field({                                                                                                      // 414
        _id: "password",                                                                                             // 415
        type: "password",                                                                                            // 416
        required: true,                                                                                              // 417
        minLength: 6,                                                                                                // 418
        displayName: {                                                                                               // 419
            "default": "password",                                                                                   // 420
            changePwd: "newPassword",                                                                                // 421
            resetPwd: "newPassword",                                                                                 // 422
        },                                                                                                           // 423
        placeholder: {                                                                                               // 424
            "default": "password",                                                                                   // 425
            changePwd: "newPassword",                                                                                // 426
            resetPwd: "newPassword",                                                                                 // 427
        },                                                                                                           // 428
    }),                                                                                                              // 429
];                                                                                                                   // 430
                                                                                                                     // 431
// Configured routes                                                                                                 // 432
AT.prototype.routes = {};                                                                                            // 433
                                                                                                                     // 434
AT.prototype._initialized = false;                                                                                   // 435
                                                                                                                     // 436
// Input type validation                                                                                             // 437
AT.prototype._isValidInputType = function(value) {                                                                   // 438
    return _.indexOf(this.INPUT_TYPES, value) !== -1;                                                                // 439
};                                                                                                                   // 440
                                                                                                                     // 441
AT.prototype.addField = function(field) {                                                                            // 442
    // Fields can be added only before initialization                                                                // 443
    if (this._initialized)                                                                                           // 444
        throw new Error("AccountsTemplates.addField should strictly be called before AccountsTemplates.init!");      // 445
    field = _.pick(field, _.keys(FIELD_PAT));                                                                        // 446
    check(field, FIELD_PAT);                                                                                         // 447
    // Checks there"s currently no field called field._id                                                            // 448
    if (_.indexOf(_.pluck(this._fields, "_id"), field._id) !== -1)                                                   // 449
        throw new Error("A field called " + field._id + " already exists!");                                         // 450
    // Validates field.type                                                                                          // 451
    if (!this._isValidInputType(field.type))                                                                         // 452
        throw new Error("field.type is not valid!");                                                                 // 453
    // Checks field.minLength is strictly positive                                                                   // 454
    if (typeof field.minLength !== "undefined" && field.minLength <= 0)                                              // 455
        throw new Error("field.minLength should be greater than zero!");                                             // 456
    // Checks field.maxLength is strictly positive                                                                   // 457
    if (typeof field.maxLength !== "undefined" && field.maxLength <= 0)                                              // 458
        throw new Error("field.maxLength should be greater than zero!");                                             // 459
    // Checks field.maxLength is greater than field.minLength                                                        // 460
    if (typeof field.minLength !== "undefined" && typeof field.minLength !== "undefined" && field.maxLength < field.minLength)
        throw new Error("field.maxLength should be greater than field.maxLength!");                                  // 462
                                                                                                                     // 463
    if (!(Meteor.isServer && _.contains(this.SPECIAL_FIELDS, field._id)))                                            // 464
        this._fields.push(new Field(field));                                                                         // 465
    return this._fields;                                                                                             // 466
};                                                                                                                   // 467
                                                                                                                     // 468
AT.prototype.addFields = function(fields) {                                                                          // 469
    var ok;                                                                                                          // 470
    try { // don"t bother with `typeof` - just access `length` and `catch`                                           // 471
        ok = fields.length > 0 && "0" in Object(fields);                                                             // 472
    } catch (e) {                                                                                                    // 473
        throw new Error("field argument should be an array of valid field objects!");                                // 474
    }                                                                                                                // 475
    if (ok) {                                                                                                        // 476
        _.map(fields, function(field){                                                                               // 477
            this.addField(field);                                                                                    // 478
        }, this);                                                                                                    // 479
    } else                                                                                                           // 480
        throw new Error("field argument should be an array of valid field objects!");                                // 481
    return this._fields;                                                                                             // 482
};                                                                                                                   // 483
                                                                                                                     // 484
AT.prototype.configure = function(config) {                                                                          // 485
    // Configuration options can be set only before initialization                                                   // 486
    if (this._initialized)                                                                                           // 487
        throw new Error("Configuration options must be set before AccountsTemplates.init!");                         // 488
                                                                                                                     // 489
    // Updates the current configuration                                                                             // 490
    check(config, CONFIG_PAT);                                                                                       // 491
    var options = _.omit(config, "texts", "reCaptcha");                                                              // 492
    this.options = _.defaults(options, this.options);                                                                // 493
                                                                                                                     // 494
    // Possibly sets up reCaptcha options                                                                            // 495
    var reCaptcha = config.reCaptcha;                                                                                // 496
    if (reCaptcha) {                                                                                                 // 497
        // Updates the current button object                                                                         // 498
        this.options.reCaptcha = _.defaults(reCaptcha, this.options.reCaptcha || {});                                // 499
    }                                                                                                                // 500
                                                                                                                     // 501
    // Possibly sets up texts...                                                                                     // 502
    if (config.texts){                                                                                               // 503
        var texts = config.texts;                                                                                    // 504
        var simpleTexts = _.omit(texts, "button", "errors", "info", "inputIcons", "socialIcons", "title");           // 505
        this.texts = _.defaults(simpleTexts, this.texts);                                                            // 506
                                                                                                                     // 507
        if (texts.button) {                                                                                          // 508
            // Updates the current button object                                                                     // 509
            this.texts.button = _.defaults(texts.button, this.texts.button);                                         // 510
        }                                                                                                            // 511
        if (texts.errors) {                                                                                          // 512
            // Updates the current errors object                                                                     // 513
            this.texts.errors = _.defaults(texts.errors, this.texts.errors);                                         // 514
        }                                                                                                            // 515
        if (texts.info) {                                                                                            // 516
            // Updates the current info object                                                                       // 517
            this.texts.info = _.defaults(texts.info, this.texts.info);                                               // 518
        }                                                                                                            // 519
        if (texts.inputIcons) {                                                                                      // 520
            // Updates the current inputIcons object                                                                 // 521
            this.texts.inputIcons = _.defaults(texts.inputIcons, this.texts.inputIcons);                             // 522
        }                                                                                                            // 523
        if (texts.socialIcons) {                                                                                     // 524
            // Updates the current socialIcons object                                                                // 525
            this.texts.socialIcons = _.defaults(texts.socialIcons, this.texts.socialIcons);                          // 526
        }                                                                                                            // 527
        if (texts.title) {                                                                                           // 528
            // Updates the current title object                                                                      // 529
            this.texts.title = _.defaults(texts.title, this.texts.title);                                            // 530
        }                                                                                                            // 531
    }                                                                                                                // 532
};                                                                                                                   // 533
                                                                                                                     // 534
AT.prototype.configureRoute = function(route, options) {                                                             // 535
    check(route, String);                                                                                            // 536
    check(options, Match.OneOf(undefined, Match.ObjectIncluding(ROUTE_PAT)));                                        // 537
    options = _.clone(options);                                                                                      // 538
    // Route Configuration can be done only before initialization                                                    // 539
    if (this._initialized)                                                                                           // 540
        throw new Error("Route Configuration can be done only before AccountsTemplates.init!");                      // 541
    // Only allowed routes can be configured                                                                         // 542
    if (!(route in this.ROUTE_DEFAULT))                                                                              // 543
        throw new Error("Unknown Route!");                                                                           // 544
                                                                                                                     // 545
    // Possibly adds a initial / to the provided path                                                                // 546
    if (options && options.path && options.path[0] !== "/")                                                          // 547
        options.path = "/" + options.path;                                                                           // 548
    // Updates the current configuration                                                                             // 549
    options = _.defaults(options || {}, this.ROUTE_DEFAULT[route]);                                                  // 550
    this.routes[route] = options;                                                                                    // 551
};                                                                                                                   // 552
                                                                                                                     // 553
AT.prototype.hasField = function(fieldId) {                                                                          // 554
    return !!this.getField(fieldId);                                                                                 // 555
};                                                                                                                   // 556
                                                                                                                     // 557
AT.prototype.getField = function(fieldId) {                                                                          // 558
    var field = _.filter(this._fields, function(field){                                                              // 559
        return field._id == fieldId;                                                                                 // 560
    });                                                                                                              // 561
    return (field.length === 1) ? field[0] : undefined;                                                              // 562
};                                                                                                                   // 563
                                                                                                                     // 564
AT.prototype.getFields = function() {                                                                                // 565
    return this._fields;                                                                                             // 566
};                                                                                                                   // 567
                                                                                                                     // 568
AT.prototype.getFieldIds = function() {                                                                              // 569
    return _.pluck(this._fields, "_id");                                                                             // 570
};                                                                                                                   // 571
                                                                                                                     // 572
AT.prototype.getRouteName = function(route) {                                                                        // 573
    if (route in this.routes)                                                                                        // 574
        return this.routes[route].name;                                                                              // 575
    return null;                                                                                                     // 576
};                                                                                                                   // 577
                                                                                                                     // 578
AT.prototype.getRoutePath = function(route) {                                                                        // 579
    if (route in this.routes)                                                                                        // 580
        return this.routes[route].path;                                                                              // 581
    return "#";                                                                                                      // 582
};                                                                                                                   // 583
                                                                                                                     // 584
AT.prototype.oauthServices = function(){                                                                             // 585
    // Extracts names of available services                                                                          // 586
    var names;                                                                                                       // 587
    if (Meteor.isServer)                                                                                             // 588
        names = (Accounts.oauth && Accounts.oauth.serviceNames()) || [];                                             // 589
    else                                                                                                             // 590
        names = (Accounts.oauth && Accounts.loginServicesConfigured() && Accounts.oauth.serviceNames()) || [];       // 591
    // Extracts names of configured services                                                                         // 592
    var configuredServices = [];                                                                                     // 593
    if (Accounts.loginServiceConfiguration)                                                                          // 594
        configuredServices = _.pluck(Accounts.loginServiceConfiguration.find().fetch(), "service");                  // 595
                                                                                                                     // 596
    // Builds a list of objects containing service name as _id and its configuration status                          // 597
    var services = _.map(names, function(name){                                                                      // 598
        return {                                                                                                     // 599
            _id : name,                                                                                              // 600
            configured: _.contains(configuredServices, name),                                                        // 601
        };                                                                                                           // 602
    });                                                                                                              // 603
                                                                                                                     // 604
    // Checks whether there is a UI to configure services...                                                         // 605
    // XXX: this only works with the accounts-ui package                                                             // 606
    var showUnconfigured = typeof Accounts._loginButtonsSession !== "undefined";                                     // 607
                                                                                                                     // 608
    // Filters out unconfigured services in case they"re not to be displayed                                         // 609
    if (!showUnconfigured){                                                                                          // 610
        services = _.filter(services, function(service){                                                             // 611
            return service.configured;                                                                               // 612
        });                                                                                                          // 613
    }                                                                                                                // 614
                                                                                                                     // 615
    // Sorts services by name                                                                                        // 616
    services = _.sortBy(services, function(service){                                                                 // 617
        return service._id;                                                                                          // 618
    });                                                                                                              // 619
                                                                                                                     // 620
    return services;                                                                                                 // 621
};                                                                                                                   // 622
                                                                                                                     // 623
AT.prototype.removeField = function(fieldId) {                                                                       // 624
    // Fields can be removed only before initialization                                                              // 625
    if (this._initialized)                                                                                           // 626
        throw new Error("AccountsTemplates.removeField should strictly be called before AccountsTemplates.init!");   // 627
    // Tries to look up the field with given _id                                                                     // 628
    var index = _.indexOf(_.pluck(this._fields, "_id"), fieldId);                                                    // 629
    if (index !== -1)                                                                                                // 630
        return this._fields.splice(index, 1)[0];                                                                     // 631
    else                                                                                                             // 632
        if (!(Meteor.isServer && _.contains(this.SPECIAL_FIELDS, fieldId)))                                          // 633
            throw new Error("A field called " + fieldId + " does not exist!");                                       // 634
};                                                                                                                   // 635
                                                                                                                     // 636
AT.prototype.setupRoutes = function() {                                                                              // 637
    if (Meteor.isServer){                                                                                            // 638
        // Possibly prints a warning in case showForgotPasswordLink is set to true but the route is not configured   // 639
        // if (AccountsTemplates.options.showForgotPasswordLink && !("forgotPwd" in  AccountsTemplates.routes))      // 640
        //    console.warn("[AccountsTemplates] WARNING: showForgotPasswordLink set to true, but forgotPwd route is not configured!");
        // Configures "reset password" email link                                                                    // 642
        if ("resetPwd" in AccountsTemplates.routes){                                                                 // 643
            var resetPwdPath = AccountsTemplates.routes["resetPwd"].path.substr(1);                                  // 644
            Accounts.urls.resetPassword = function(token){                                                           // 645
                return Meteor.absoluteUrl(resetPwdPath + "/" + token);                                               // 646
            };                                                                                                       // 647
        }                                                                                                            // 648
        // Configures "enroll account" email link                                                                    // 649
        if ("enrollAccount" in AccountsTemplates.routes){                                                            // 650
            var enrollAccountPath = AccountsTemplates.routes["enrollAccount"].path.substr(1);                        // 651
            Accounts.urls.enrollAccount = function(token){                                                           // 652
                return Meteor.absoluteUrl(enrollAccountPath + "/" + token);                                          // 653
            };                                                                                                       // 654
        }                                                                                                            // 655
        // Configures "verify email" email link                                                                      // 656
        if ("verifyEmail" in AccountsTemplates.routes){                                                              // 657
            var verifyEmailPath = AccountsTemplates.routes["verifyEmail"].path.substr(1);                            // 658
            Accounts.urls.verifyEmail = function(token){                                                             // 659
                return Meteor.absoluteUrl(verifyEmailPath + "/" + token);                                            // 660
            };                                                                                                       // 661
        }                                                                                                            // 662
    }                                                                                                                // 663
                                                                                                                     // 664
    // Determines the default layout to be used in case no specific one is specified for single routes               // 665
    var defaultLayout = AccountsTemplates.options.defaultLayout || Router.options.layoutTemplate;                    // 666
                                                                                                                     // 667
    _.each(AccountsTemplates.routes, function(options, route){                                                       // 668
        if (route === "ensureSignedIn")                                                                              // 669
            return;                                                                                                  // 670
        if (route === "changePwd" && !AccountsTemplates.options.enablePasswordChange)                                // 671
            throw new Error("changePwd route configured but enablePasswordChange set to false!");                    // 672
        if (route === "forgotPwd" && !AccountsTemplates.options.showForgotPasswordLink)                              // 673
            throw new Error("forgotPwd route configured but showForgotPasswordLink set to false!");                  // 674
        if (route === "signUp" && AccountsTemplates.options.forbidClientAccountCreation)                             // 675
            throw new Error("signUp route configured but forbidClientAccountCreation set to true!");                 // 676
        // Possibly prints a warning in case the MAIL_URL environment variable was not set                           // 677
        //if (Meteor.isServer && route === "forgotPwd" && (!process.env.MAIL_URL || ! Package["email"])){            // 678
        //    console.warn("[AccountsTemplates] WARNING: showForgotPasswordLink set to true, but MAIL_URL is not configured!");
        //}                                                                                                          // 680
                                                                                                                     // 681
        var name = options.name; // Default provided...                                                              // 682
        var path = options.path; // Default provided...                                                              // 683
        var template = options.template || "fullPageAtForm";                                                         // 684
        var layoutTemplate = options.layoutTemplate || defaultLayout;                                                // 685
        var additionalOptions = _.omit(options, [                                                                    // 686
          "layoutTemplate", "name", "path", "redirect", "template"                                                   // 687
        ]);                                                                                                          // 688
                                                                                                                     // 689
        // Possibly adds token parameter                                                                             // 690
        if (_.contains(["enrollAccount", "resetPwd", "verifyEmail"], route)){                                        // 691
            path += "/:paramToken";                                                                                  // 692
            if (route === "verifyEmail")                                                                             // 693
                Router.route(path, _.extend(additionalOptions, {                                                     // 694
                    name: name,                                                                                      // 695
                    template: template,                                                                              // 696
                    layoutTemplate: layoutTemplate,                                                                  // 697
                    onRun: function() {                                                                              // 698
                        AccountsTemplates.setState(route);                                                           // 699
                        AccountsTemplates.setDisabled(true);                                                         // 700
                        var token = this.params.paramToken;                                                          // 701
                        Accounts.verifyEmail(token, function(error){                                                 // 702
                            AccountsTemplates.setDisabled(false);                                                    // 703
                            AccountsTemplates.submitCallback(error, route, function(){                               // 704
                                AccountsTemplates.state.form.set("result", AccountsTemplates.texts.info.emailVerified);
                            });                                                                                      // 706
                        });                                                                                          // 707
                                                                                                                     // 708
                        this.next();                                                                                 // 709
                    },                                                                                               // 710
                    onStop: function() {                                                                             // 711
                        AccountsTemplates.clearState();                                                              // 712
                    },                                                                                               // 713
                }));                                                                                                 // 714
            else                                                                                                     // 715
                Router.route(path, _.extend(additionalOptions, {                                                     // 716
                    name: name,                                                                                      // 717
                    template: template,                                                                              // 718
                    layoutTemplate: layoutTemplate,                                                                  // 719
                    onBeforeAction: function() {                                                                     // 720
                        AccountsTemplates.paramToken = this.params.paramToken;                                       // 721
                        AccountsTemplates.setState(route);                                                           // 722
                        this.next();                                                                                 // 723
                    },                                                                                               // 724
                    onStop: function() {                                                                             // 725
                        AccountsTemplates.clearState();                                                              // 726
                        AccountsTemplates.paramToken = null;                                                         // 727
                    }                                                                                                // 728
                }));                                                                                                 // 729
        }                                                                                                            // 730
        else                                                                                                         // 731
            Router.route(path, _.extend(additionalOptions, {                                                         // 732
                name: name,                                                                                          // 733
                template: template,                                                                                  // 734
                layoutTemplate: layoutTemplate,                                                                      // 735
                onBeforeAction: function() {                                                                         // 736
                    var redirect = false;                                                                            // 737
                    if (route === 'changePwd') {                                                                     // 738
                      if (!Meteor.loggingIn() && !Meteor.userId()) {                                                 // 739
                        redirect = true;                                                                             // 740
                      }                                                                                              // 741
                    }                                                                                                // 742
                    else if (Meteor.userId()) {                                                                      // 743
                        redirect = true;                                                                             // 744
                    }                                                                                                // 745
                    if (redirect) {                                                                                  // 746
                        AccountsTemplates.postSubmitRedirect(route);                                                 // 747
                        this.stop();                                                                                 // 748
                    }                                                                                                // 749
                    else {                                                                                           // 750
                        AccountsTemplates.setState(route);                                                           // 751
                        this.next();                                                                                 // 752
                    }                                                                                                // 753
                },                                                                                                   // 754
                onStop: function() {                                                                                 // 755
                    AccountsTemplates.clearState();                                                                  // 756
                }                                                                                                    // 757
            }));                                                                                                     // 758
    });                                                                                                              // 759
};                                                                                                                   // 760
                                                                                                                     // 761
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/useraccounts:core/lib/client.js                                                                          //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
// Allowed Internal (client-side) States                                                                             // 1
AT.prototype.STATES = [                                                                                              // 2
    "changePwd", // Change Password                                                                                  // 3
    "enrollAccount", // Account Enrollment                                                                           // 4
    "forgotPwd", // Forgot Password                                                                                  // 5
    "hide", // Nothing displayed                                                                                     // 6
    "resetPwd", // Reset Password                                                                                    // 7
    "signIn", // Sign In                                                                                             // 8
    "signUp", // Sign Up                                                                                             // 9
    "verifyEmail", // Email verification                                                                             // 10
    "resendVerificationEmail", // Resend verification email                                                          // 11
];                                                                                                                   // 12
                                                                                                                     // 13
AT.prototype._loginType = "";                                                                                        // 14
                                                                                                                     // 15
// Previous path used for redirect after form submit                                                                 // 16
AT.prototype._prevPath = null;                                                                                       // 17
                                                                                                                     // 18
// Flag telling whether the whole form should appear disabled                                                        // 19
AT.prototype._disabled = false;                                                                                      // 20
                                                                                                                     // 21
// Flag used to avoid redirecting to previous route when signing in/up                                               // 22
// as a results of a call to ensureSignedIn                                                                          // 23
AT.prototype.avoidRedirect = false;                                                                                  // 24
                                                                                                                     // 25
// Possibly keeps reference to the handle for the timed out redirect set on some routes                              // 26
AT.prototype.timedOutRedirect = null;                                                                                // 27
                                                                                                                     // 28
// Known routes used to filter out previous path for redirects...                                                    // 29
AT.prototype.knownRoutes = [];                                                                                       // 30
                                                                                                                     // 31
// Token provided for routes like reset-password and enroll-account                                                  // 32
AT.prototype.paramToken = null;                                                                                      // 33
                                                                                                                     // 34
// Current Internal (client-side) State (to be among allowed ones, see STATES)                                       // 35
//AT.prototype.state = "signIn";                                                                                     // 36
                                                                                                                     // 37
// State validation                                                                                                  // 38
AT.prototype._isValidState = function(value) {                                                                       // 39
    return _.contains(this.STATES, value);                                                                           // 40
};                                                                                                                   // 41
                                                                                                                     // 42
AT.prototype.loginType = function () {                                                                               // 43
    return this._loginType;                                                                                          // 44
};                                                                                                                   // 45
                                                                                                                     // 46
// Getter for previous route"s path                                                                                  // 47
AT.prototype.getPrevPath = function() {                                                                              // 48
    return this._prevPath;                                                                                           // 49
};                                                                                                                   // 50
                                                                                                                     // 51
// Setter for previous route"s path                                                                                  // 52
AT.prototype.setPrevPath = function(newPath) {                                                                       // 53
    check(newPath, String);                                                                                          // 54
    this._prevPath = newPath;                                                                                        // 55
};                                                                                                                   // 56
                                                                                                                     // 57
// Getter for current state                                                                                          // 58
AT.prototype.getState = function() {                                                                                 // 59
    return this.state.form.get("state");                                                                             // 60
};                                                                                                                   // 61
                                                                                                                     // 62
// Getter for disabled state                                                                                         // 63
AT.prototype.disabled = function() {                                                                                 // 64
    return this.state.form.equals("disabled", true) ? "disabled" : undefined;                                        // 65
};                                                                                                                   // 66
                                                                                                                     // 67
// Setter for disabled state                                                                                         // 68
AT.prototype.setDisabled = function(value) {                                                                         // 69
    check(value, Boolean);                                                                                           // 70
    return this.state.form.set("disabled", value);                                                                   // 71
};                                                                                                                   // 72
                                                                                                                     // 73
// Setter for current state                                                                                          // 74
AT.prototype.setState = function(state, callback) {                                                                  // 75
    check(state, String);                                                                                            // 76
    if (!this._isValidState(state))                                                                                  // 77
        throw new Meteor.Error(500, "Internal server error", "accounts-templates-core package got an invalid state value!");
    this.state.form.set("state", state);                                                                             // 79
    this.clearState();                                                                                               // 80
    if (_.isFunction(callback))                                                                                      // 81
        callback();                                                                                                  // 82
};                                                                                                                   // 83
                                                                                                                     // 84
AT.prototype.clearState = function() {                                                                               // 85
    _.each(this._fields, function(field){                                                                            // 86
        field.clearStatus();                                                                                         // 87
    });                                                                                                              // 88
    var form = this.state.form;                                                                                      // 89
    form.set("error", null);                                                                                         // 90
    form.set("result", null);                                                                                        // 91
    form.set("message", null);                                                                                       // 92
                                                                                                                     // 93
    AccountsTemplates.setDisabled(false);                                                                            // 94
                                                                                                                     // 95
    // Possibly clears timed out redirects                                                                           // 96
    if (AccountsTemplates.timedOutRedirect !== null) {                                                               // 97
        Meteor.clearTimeout(AccountsTemplates.timedOutRedirect);                                                     // 98
        AccountsTemplates.timedOutRedirect = null;                                                                   // 99
    }                                                                                                                // 100
};                                                                                                                   // 101
                                                                                                                     // 102
AT.prototype.clearError = function() {                                                                               // 103
    form.set("error", null);                                                                                         // 104
};                                                                                                                   // 105
                                                                                                                     // 106
AT.prototype.clearResult = function() {                                                                              // 107
    form.set("result", null);                                                                                        // 108
};                                                                                                                   // 109
                                                                                                                     // 110
AT.prototype.clearMessage = function() {                                                                             // 111
    form.set("message", null);                                                                                       // 112
};                                                                                                                   // 113
                                                                                                                     // 114
var ensureSignedIn = function() {                                                                                    // 115
  if (!Meteor.userId()) {                                                                                            // 116
      Tracker.nonreactive(function () {                                                                              // 117
        AccountsTemplates.setPrevPath(Router.current().url);                                                         // 118
      });                                                                                                            // 119
      AccountsTemplates.setState(AccountsTemplates.options.defaultState, function(){                                 // 120
          var err = AccountsTemplates.texts.errors.mustBeLoggedIn;                                                   // 121
          AccountsTemplates.state.form.set("error", [err]);                                                          // 122
      });                                                                                                            // 123
      AccountsTemplates.avoidRedirect = true;                                                                        // 124
      // render the login template but keep the url in the browser the same                                          // 125
                                                                                                                     // 126
      var options = AccountsTemplates.routes["ensureSignedIn"];                                                      // 127
                                                                                                                     // 128
      // Determines the template to be rendered in case no specific one was configured for ensureSignedIn            // 129
      var signInRouteTemplate = AccountsTemplates.routes.signIn && AccountsTemplates.routes.signIn.template;         // 130
      var template = (options && options.template) || signInRouteTemplate || "fullPageAtForm";                       // 131
                                                                                                                     // 132
      // Determines the layout to be used in case no specific one was configured for ensureSignedIn                  // 133
      var defaultLayout = AccountsTemplates.options.defaultLayout || Router.options.layoutTemplate;                  // 134
      var layoutTemplate = (options && options.layoutTemplate) || defaultLayout;                                     // 135
                                                                                                                     // 136
      this.layout(layoutTemplate);                                                                                   // 137
      this.render(template);                                                                                         // 138
      this.renderRegions();                                                                                          // 139
  } else {                                                                                                           // 140
      AccountsTemplates.clearError();                                                                                // 141
      this.next();                                                                                                   // 142
  }                                                                                                                  // 143
};                                                                                                                   // 144
                                                                                                                     // 145
AT.prototype.ensureSignedIn = function() {                                                                           // 146
  console.warn(                                                                                                      // 147
    "[UserAccounts] AccountsTemplates.ensureSignedIn will be deprecated soon, please use the plugin version\n" +     // 148
    "               see https://github.com/meteor-useraccounts/core/blob/master/Guide.md#content-protection"         // 149
  );                                                                                                                 // 150
  ensureSignedIn.call(this);                                                                                         // 151
};                                                                                                                   // 152
                                                                                                                     // 153
                                                                                                                     // 154
Iron.Router.plugins.ensureSignedIn = function (router, options) {                                                    // 155
  // this loading plugin just creates an onBeforeAction hook                                                         // 156
  router.onRun(function(){                                                                                           // 157
    if (Meteor.loggingIn()) {                                                                                        // 158
        this.renderRegions();                                                                                        // 159
    } else {                                                                                                         // 160
        this.next();                                                                                                 // 161
    }                                                                                                                // 162
  }, options);                                                                                                       // 163
                                                                                                                     // 164
  router.onBeforeAction(                                                                                             // 165
    ensureSignedIn,                                                                                                  // 166
    options                                                                                                          // 167
  );                                                                                                                 // 168
                                                                                                                     // 169
  router.onStop(function(){                                                                                          // 170
    AccountsTemplates.clearError();                                                                                  // 171
  });                                                                                                                // 172
};                                                                                                                   // 173
                                                                                                                     // 174
                                                                                                                     // 175
// Initialization                                                                                                    // 176
AT.prototype.init = function() {                                                                                     // 177
    console.warn("[AccountsTemplates] There is no more need to call AccountsTemplates.init()! Simply remove the call ;-)");
};                                                                                                                   // 179
                                                                                                                     // 180
AT.prototype._init = function() {                                                                                    // 181
    if (this._initialized)                                                                                           // 182
        return;                                                                                                      // 183
                                                                                                                     // 184
    var usernamePresent = this.hasField("username");                                                                 // 185
    var emailPresent = this.hasField("email");                                                                       // 186
    if (usernamePresent && emailPresent){                                                                            // 187
        this._loginType = "username_and_email";                                                                      // 188
    }                                                                                                                // 189
    else{                                                                                                            // 190
        if (usernamePresent)                                                                                         // 191
            this._loginType = "username";                                                                            // 192
        else                                                                                                         // 193
            this._loginType = "email";                                                                               // 194
    }                                                                                                                // 195
                                                                                                                     // 196
    if (this._loginType === "username_and_email"){                                                                   // 197
        // Possibly adds the field username_and_email in case                                                        // 198
        // it was not configured                                                                                     // 199
        if (!this.hasField("username_and_email"))                                                                    // 200
            this.addField({                                                                                          // 201
                _id: "username_and_email",                                                                           // 202
                type: "text",                                                                                        // 203
                displayName: "usernameOrEmail",                                                                      // 204
                placeholder: "usernameOrEmail",                                                                      // 205
                required: true,                                                                                      // 206
            });                                                                                                      // 207
    }                                                                                                                // 208
                                                                                                                     // 209
    // Only in case password confirmation is required                                                                // 210
    if (this.options.confirmPassword){                                                                               // 211
        // Possibly adds the field password_again in case                                                            // 212
        // it was not configured                                                                                     // 213
        if (!this.hasField("password_again")){                                                                       // 214
            var pwdAgain = _.clone(this.getField("password"));                                                       // 215
            pwdAgain._id = "password_again";                                                                         // 216
            pwdAgain.displayName = {                                                                                 // 217
                "default": "passwordAgain",                                                                          // 218
                changePwd: "newPasswordAgain",                                                                       // 219
                resetPwd: "newPasswordAgain",                                                                        // 220
            };                                                                                                       // 221
            pwdAgain.placeholder = {                                                                                 // 222
                "default": "passwordAgain",                                                                          // 223
                changePwd: "newPasswordAgain",                                                                       // 224
                resetPwd: "newPasswordAgain",                                                                        // 225
            };                                                                                                       // 226
            this.addField(pwdAgain);                                                                                 // 227
        }                                                                                                            // 228
    }                                                                                                                // 229
    else{                                                                                                            // 230
        if (this.hasField("password_again"))                                                                         // 231
            throw new Error("AccountsTemplates: a field password_again was added but confirmPassword is set to false!");
    }                                                                                                                // 233
                                                                                                                     // 234
    // Possibly adds the field current_password in case                                                              // 235
    // it was not configured                                                                                         // 236
    if (this.options.enablePasswordChange){                                                                          // 237
        if (!this.hasField("current_password"))                                                                      // 238
            this.addField({                                                                                          // 239
                _id: "current_password",                                                                             // 240
                type: "password",                                                                                    // 241
                displayName: "currentPassword",                                                                      // 242
                placeholder: "currentPassword",                                                                      // 243
                required: true,                                                                                      // 244
            });                                                                                                      // 245
    }                                                                                                                // 246
                                                                                                                     // 247
    // Ensuser the right order of special fields                                                                     // 248
    var moveFieldAfter = function(field_name, reference_field_name) {                                                // 249
        var fieldIds = AccountsTemplates.getFieldIds();                                                              // 250
        var refFieldId = _.indexOf(fieldIds, reference_field_name);                                                  // 251
        // In case the reference field is not present, just return...                                                // 252
        if (refFieldId === -1)                                                                                       // 253
            return;                                                                                                  // 254
        var fieldId = _.indexOf(fieldIds, field_name);                                                               // 255
        // In case the sought field is not present, just return...                                                   // 256
        if (fieldId === -1)                                                                                          // 257
            return;                                                                                                  // 258
        if (fieldId !== -1 && fieldId !== (refFieldId + 1)){                                                         // 259
            // removes the field                                                                                     // 260
            var field = AccountsTemplates._fields.splice(fieldId, 1)[0];                                             // 261
            // push the field right after the reference field position                                               // 262
            var new_fieldIds = AccountsTemplates.getFieldIds();                                                      // 263
            var new_refFieldId = _.indexOf(new_fieldIds, reference_field_name);                                      // 264
            AccountsTemplates._fields.splice(new_refFieldId + 1, 0, field);                                          // 265
        }                                                                                                            // 266
    };                                                                                                               // 267
                                                                                                                     // 268
    // Ensuser the right order of special fields                                                                     // 269
    var moveFieldBefore = function(field_name, reference_field_name) {                                               // 270
        var fieldIds = AccountsTemplates.getFieldIds();                                                              // 271
        var refFieldId = _.indexOf(fieldIds, reference_field_name);                                                  // 272
        // In case the reference field is not present, just return...                                                // 273
        if (refFieldId === -1)                                                                                       // 274
            return;                                                                                                  // 275
        var fieldId = _.indexOf(fieldIds, field_name);                                                               // 276
        // In case the sought field is not present, just return...                                                   // 277
        if (fieldId === -1)                                                                                          // 278
            return;                                                                                                  // 279
        if (fieldId !== -1 && fieldId !== (refFieldId - 1)){                                                         // 280
            // removes the field                                                                                     // 281
            var field = AccountsTemplates._fields.splice(fieldId, 1)[0];                                             // 282
            // push the field right after the reference field position                                               // 283
            var new_fieldIds = AccountsTemplates.getFieldIds();                                                      // 284
            var new_refFieldId = _.indexOf(new_fieldIds, reference_field_name);                                      // 285
            AccountsTemplates._fields.splice(new_refFieldId, 0, field);                                              // 286
        }                                                                                                            // 287
    };                                                                                                               // 288
                                                                                                                     // 289
    // The final order should be something like:                                                                     // 290
    // - username                                                                                                    // 291
    // - email                                                                                                       // 292
    // - username_and_email                                                                                          // 293
    // - password                                                                                                    // 294
    // - password_again                                                                                              // 295
    //                                                                                                               // 296
    // ...so lets do it in reverse order...                                                                          // 297
    moveFieldAfter("username_and_email", "username");                                                                // 298
    moveFieldAfter("username_and_email", "email");                                                                   // 299
    moveFieldBefore("current_password", "password");                                                                 // 300
    moveFieldAfter("password", "current_password");                                                                  // 301
    moveFieldAfter("password_again", "password");                                                                    // 302
                                                                                                                     // 303
                                                                                                                     // 304
    // Sets visibility condition and validation flags for each field                                                 // 305
    var gPositiveValidation = !!AccountsTemplates.options.positiveValidation;                                        // 306
    var gNegativeValidation = !!AccountsTemplates.options.negativeValidation;                                        // 307
    var gShowValidating = !!AccountsTemplates.options.showValidating;                                                // 308
    var gContinuousValidation = !!AccountsTemplates.options.continuousValidation;                                    // 309
    var gNegativeFeedback = !!AccountsTemplates.options.negativeFeedback;                                            // 310
    var gPositiveFeedback = !!AccountsTemplates.options.positiveFeedback;                                            // 311
    _.each(this._fields, function(field){                                                                            // 312
        // Visibility                                                                                                // 313
        switch(field._id) {                                                                                          // 314
            case "current_password":                                                                                 // 315
                field.visible = ["changePwd"];                                                                       // 316
                break;                                                                                               // 317
            case "email":                                                                                            // 318
                field.visible = ["forgotPwd", "signUp", "resendVerificationEmail"];                                  // 319
                if (AccountsTemplates.loginType() === "email")                                                       // 320
                    field.visible.push("signIn");                                                                    // 321
                break;                                                                                               // 322
            case "password":                                                                                         // 323
                field.visible = ["changePwd", "enrollAccount", "resetPwd", "signIn", "signUp"];                      // 324
                break;                                                                                               // 325
            case "password_again":                                                                                   // 326
                field.visible = ["changePwd", "enrollAccount", "resetPwd", "signUp"];                                // 327
                break;                                                                                               // 328
            case "username":                                                                                         // 329
                field.visible = ["signUp"];                                                                          // 330
                if (AccountsTemplates.loginType() === "username")                                                    // 331
                    field.visible.push("signIn");                                                                    // 332
                break;                                                                                               // 333
            case "username_and_email":                                                                               // 334
                field.visible = [];                                                                                  // 335
                if (AccountsTemplates.loginType() === "username_and_email")                                          // 336
                    field.visible.push("signIn");                                                                    // 337
                break;                                                                                               // 338
            default:                                                                                                 // 339
                field.visible = ["signUp"];                                                                          // 340
        }                                                                                                            // 341
                                                                                                                     // 342
        // Validation                                                                                                // 343
        var positiveValidation = field.positiveValidation;                                                           // 344
        if (positiveValidation === undefined)                                                                        // 345
            field.positiveValidation = gPositiveValidation;                                                          // 346
        var negativeValidation = field.negativeValidation;                                                           // 347
        if (negativeValidation === undefined)                                                                        // 348
            field.negativeValidation = gNegativeValidation;                                                          // 349
        field.validation = field.positiveValidation || field.negativeValidation;                                     // 350
        if (field.continuousValidation === undefined)                                                                // 351
            field.continuousValidation = gContinuousValidation;                                                      // 352
        field.continuousValidation = field.validation && field.continuousValidation;                                 // 353
        if (field.negativeFeedback === undefined)                                                                    // 354
            field.negativeFeedback = gNegativeFeedback;                                                              // 355
        if (field.positiveFeedback === undefined)                                                                    // 356
            field.positiveFeedback = gPositiveFeedback;                                                              // 357
        field.feedback = field.negativeFeedback || field.positiveFeedback;                                           // 358
        // Validating icon                                                                                           // 359
        var showValidating = field.showValidating;                                                                   // 360
        if (showValidating === undefined)                                                                            // 361
            field.showValidating = gShowValidating;                                                                  // 362
                                                                                                                     // 363
        // Custom Template                                                                                           // 364
        if (field.template) {                                                                                        // 365
          if (field.template in Template) {                                                                          // 366
            Template[field.template].helpers(AccountsTemplates.atInputHelpers);                                      // 367
          }                                                                                                          // 368
          else {                                                                                                     // 369
            console.warn(                                                                                            // 370
              "[UserAccounts] Warning no template " + field.template + " found!"                                     // 371
            );                                                                                                       // 372
          }                                                                                                          // 373
        }                                                                                                            // 374
    });                                                                                                              // 375
                                                                                                                     // 376
    // Initializes reactive states                                                                                   // 377
    form = new ReactiveDict();                                                                                       // 378
    form.set("disabled", false);                                                                                     // 379
    form.set("state", "signIn");                                                                                     // 380
    form.set("result", null);                                                                                        // 381
    form.set("error", null);                                                                                         // 382
    form.set("message", null);                                                                                       // 383
    this.state = {                                                                                                   // 384
        form: form,                                                                                                  // 385
    };                                                                                                               // 386
                                                                                                                     // 387
    // Possibly subscribes to extended user data (to get the list of registered services...)                         // 388
    if (this.options.showAddRemoveServices){                                                                         // 389
        Meteor.subscribe("userRegisteredServices");                                                                  // 390
    }                                                                                                                // 391
                                                                                                                     // 392
    //Check that reCaptcha site keys are available and no secret keys visible                                        // 393
    if (this.options.showReCaptcha) {                                                                                // 394
        var atSiteKey = null, atSecretKey = null, settingsSiteKey = null, settingsSecretKey = null;                  // 395
                                                                                                                     // 396
                                                                                                                     // 397
        if (AccountsTemplates.options.reCaptcha) {                                                                   // 398
            atSiteKey = AccountsTemplates.options.reCaptcha.siteKey;                                                 // 399
            atSecretKey = AccountsTemplates.options.reCaptcha.secretKey;                                             // 400
        }                                                                                                            // 401
        if (Meteor.settings && Meteor.settings.public && Meteor.settings.public.reCaptcha) {                         // 402
          settingsSiteKey = Meteor.settings.public.reCaptcha.siteKey;                                                // 403
          settingsSecretKey = Meteor.settings.public.reCaptcha.secretKey;                                            // 404
        }                                                                                                            // 405
                                                                                                                     // 406
        if (atSecretKey || settingsSecretKey) {                                                                      // 407
            //erase the secret key                                                                                   // 408
            if (atSecretKey) {                                                                                       // 409
                AccountsTemplates.options.reCaptcha.secretKey = null;                                                // 410
            }                                                                                                        // 411
            if (settingsSecretKey) {                                                                                 // 412
                Meteor.settings.public.reCaptcha.secretKey = null;                                                   // 413
            }                                                                                                        // 414
                                                                                                                     // 415
            var loc = atSecretKey ? "User Accounts configuration!" : "Meteor settings!";                             // 416
            throw new Meteor.Error(401, "User Accounts: DANGER - reCaptcha private key leaked to client from " + loc // 417
            + " Provide the key in server settings ONLY.");                                                          // 418
        }                                                                                                            // 419
                                                                                                                     // 420
        if (!atSiteKey && !settingsSiteKey) {                                                                        // 421
            throw new Meteor.Error(401, "User Accounts: reCaptcha site key not found! Please provide it or set showReCaptcha to false.");
        }                                                                                                            // 423
    }                                                                                                                // 424
                                                                                                                     // 425
    // ------------                                                                                                  // 426
    // Routing Stuff                                                                                                 // 427
    // ------------                                                                                                  // 428
                                                                                                                     // 429
    // Known routes are used to filter out previous path for redirects...                                            // 430
    this.knownRoutes = _.pluck(_.values(this.routes), "path");                                                       // 431
                                                                                                                     // 432
    // Stores previous path on path change...                                                                        // 433
    Router.onStop(function() {                                                                                       // 434
        Tracker.nonreactive(function () {                                                                            // 435
            var currentPath = Router.current().url;                                                                  // 436
            var currentPathClean = currentPath.replace(/^\/+|\/+$/gm,'')                                             // 437
            var isKnownRoute = _.map(AccountsTemplates.knownRoutes, function(path){                                  // 438
              if (!path) {                                                                                           // 439
                return false;                                                                                        // 440
              }                                                                                                      // 441
              path = path.replace(/^\/+|\/+$/gm,'');                                                                 // 442
              var known = RegExp(path).test(currentPathClean)                                                        // 443
              return known;                                                                                          // 444
            });                                                                                                      // 445
            if (!_.some(isKnownRoute)) {                                                                             // 446
                AccountsTemplates.setPrevPath(currentPath);                                                          // 447
            }                                                                                                        // 448
            AccountsTemplates.avoidRedirect = false;                                                                 // 449
        });                                                                                                          // 450
    });                                                                                                              // 451
                                                                                                                     // 452
    // Sets up configured routes                                                                                     // 453
    AccountsTemplates.setupRoutes();                                                                                 // 454
                                                                                                                     // 455
    // Marks AccountsTemplates as initialized                                                                        // 456
    this._initialized = true;                                                                                        // 457
};                                                                                                                   // 458
                                                                                                                     // 459
AT.prototype.linkClick = function(route){                                                                            // 460
    if (AccountsTemplates.disabled())                                                                                // 461
        return;                                                                                                      // 462
    var path = AccountsTemplates.getRoutePath(route);                                                                // 463
    if (path === "#" || AccountsTemplates.avoidRedirect || path === Router.current().route.path())                   // 464
        AccountsTemplates.setState(route);                                                                           // 465
    else                                                                                                             // 466
        Meteor.defer(function(){                                                                                     // 467
            Router.go(AccountsTemplates.getRouteName(route));                                                        // 468
        });                                                                                                          // 469
                                                                                                                     // 470
    var firstVisibleInput = _.find(this.getFields(), function(f){                                                    // 471
      return _.contains(f.visible, route);                                                                           // 472
    });                                                                                                              // 473
    if (firstVisibleInput) {                                                                                         // 474
      $("input#at-field-" + firstVisibleInput._id).focus();                                                          // 475
    }                                                                                                                // 476
};                                                                                                                   // 477
                                                                                                                     // 478
AT.prototype.logout = function(){                                                                                    // 479
    var onLogoutHook = AccountsTemplates.options.onLogoutHook;                                                       // 480
    var homeRoutePath = AccountsTemplates.options.homeRoutePath;                                                     // 481
    Meteor.logout(function(){                                                                                        // 482
        if (onLogoutHook)                                                                                            // 483
          onLogoutHook();                                                                                            // 484
        else if (homeRoutePath)                                                                                      // 485
            Router.go(homeRoutePath);                                                                                // 486
    });                                                                                                              // 487
};                                                                                                                   // 488
                                                                                                                     // 489
AT.prototype.postSubmitRedirect = function(route){                                                                   // 490
    if (AccountsTemplates.avoidRedirect)                                                                             // 491
        AccountsTemplates.avoidRedirect = false;                                                                     // 492
    else{                                                                                                            // 493
        var nextPath = AccountsTemplates.routes[route] && AccountsTemplates.routes[route].redirect;                  // 494
        if (nextPath){                                                                                               // 495
            if (_.isFunction(nextPath))                                                                              // 496
                nextPath();                                                                                          // 497
            else                                                                                                     // 498
                Router.go(nextPath);                                                                                 // 499
        }else{                                                                                                       // 500
            var previousPath = AccountsTemplates.getPrevPath();                                                      // 501
            if (previousPath)                                                                                        // 502
                Router.go(previousPath);                                                                             // 503
            else{                                                                                                    // 504
                var homeRoutePath = AccountsTemplates.options.homeRoutePath;                                         // 505
                if (homeRoutePath)                                                                                   // 506
                    Router.go(homeRoutePath);                                                                        // 507
            }                                                                                                        // 508
        }                                                                                                            // 509
    }                                                                                                                // 510
};                                                                                                                   // 511
                                                                                                                     // 512
AT.prototype.submitCallback = function(error, state, onSuccess){                                                     // 513
                                                                                                                     // 514
    var onSubmitHook = AccountsTemplates.options.onSubmitHook;                                                       // 515
    if(onSubmitHook)                                                                                                 // 516
        onSubmitHook(error, state);                                                                                  // 517
                                                                                                                     // 518
    if (error) {                                                                                                     // 519
        if(_.isObject(error.details)) {                                                                              // 520
            // If error.details is an object, we may try to set fields errors from it                                // 521
            _.each(error.details, function(error, fieldId){                                                          // 522
                AccountsTemplates.getField(fieldId).setError(error);                                                 // 523
            });                                                                                                      // 524
        }                                                                                                            // 525
        else {                                                                                                       // 526
            var err = "error.accounts.Unknown error";                                                                // 527
            if (error.reason) {                                                                                      // 528
              err = error.reason;                                                                                    // 529
            }                                                                                                        // 530
            if (err.substring(0, 15) !== "error.accounts.") {                                                        // 531
              err = "error.accounts." + err;                                                                         // 532
            }                                                                                                        // 533
            AccountsTemplates.state.form.set("error", [err]);                                                        // 534
        }                                                                                                            // 535
        AccountsTemplates.setDisabled(false);                                                                        // 536
        // Possibly resets reCaptcha form                                                                            // 537
        if (state === "signUp" && AccountsTemplates.options.showReCaptcha) {                                         // 538
            grecaptcha.reset();                                                                                      // 539
        }                                                                                                            // 540
    }                                                                                                                // 541
    else{                                                                                                            // 542
        if (onSuccess)                                                                                               // 543
            onSuccess()                                                                                              // 544
                                                                                                                     // 545
        if (_.contains(["enrollAccount", "forgotPwd", "resetPwd", "verifyEmail"], state)){                           // 546
            var redirectTimeout = AccountsTemplates.options.redirectTimeout;                                         // 547
            if (redirectTimeout > 0)                                                                                 // 548
                AccountsTemplates.timedOutRedirect = Meteor.setTimeout(function(){                                   // 549
                    AccountsTemplates.timedOutRedirect = null;                                                       // 550
                    AccountsTemplates.setDisabled(false);                                                            // 551
                    AccountsTemplates.postSubmitRedirect(state);                                                     // 552
                }, redirectTimeout);                                                                                 // 553
        }                                                                                                            // 554
        else if (state){                                                                                             // 555
            AccountsTemplates.setDisabled(false);                                                                    // 556
            AccountsTemplates.postSubmitRedirect(state);                                                             // 557
        }                                                                                                            // 558
    }                                                                                                                // 559
};                                                                                                                   // 560
                                                                                                                     // 561
AccountsTemplates = new AT();                                                                                        // 562
                                                                                                                     // 563
                                                                                                                     // 564
// Initialization                                                                                                    // 565
Meteor.startup(function(){                                                                                           // 566
    AccountsTemplates._init();                                                                                       // 567
});                                                                                                                  // 568
                                                                                                                     // 569
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/useraccounts:core/lib/templates_helpers/at_error.js                                                      //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
AT.prototype.atErrorHelpers = {                                                                                      // 1
    singleError: function() {                                                                                        // 2
        var errors = AccountsTemplates.state.form.get("error");                                                      // 3
        return errors && errors.length === 1;                                                                        // 4
    },                                                                                                               // 5
    error: function() {                                                                                              // 6
        return AccountsTemplates.state.form.get("error");                                                            // 7
    },                                                                                                               // 8
    errorText: function(){                                                                                           // 9
        var field, err;                                                                                              // 10
        if (this.field){                                                                                             // 11
            field = T9n.get(this.field, markIfMissing=false);                                                        // 12
            err = T9n.get(this.err, markIfMissing=false);                                                            // 13
        }                                                                                                            // 14
        else                                                                                                         // 15
            err = T9n.get(this.valueOf(), markIfMissing=false);                                                      // 16
                                                                                                                     // 17
        // Possibly removes initial prefix in case the key in not found inside t9n                                   // 18
        if (err.substring(0, 15) === "error.accounts.")                                                              // 19
            err = err.substring(15);                                                                                 // 20
                                                                                                                     // 21
        if (field)                                                                                                   // 22
            return field + ": " + err;                                                                               // 23
        return err;                                                                                                  // 24
    },                                                                                                               // 25
};                                                                                                                   // 26
                                                                                                                     // 27
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/useraccounts:core/lib/templates_helpers/at_form.js                                                       //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
AT.prototype.atFormHelpers = {                                                                                       // 1
    hide: function(){                                                                                                // 2
        var state = this.state || AccountsTemplates.getState();                                                      // 3
        return state === "hide";                                                                                     // 4
    },                                                                                                               // 5
    showTitle: function(next_state){                                                                                 // 6
        var state = next_state || this.state || AccountsTemplates.getState();                                        // 7
        if (Meteor.userId() && state === "signIn")                                                                   // 8
          return false;                                                                                              // 9
        return !!AccountsTemplates.texts.title[state];                                                               // 10
    },                                                                                                               // 11
    showOauthServices: function(next_state){                                                                         // 12
        var state = next_state || this.state || AccountsTemplates.getState();                                        // 13
        if (!(state === "signIn" || state === "signUp"))                                                             // 14
            return false;                                                                                            // 15
        var services = AccountsTemplates.oauthServices();                                                            // 16
        if (!services.length)                                                                                        // 17
            return false;                                                                                            // 18
        if (Meteor.userId())                                                                                         // 19
            return AccountsTemplates.options.showAddRemoveServices;                                                  // 20
        return true;                                                                                                 // 21
    },                                                                                                               // 22
    showServicesSeparator: function(next_state){                                                                     // 23
        var pwdService = Package["accounts-password"] !== undefined;                                                 // 24
        var state = next_state || this.state || AccountsTemplates.getState();                                        // 25
        var rightState = (state === "signIn" || state === "signUp");                                                 // 26
        return rightState && !Meteor.userId() && pwdService && AccountsTemplates.oauthServices().length;             // 27
    },                                                                                                               // 28
    showError: function(next_state) {                                                                                // 29
        return !!AccountsTemplates.state.form.get("error");                                                          // 30
    },                                                                                                               // 31
    showResult: function(next_state) {                                                                               // 32
        return !!AccountsTemplates.state.form.get("result");                                                         // 33
    },                                                                                                               // 34
    showMessage: function(next_state) {                                                                              // 35
        return !!AccountsTemplates.state.form.get("message");                                                        // 36
    },                                                                                                               // 37
    showPwdForm: function(next_state) {                                                                              // 38
        if (Package["accounts-password"] === undefined)                                                              // 39
            return false;                                                                                            // 40
        var state = next_state || this.state || AccountsTemplates.getState();                                        // 41
        if ((state === "verifyEmail") || (state === "signIn" && Meteor.userId()))                                    // 42
            return false;                                                                                            // 43
        return true;                                                                                                 // 44
    },                                                                                                               // 45
    showSignInLink: function(next_state){                                                                            // 46
        if (AccountsTemplates.options.hideSignInLink)                                                                // 47
            return false;                                                                                            // 48
        var state = next_state || this.state || AccountsTemplates.getState();                                        // 49
        if (AccountsTemplates.options.forbidClientAccountCreation && state === "forgotPwd")                          // 50
            return true;                                                                                             // 51
        return state === "signUp";                                                                                   // 52
    },                                                                                                               // 53
    showSignUpLink: function(next_state){                                                                            // 54
        if  (AccountsTemplates.options.hideSignUpLink)                                                               // 55
            return false;                                                                                            // 56
        var state = next_state || this.state || AccountsTemplates.getState();                                        // 57
        return ((state === "signIn" && !Meteor.userId()) || state === "forgotPwd") && !AccountsTemplates.options.forbidClientAccountCreation;
    },                                                                                                               // 59
    showTermsLink: function(next_state){                                                                             // 60
        //TODO: Add privacyRoute and termsRoute as alternatives (the point of named routes is                        // 61
        // being able to change the url in one place only)                                                           // 62
        if (!!AccountsTemplates.options.privacyUrl || !!AccountsTemplates.options.termsUrl) {                        // 63
            var state = next_state || this.state || AccountsTemplates.getState();                                    // 64
            if (state === "signUp" || state === "enrollAccount" ) {                                                  // 65
              return true;                                                                                           // 66
            }                                                                                                        // 67
        }                                                                                                            // 68
        /*                                                                                                           // 69
        if (state === "signIn"){                                                                                     // 70
            var pwdService = Package["accounts-password"] !== undefined;                                             // 71
            if (!pwdService)                                                                                         // 72
                return true;                                                                                         // 73
        }                                                                                                            // 74
        */                                                                                                           // 75
        return false;                                                                                                // 76
    },                                                                                                               // 77
    showResendVerificationEmailLink: function(){                                                                     // 78
        var parentData = Template.currentData();                                                                     // 79
        var state = (parentData && parentData.state) || AccountsTemplates.getState();                                // 80
        return (state === "signIn" || state === "forgotPwd") && AccountsTemplates.options.showResendVerificationEmailLink;
    },                                                                                                               // 82
};                                                                                                                   // 83
                                                                                                                     // 84
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/useraccounts:core/lib/templates_helpers/at_input.js                                                      //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
AT.prototype.atInputRendered = function(){                                                                           // 1
    var fieldId = this.data._id;                                                                                     // 2
    var queryKey = this.data.options && this.data.options.queryKey || this.data._id;                                 // 3
    var inputQueryVal = Router.current().params.query[queryKey];                                                     // 4
    if (inputQueryVal)                                                                                               // 5
        this.$("input#at-field-" + fieldId).val(inputQueryVal);                                                      // 6
                                                                                                                     // 7
    var parentData = Template.currentData();                                                                         // 8
    var state = (parentData && parentData.state) || AccountsTemplates.getState();                                    // 9
    var firstVisibleInput = _.find(AccountsTemplates.getFields(), function(f){                                       // 10
      return _.contains(f.visible, state);                                                                           // 11
    });                                                                                                              // 12
    if (firstVisibleInput && firstVisibleInput._id === fieldId) {                                                    // 13
      this.$("input#at-field-" + fieldId).focus();                                                                   // 14
    }                                                                                                                // 15
};                                                                                                                   // 16
                                                                                                                     // 17
AT.prototype.atInputHelpers = {                                                                                      // 18
    disabled: function() {                                                                                           // 19
        return AccountsTemplates.disabled();                                                                         // 20
    },                                                                                                               // 21
    showLabels: function() {                                                                                         // 22
        return AccountsTemplates.options.showLabels;                                                                 // 23
    },                                                                                                               // 24
    displayName: function() {                                                                                        // 25
        var parentData = Template.parentData();                                                                      // 26
        var state = (parentData && parentData.state) || AccountsTemplates.getState();                                // 27
        var displayName = this.getDisplayName(state);                                                                // 28
        return T9n.get(displayName, markIfMissing=false);                                                            // 29
    },                                                                                                               // 30
    optionalText: function(){                                                                                        // 31
        return "(" + T9n.get(AccountsTemplates.texts.optionalField, markIfMissing=false) + ")";                      // 32
    },                                                                                                               // 33
    templateName: function() {                                                                                       // 34
        if (this.template)                                                                                           // 35
            return this.template;                                                                                    // 36
        if (this.type === "checkbox")                                                                                // 37
            return "atCheckboxInput";                                                                                // 38
        if (this.type === "select")                                                                                  // 39
            return "atSelectInput";                                                                                  // 40
        if (this.type === "radio")                                                                                   // 41
            return "atRadioInput";                                                                                   // 42
        if (this.type === "hidden")                                                                                  // 43
            return "atHiddenInput";                                                                                  // 44
        return "atTextInput";                                                                                        // 45
    },                                                                                                               // 46
    values: function(){                                                                                              // 47
        var id = this._id;                                                                                           // 48
        return _.map(this.select, function(select){                                                                  // 49
            var s = _.clone(select);                                                                                 // 50
            s._id = id + "-" + select.value;                                                                         // 51
            s.id = id;                                                                                               // 52
            return s;                                                                                                // 53
        });                                                                                                          // 54
    },                                                                                                               // 55
    errorText: function() {                                                                                          // 56
        var err = this.getStatus();                                                                                  // 57
        return T9n.get(err, markIfMissing=false);                                                                    // 58
    },                                                                                                               // 59
    placeholder: function() {                                                                                        // 60
        if (AccountsTemplates.options.showPlaceholders) {                                                            // 61
            var parentData = Template.parentData();                                                                  // 62
            var state = (parentData && parentData.state) || AccountsTemplates.getState();                            // 63
            var placeholder = this.getPlaceholder(state);                                                            // 64
            return T9n.get(placeholder, markIfMissing=false);                                                        // 65
        }                                                                                                            // 66
    },                                                                                                               // 67
};                                                                                                                   // 68
                                                                                                                     // 69
AT.prototype.atInputEvents = {                                                                                       // 70
    "focusin input": function(event, t){                                                                             // 71
        this.clearStatus();                                                                                          // 72
    },                                                                                                               // 73
    "focusout input": function(event, t){                                                                            // 74
        var fieldId = this._id;                                                                                      // 75
        var rawValue = this.getValue(t);                                                                             // 76
        var value = this.fixValue(rawValue);                                                                         // 77
        // Possibly updates the input value                                                                          // 78
        if (value !== rawValue) {                                                                                    // 79
            this.setValue(t, value);                                                                                 // 80
        }                                                                                                            // 81
                                                                                                                     // 82
        // Client-side only validation                                                                               // 83
        if (!this.validation)                                                                                        // 84
            return;                                                                                                  // 85
        var parentData = Template.parentData();                                                                      // 86
        var state = (parentData && parentData.state) || AccountsTemplates.getState();                                // 87
        // No validation during signIn                                                                               // 88
        if (state === "signIn")                                                                                      // 89
            return;                                                                                                  // 90
        // Special case for password confirmation                                                                    // 91
        if (value && fieldId === "password_again"){                                                                  // 92
            if (value !== $("#at-field-password").val())                                                             // 93
                return this.setError(AccountsTemplates.texts.errors.pwdMismatch);                                    // 94
        }                                                                                                            // 95
        this.validate(value);                                                                                        // 96
    },                                                                                                               // 97
    "keyup input": function(event, t){                                                                               // 98
        // Client-side only continuous validation                                                                    // 99
        if (!this.continuousValidation)                                                                              // 100
            return;                                                                                                  // 101
        var parentData = Template.parentData();                                                                      // 102
        var state = (parentData && parentData.state) || AccountsTemplates.getState();                                // 103
        // No validation during signIn                                                                               // 104
        if (state === "signIn")                                                                                      // 105
            return;                                                                                                  // 106
        var fieldId = this._id;                                                                                      // 107
        var rawValue = this.getValue(t);                                                                             // 108
        var value = this.fixValue(rawValue);                                                                         // 109
        // Possibly updates the input value                                                                          // 110
        if (value !== rawValue) {                                                                                    // 111
            this.setValue(t, value);                                                                                 // 112
        }                                                                                                            // 113
        // Special case for password confirmation                                                                    // 114
        if (value && fieldId === "password_again"){                                                                  // 115
            if (value !== $("#at-field-password").val())                                                             // 116
                return this.setError(AccountsTemplates.texts.errors.pwdMismatch);                                    // 117
        }                                                                                                            // 118
        this.validate(value);                                                                                        // 119
    },                                                                                                               // 120
};                                                                                                                   // 121
                                                                                                                     // 122
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/useraccounts:core/lib/templates_helpers/at_nav_button.js                                                 //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
AT.prototype.atNavButtonHelpers = {                                                                                  // 1
    text: function(){                                                                                                // 2
        var key = Meteor.userId() ? AccountsTemplates.texts.navSignOut : AccountsTemplates.texts.navSignIn;          // 3
        return T9n.get(key, markIfMissing=false);                                                                    // 4
    }                                                                                                                // 5
};                                                                                                                   // 6
                                                                                                                     // 7
AT.prototype.atNavButtonEvents = {                                                                                   // 8
    'click #at-nav-button': function(event){                                                                         // 9
        event.preventDefault();                                                                                      // 10
        if (Meteor.userId())                                                                                         // 11
            AccountsTemplates.logout();                                                                              // 12
        else                                                                                                         // 13
            AccountsTemplates.linkClick("signIn");                                                                   // 14
    },                                                                                                               // 15
};                                                                                                                   // 16
                                                                                                                     // 17
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/useraccounts:core/lib/templates_helpers/at_oauth.js                                                      //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
AT.prototype.atOauthHelpers = {                                                                                      // 1
    oauthService: function() {                                                                                       // 2
        return AccountsTemplates.oauthServices();                                                                    // 3
    },                                                                                                               // 4
};                                                                                                                   // 5
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/useraccounts:core/lib/templates_helpers/at_pwd_form.js                                                   //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
AT.prototype.atPwdFormHelpers = {                                                                                    // 1
    disabled: function() {                                                                                           // 2
        return AccountsTemplates.disabled();                                                                         // 3
    },                                                                                                               // 4
    fields: function() {                                                                                             // 5
        var parentData = Template.currentData();                                                                     // 6
        var state = (parentData && parentData.state) || AccountsTemplates.getState();                                // 7
        return _.filter(AccountsTemplates.getFields(), function(s) {                                                 // 8
            return _.contains(s.visible, state);                                                                     // 9
        });                                                                                                          // 10
    },                                                                                                               // 11
    showForgotPasswordLink: function() {                                                                             // 12
        var parentData = Template.currentData();                                                                     // 13
        var state = (parentData && parentData.state) || AccountsTemplates.getState();                                // 14
        return state === "signIn" && AccountsTemplates.options.showForgotPasswordLink;                               // 15
    },                                                                                                               // 16
    showReCaptcha: function() {                                                                                      // 17
      var parentData = Template.currentData();                                                                       // 18
      var state = (parentData && parentData.state) || AccountsTemplates.getState();                                  // 19
      return state === "signUp" && AccountsTemplates.options.showReCaptcha;                                          // 20
    },                                                                                                               // 21
};                                                                                                                   // 22
                                                                                                                     // 23
                                                                                                                     // 24
var toLowercaseUsername = function(value){                                                                           // 25
  return value.toLowerCase().replace(/\s+/gm, '');                                                                   // 26
};                                                                                                                   // 27
                                                                                                                     // 28
AT.prototype.atPwdFormEvents = {                                                                                     // 29
    // Form submit                                                                                                   // 30
    "submit #at-pwd-form": function(event, t) {                                                                      // 31
        event.preventDefault();                                                                                      // 32
        t.$("#at-btn").blur();                                                                                       // 33
                                                                                                                     // 34
        AccountsTemplates.setDisabled(true);                                                                         // 35
                                                                                                                     // 36
        var parentData = Template.currentData();                                                                     // 37
        var state = (parentData && parentData.state) || AccountsTemplates.getState();                                // 38
        var preValidation = (state !== "signIn");                                                                    // 39
                                                                                                                     // 40
        // Client-side pre-validation                                                                                // 41
        // Validates fields values                                                                                   // 42
        // NOTE: This is the only place where password validation can be enforced!                                   // 43
        var formData = {};                                                                                           // 44
        var someError = false;                                                                                       // 45
        var errList = [];                                                                                            // 46
        _.each(AccountsTemplates.getFields(), function(field){                                                       // 47
            // Considers only visible fields...                                                                      // 48
            if (!_.contains(field.visible, state))                                                                   // 49
                return;                                                                                              // 50
                                                                                                                     // 51
            var fieldId = field._id;                                                                                 // 52
                                                                                                                     // 53
            var rawValue = field.getValue(t);                                                                        // 54
            var value = field.fixValue(rawValue);                                                                    // 55
            // Possibly updates the input value                                                                      // 56
            if (value !== rawValue) {                                                                                // 57
                field.setValue(t, value);                                                                            // 58
            }                                                                                                        // 59
            if (value !== undefined && value !== "") {                                                               // 60
                formData[fieldId] = value;                                                                           // 61
            }                                                                                                        // 62
                                                                                                                     // 63
            // Validates the field value only if current state is not "signIn"                                       // 64
            if (preValidation && field.getStatus() !== false){                                                       // 65
                var validationErr = field.validate(value, "strict");                                                 // 66
                if (validationErr) {                                                                                 // 67
                    if (field.negativeValidation)                                                                    // 68
                        field.setError(validationErr);                                                               // 69
                    else{                                                                                            // 70
                        var fId = T9n.get(field.getDisplayName(), markIfMissing=false);                              // 71
                        //errList.push(fId + ": " + err);                                                            // 72
                        errList.push({                                                                               // 73
                            field: field.getDisplayName(),                                                           // 74
                            err: validationErr                                                                       // 75
                        });                                                                                          // 76
                    }                                                                                                // 77
                    someError = true;                                                                                // 78
                }                                                                                                    // 79
                else                                                                                                 // 80
                    field.setSuccess();                                                                              // 81
            }                                                                                                        // 82
        });                                                                                                          // 83
                                                                                                                     // 84
        // Clears error and result                                                                                   // 85
        AccountsTemplates.clearError();                                                                              // 86
        AccountsTemplates.clearResult();                                                                             // 87
        AccountsTemplates.clearMessage();                                                                            // 88
        // Possibly sets errors                                                                                      // 89
        if (someError){                                                                                              // 90
            if (errList.length)                                                                                      // 91
                AccountsTemplates.state.form.set("error", errList);                                                  // 92
            AccountsTemplates.setDisabled(false);                                                                    // 93
            //reset reCaptcha form                                                                                   // 94
            if (state === "signUp" && AccountsTemplates.options.showReCaptcha) {                                     // 95
                grecaptcha.reset();                                                                                  // 96
            }                                                                                                        // 97
            return;                                                                                                  // 98
        }                                                                                                            // 99
                                                                                                                     // 100
        // Extracts username, email, and pwds                                                                        // 101
        var current_password = formData.current_password;                                                            // 102
        var email = formData.email;                                                                                  // 103
        var password = formData.password;                                                                            // 104
        var password_again = formData.password_again;                                                                // 105
        var username = formData.username;                                                                            // 106
        var username_and_email = formData.username_and_email;                                                        // 107
        // Clears profile data removing username, email, and pwd                                                     // 108
        delete formData.current_password;                                                                            // 109
        delete formData.email;                                                                                       // 110
        delete formData.password;                                                                                    // 111
        delete formData.password_again;                                                                              // 112
        delete formData.username;                                                                                    // 113
        delete formData.username_and_email;                                                                          // 114
                                                                                                                     // 115
        if (AccountsTemplates.options.confirmPassword){                                                              // 116
            // Checks passwords for correct match                                                                    // 117
            if (password_again && password !== password_again){                                                      // 118
                var pwd_again = AccountsTemplates.getField("password_again");                                        // 119
                if (pwd_again.negativeValidation)                                                                    // 120
                    pwd_again.setError(AccountsTemplates.texts.errors.pwdMismatch);                                  // 121
                else                                                                                                 // 122
                    AccountsTemplates.state.form.set("error", [{                                                     // 123
                        field: pwd_again.getDisplayName(),                                                           // 124
                        err: AccountsTemplates.texts.errors.pwdMismatch                                              // 125
                    }]);                                                                                             // 126
                AccountsTemplates.setDisabled(false);                                                                // 127
                //reset reCaptcha form                                                                               // 128
                if (state === "signUp" && AccountsTemplates.options.showReCaptcha) {                                 // 129
                  grecaptcha.reset();                                                                                // 130
                }                                                                                                    // 131
                return;                                                                                              // 132
            }                                                                                                        // 133
        }                                                                                                            // 134
                                                                                                                     // 135
        // -------                                                                                                   // 136
        // Sign In                                                                                                   // 137
        // -------                                                                                                   // 138
        if (state === "signIn") {                                                                                    // 139
            var pwdOk = !!password;                                                                                  // 140
            var userOk = true;                                                                                       // 141
            var loginSelector;                                                                                       // 142
            if (email) {                                                                                             // 143
                if (AccountsTemplates.options.lowercaseUsername) {                                                   // 144
                  email = toLowercaseUsername(email);                                                                // 145
                }                                                                                                    // 146
                                                                                                                     // 147
                loginSelector = {email: email};                                                                      // 148
            }                                                                                                        // 149
            else if (username) {                                                                                     // 150
                if (AccountsTemplates.options.lowercaseUsername) {                                                   // 151
                  username = toLowercaseUsername(username);                                                          // 152
                }                                                                                                    // 153
                loginSelector = {username: username};                                                                // 154
            }                                                                                                        // 155
            else if (username_and_email) {                                                                           // 156
                if (AccountsTemplates.options.lowercaseUsername) {                                                   // 157
                  username_and_email = toLowercaseUsername(username_and_email);                                      // 158
                }                                                                                                    // 159
                loginSelector = username_and_email;                                                                  // 160
            }                                                                                                        // 161
            else                                                                                                     // 162
                userOk = false;                                                                                      // 163
                                                                                                                     // 164
            // Possibly exits if not both 'password' and 'username' are non-empty...                                 // 165
            if (!pwdOk || !userOk){                                                                                  // 166
                AccountsTemplates.state.form.set("error", [AccountsTemplates.texts.errors.loginForbidden]);          // 167
                AccountsTemplates.setDisabled(false);                                                                // 168
                return;                                                                                              // 169
            }                                                                                                        // 170
                                                                                                                     // 171
                                                                                                                     // 172
            return Meteor.loginWithPassword(loginSelector, password, function(error) {                               // 173
                AccountsTemplates.submitCallback(error, state);                                                      // 174
            });                                                                                                      // 175
        }                                                                                                            // 176
                                                                                                                     // 177
        // -------                                                                                                   // 178
        // Sign Up                                                                                                   // 179
        // -------                                                                                                   // 180
        if (state === "signUp") {                                                                                    // 181
            // Possibly gets reCaptcha response                                                                      // 182
            if (AccountsTemplates.options.showReCaptcha) {                                                           // 183
              formData.reCaptchaResponse = grecaptcha.getResponse();                                                 // 184
            }                                                                                                        // 185
                                                                                                                     // 186
            var hash = Accounts._hashPassword(password);                                                             // 187
            var options = {                                                                                          // 188
                username: username,                                                                                  // 189
                email: email,                                                                                        // 190
                password: hash,                                                                                      // 191
                profile: formData,                                                                                   // 192
            };                                                                                                       // 193
                                                                                                                     // 194
            // Call preSignUpHook, if any...                                                                         // 195
            var preSignUpHook = AccountsTemplates.options.preSignUpHook;                                             // 196
            if (preSignUpHook) {                                                                                     // 197
              preSignUpHook(password, options);                                                                      // 198
            }                                                                                                        // 199
                                                                                                                     // 200
            return Meteor.call("ATCreateUserServer", options, function(error){                                       // 201
                AccountsTemplates.submitCallback(error, undefined, function(){                                       // 202
                    if (AccountsTemplates.options.sendVerificationEmail && AccountsTemplates.options.enforceEmailVerification){
                        AccountsTemplates.submitCallback(error, state, function () {                                 // 204
                            AccountsTemplates.state.form.set("result", AccountsTemplates.texts.info.signUpVerifyEmail);
                            // Cleans up input fields' content                                                       // 206
                            _.each(AccountsTemplates.getFields(), function(field){                                   // 207
                                // Considers only visible fields...                                                  // 208
                                if (!_.contains(field.visible, state))                                               // 209
                                    return;                                                                          // 210
                                                                                                                     // 211
                                var elem = t.$("#at-field-" + field._id);                                            // 212
                                                                                                                     // 213
                                // Naïve reset                                                                       // 214
                                if (field.type === "checkbox") elem.prop('checked', false);                          // 215
                                else elem.val("");                                                                   // 216
                                                                                                                     // 217
                            });                                                                                      // 218
                            AccountsTemplates.setDisabled(false);                                                    // 219
                            AccountsTemplates.avoidRedirect = true;                                                  // 220
                        });                                                                                          // 221
                    }                                                                                                // 222
                    else {                                                                                           // 223
                        var loginSelector;                                                                           // 224
                                                                                                                     // 225
                        if (email) {                                                                                 // 226
                            if (AccountsTemplates.options.lowercaseUsername) {                                       // 227
                              email = toLowercaseUsername(email);                                                    // 228
                            }                                                                                        // 229
                                                                                                                     // 230
                            loginSelector = {email: email};                                                          // 231
                        }                                                                                            // 232
                        else if (username) {                                                                         // 233
                            if (AccountsTemplates.options.lowercaseUsername) {                                       // 234
                              username = toLowercaseUsername(username);                                              // 235
                            }                                                                                        // 236
                            loginSelector = {username: username};                                                    // 237
                        }                                                                                            // 238
                        else {                                                                                       // 239
                            if (AccountsTemplates.options.lowercaseUsername) {                                       // 240
                              username_and_email = toLowercaseUsername(username_and_email);                          // 241
                            }                                                                                        // 242
                            loginSelector = username_and_email;                                                      // 243
                        }                                                                                            // 244
                                                                                                                     // 245
                        Meteor.loginWithPassword(loginSelector, password, function(error) {                          // 246
                            AccountsTemplates.submitCallback(error, state, function(){                               // 247
                                AccountsTemplates.setState("signIn");                                                // 248
                            });                                                                                      // 249
                        });                                                                                          // 250
                    }                                                                                                // 251
                });                                                                                                  // 252
            });                                                                                                      // 253
        }                                                                                                            // 254
                                                                                                                     // 255
        //----------------                                                                                           // 256
        // Forgot Password                                                                                           // 257
        //----------------                                                                                           // 258
        if (state === "forgotPwd"){                                                                                  // 259
            return Accounts.forgotPassword({                                                                         // 260
                email: email                                                                                         // 261
            }, function(error) {                                                                                     // 262
                AccountsTemplates.submitCallback(error, state, function(){                                           // 263
                    AccountsTemplates.state.form.set("result", AccountsTemplates.texts.info.emailSent);              // 264
                    t.$("#at-field-email").val("");                                                                  // 265
                });                                                                                                  // 266
            });                                                                                                      // 267
        }                                                                                                            // 268
                                                                                                                     // 269
        //--------------------------------                                                                           // 270
        // Reset Password / Enroll Account                                                                           // 271
        //--------------------------------                                                                           // 272
        if (state === "resetPwd" || state === "enrollAccount") {                                                     // 273
            return Accounts.resetPassword(AccountsTemplates.paramToken, password, function(error) {                  // 274
                AccountsTemplates.submitCallback(error, state, function(){                                           // 275
                    var pwd_field_id;                                                                                // 276
                    if (state === "resetPwd")                                                                        // 277
                        AccountsTemplates.state.form.set("result", AccountsTemplates.texts.info.pwdReset);           // 278
                    else // Enroll Account                                                                           // 279
                        AccountsTemplates.state.form.set("result", AccountsTemplates.texts.info.pwdSet);             // 280
                    t.$("#at-field-password").val("");                                                               // 281
                    if (AccountsTemplates.options.confirmPassword)                                                   // 282
                        t.$("#at-field-password_again").val("");                                                     // 283
                });                                                                                                  // 284
            });                                                                                                      // 285
        }                                                                                                            // 286
                                                                                                                     // 287
        //----------------                                                                                           // 288
        // Change Password                                                                                           // 289
        //----------------                                                                                           // 290
        if (state === "changePwd"){                                                                                  // 291
            return Accounts.changePassword(current_password, password, function(error) {                             // 292
                AccountsTemplates.submitCallback(error, state, function(){                                           // 293
                    AccountsTemplates.state.form.set("result", AccountsTemplates.texts.info.pwdChanged);             // 294
                    t.$("#at-field-current_password").val("");                                                       // 295
                    t.$("#at-field-password").val("");                                                               // 296
                    if (AccountsTemplates.options.confirmPassword)                                                   // 297
                        t.$("#at-field-password_again").val("");                                                     // 298
                });                                                                                                  // 299
            });                                                                                                      // 300
        }                                                                                                            // 301
                                                                                                                     // 302
        //----------------                                                                                           // 303
        // Resend Verification E-mail                                                                                // 304
        //----------------                                                                                           // 305
        if (state === "resendVerificationEmail"){                                                                    // 306
            return Meteor.call("ATResendVerificationEmail", email, function (error) {                                // 307
                AccountsTemplates.submitCallback(error, state, function(){                                           // 308
                    AccountsTemplates.state.form.set("result", AccountsTemplates.texts.info.verificationEmailSent);  // 309
                    t.$("#at-field-email").val("");                                                                  // 310
                                                                                                                     // 311
                    AccountsTemplates.avoidRedirect = true;                                                          // 312
                });                                                                                                  // 313
            });                                                                                                      // 314
        }                                                                                                            // 315
    },                                                                                                               // 316
};                                                                                                                   // 317
                                                                                                                     // 318
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/useraccounts:core/lib/templates_helpers/at_pwd_form_btn.js                                               //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
AT.prototype.atPwdFormBtnHelpers = {                                                                                 // 1
    submitDisabled: function(){                                                                                      // 2
        var disable = _.chain(AccountsTemplates.getFields())                                                         // 3
            .map(function(field){                                                                                    // 4
                return field.hasError() || field.isValidating();                                                     // 5
            })                                                                                                       // 6
            .some()                                                                                                  // 7
            .value()                                                                                                 // 8
        ;                                                                                                            // 9
        if (disable)                                                                                                 // 10
            return "disabled";                                                                                       // 11
    },                                                                                                               // 12
    buttonText: function() {                                                                                         // 13
        var parentData = Template.currentData();                                                                     // 14
        var state = (parentData && parentData.state) || AccountsTemplates.getState();                                // 15
        return T9n.get(AccountsTemplates.texts.button[state], markIfMissing=false);                                  // 16
    },                                                                                                               // 17
};                                                                                                                   // 18
                                                                                                                     // 19
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/useraccounts:core/lib/templates_helpers/at_pwd_link.js                                                   //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
AT.prototype.atPwdLinkHelpers = {                                                                                    // 1
    disabled: function() {                                                                                           // 2
        return AccountsTemplates.disabled();                                                                         // 3
    },                                                                                                               // 4
    forgotPwdLink: function(){                                                                                       // 5
        return AccountsTemplates.getRoutePath("forgotPwd");                                                          // 6
    },                                                                                                               // 7
    preText: function(){                                                                                             // 8
        return T9n.get(AccountsTemplates.texts.pwdLink_pre, markIfMissing=false);                                    // 9
    },                                                                                                               // 10
    linkText: function(){                                                                                            // 11
        return T9n.get(AccountsTemplates.texts.pwdLink_link, markIfMissing=false);                                   // 12
    },                                                                                                               // 13
    suffText: function(){                                                                                            // 14
        return T9n.get(AccountsTemplates.texts.pwdLink_suff, markIfMissing=false);                                   // 15
    },                                                                                                               // 16
};                                                                                                                   // 17
                                                                                                                     // 18
AT.prototype.atPwdLinkEvents = {                                                                                     // 19
    "click #at-forgotPwd": function(event, t) {                                                                      // 20
        event.preventDefault();                                                                                      // 21
        AccountsTemplates.linkClick("forgotPwd");                                                                    // 22
    },                                                                                                               // 23
};                                                                                                                   // 24
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/useraccounts:core/lib/templates_helpers/at_reCaptcha.js                                                  //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
AT.prototype.atReCaptchaRendered = function() {                                                                      // 1
    $.getScript('//www.google.com/recaptcha/api.js');                                                                // 2
};                                                                                                                   // 3
                                                                                                                     // 4
AT.prototype.atReCaptchaHelpers = {                                                                                  // 5
    key: function() {                                                                                                // 6
        if (AccountsTemplates.options.reCaptcha && AccountsTemplates.options.reCaptcha.siteKey)                      // 7
            return AccountsTemplates.options.reCaptcha.siteKey;                                                      // 8
        return Meteor.settings.public.reCaptcha.siteKey;                                                             // 9
    },                                                                                                               // 10
                                                                                                                     // 11
    theme: function() {                                                                                              // 12
        return AccountsTemplates.options.reCaptcha && AccountsTemplates.options.reCaptcha.theme;                     // 13
    },                                                                                                               // 14
                                                                                                                     // 15
    data_type: function() {                                                                                          // 16
        return AccountsTemplates.options.reCaptcha && AccountsTemplates.options.reCaptcha.data_type;                 // 17
    },                                                                                                               // 18
};                                                                                                                   // 19
                                                                                                                     // 20
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/useraccounts:core/lib/templates_helpers/at_resend_verification_email_link.js                             //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
AT.prototype.atResendVerificationEmailLinkHelpers = {                                                                // 1
    disabled: function () {                                                                                          // 2
        return AccountsTemplates.disabled();                                                                         // 3
    },                                                                                                               // 4
    resendVerificationEmailLink: function () {                                                                       // 5
        return AccountsTemplates.getRoutePath("resendVerificationEmail");                                            // 6
    },                                                                                                               // 7
    preText: function(){                                                                                             // 8
        return T9n.get(AccountsTemplates.texts.resendVerificationEmailLink_pre, markIfMissing=false);                // 9
    },                                                                                                               // 10
    linkText: function(){                                                                                            // 11
        return T9n.get(AccountsTemplates.texts.resendVerificationEmailLink_link, markIfMissing=false);               // 12
    },                                                                                                               // 13
    suffText: function(){                                                                                            // 14
        return T9n.get(AccountsTemplates.texts.resendVerificationEmailLink_suff, markIfMissing=false);               // 15
    },                                                                                                               // 16
};                                                                                                                   // 17
                                                                                                                     // 18
AT.prototype.atResendVerificationEmailLinkEvents = {                                                                 // 19
    "click #at-resend-verification-email": function(event, t) {                                                      // 20
        event.preventDefault();                                                                                      // 21
        AccountsTemplates.linkClick('resendVerificationEmail');                                                      // 22
    },                                                                                                               // 23
};                                                                                                                   // 24
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/useraccounts:core/lib/templates_helpers/at_result.js                                                     //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
AT.prototype.atResultHelpers = {                                                                                     // 1
    result: function() {                                                                                             // 2
        var resultText = AccountsTemplates.state.form.get("result");                                                 // 3
        if (resultText)                                                                                              // 4
            return T9n.get(resultText, markIfMissing=false);                                                         // 5
    },                                                                                                               // 6
};                                                                                                                   // 7
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/useraccounts:core/lib/templates_helpers/at_sep.js                                                        //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
AT.prototype.atSepHelpers = {                                                                                        // 1
    sepText: function(){                                                                                             // 2
        return T9n.get(AccountsTemplates.texts.sep, markIfMissing=false);                                            // 3
    },                                                                                                               // 4
};                                                                                                                   // 5
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/useraccounts:core/lib/templates_helpers/at_signin_link.js                                                //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
AT.prototype.atSigninLinkHelpers = {                                                                                 // 1
    disabled: function() {                                                                                           // 2
        return AccountsTemplates.disabled();                                                                         // 3
    },                                                                                                               // 4
    signInLink: function(){                                                                                          // 5
        return AccountsTemplates.getRoutePath("signIn");                                                             // 6
    },                                                                                                               // 7
    preText: function(){                                                                                             // 8
        return T9n.get(AccountsTemplates.texts.signInLink_pre, markIfMissing=false);                                 // 9
    },                                                                                                               // 10
    linkText: function(){                                                                                            // 11
        return T9n.get(AccountsTemplates.texts.signInLink_link, markIfMissing=false);                                // 12
    },                                                                                                               // 13
    suffText: function(){                                                                                            // 14
        return T9n.get(AccountsTemplates.texts.signInLink_suff, markIfMissing=false);                                // 15
    },                                                                                                               // 16
};                                                                                                                   // 17
                                                                                                                     // 18
AT.prototype.atSigninLinkEvents = {                                                                                  // 19
    "click #at-signIn": function(event, t) {                                                                         // 20
        event.preventDefault();                                                                                      // 21
        AccountsTemplates.linkClick("signIn");                                                                       // 22
    },                                                                                                               // 23
};                                                                                                                   // 24
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/useraccounts:core/lib/templates_helpers/at_signup_link.js                                                //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
AT.prototype.atSignupLinkHelpers = {                                                                                 // 1
    disabled: function() {                                                                                           // 2
        return AccountsTemplates.disabled();                                                                         // 3
    },                                                                                                               // 4
    signUpLink: function(){                                                                                          // 5
        return AccountsTemplates.getRoutePath("signUp");                                                             // 6
    },                                                                                                               // 7
    preText: function(){                                                                                             // 8
        return T9n.get(AccountsTemplates.texts.signUpLink_pre, markIfMissing=false);                                 // 9
    },                                                                                                               // 10
    linkText: function(){                                                                                            // 11
        return T9n.get(AccountsTemplates.texts.signUpLink_link, markIfMissing=false);                                // 12
    },                                                                                                               // 13
    suffText: function(){                                                                                            // 14
        return T9n.get(AccountsTemplates.texts.signUpLink_suff, markIfMissing=false);                                // 15
    },                                                                                                               // 16
};                                                                                                                   // 17
                                                                                                                     // 18
AT.prototype.atSignupLinkEvents = {                                                                                  // 19
    "click #at-signUp": function(event, t) {                                                                         // 20
        event.preventDefault();                                                                                      // 21
        AccountsTemplates.linkClick('signUp');                                                                       // 22
    },                                                                                                               // 23
};                                                                                                                   // 24
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/useraccounts:core/lib/templates_helpers/at_social.js                                                     //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
AT.prototype.atSocialHelpers = {                                                                                     // 1
    disabled: function() {                                                                                           // 2
        if (AccountsTemplates.disabled())                                                                            // 3
            return "disabled";                                                                                       // 4
        var user = Meteor.user();                                                                                    // 5
        if (user){                                                                                                   // 6
            var numServices = 0;                                                                                     // 7
            if (user.services)                                                                                       // 8
                numServices = _.keys(user.services).length; // including "resume"                                    // 9
            if (numServices === 2 && user.services[this._id])                                                        // 10
                return "disabled";                                                                                   // 11
        }                                                                                                            // 12
    },                                                                                                               // 13
    name: function(){                                                                                                // 14
        return this._id;                                                                                             // 15
    },                                                                                                               // 16
    iconClass: function() {                                                                                          // 17
        var ic = AccountsTemplates.texts.socialIcons[this._id];                                                      // 18
        if (!ic)                                                                                                     // 19
            ic = "fa fa-" + this._id;                                                                                // 20
        return ic;                                                                                                   // 21
    },                                                                                                               // 22
    buttonText: function() {                                                                                         // 23
        var service = this;                                                                                          // 24
        var serviceName = this._id;                                                                                  // 25
        if (serviceName === "meteor-developer")                                                                      // 26
            serviceName = "meteor";                                                                                  // 27
        serviceName = capitalize(serviceName);                                                                       // 28
        if (!service.configured)                                                                                     // 29
            return T9n.get(AccountsTemplates.texts.socialConfigure, markIfMissing=false) + " " + serviceName;        // 30
        var showAddRemove = AccountsTemplates.options.showAddRemoveServices;                                         // 31
        var user = Meteor.user();                                                                                    // 32
        if (user && showAddRemove){                                                                                  // 33
            if (user.services && user.services[this._id]){                                                           // 34
                var numServices = _.keys(user.services).length; // including "resume"                                // 35
                if (numServices === 2)                                                                               // 36
                    return serviceName;                                                                              // 37
                else                                                                                                 // 38
                    return T9n.get(AccountsTemplates.texts.socialRemove, markIfMissing=false) + " " + serviceName;   // 39
            } else                                                                                                   // 40
                    return T9n.get(AccountsTemplates.texts.socialAdd, markIfMissing=false) + " " + serviceName;      // 41
        }                                                                                                            // 42
        var parentData = Template.parentData();                                                                      // 43
        var state = (parentData && parentData.state) || AccountsTemplates.getState();                                // 44
        var prefix = state === "signIn" ?                                                                            // 45
            T9n.get(AccountsTemplates.texts.socialSignIn, markIfMissing=false) :                                     // 46
            T9n.get(AccountsTemplates.texts.socialSignUp, markIfMissing=false);                                      // 47
        return prefix + " " + T9n.get(AccountsTemplates.texts.socialWith, markIfMissing=false) + " " + serviceName;  // 48
    },                                                                                                               // 49
};                                                                                                                   // 50
                                                                                                                     // 51
AT.prototype.atSocialEvents = {                                                                                      // 52
    "click button": function(event, t) {                                                                             // 53
        event.preventDefault();                                                                                      // 54
        event.currentTarget.blur();                                                                                  // 55
        if (AccountsTemplates.disabled())                                                                            // 56
            return;                                                                                                  // 57
        var user = Meteor.user();                                                                                    // 58
        if (user && user.services && user.services[this._id]){                                                       // 59
            var numServices = _.keys(user.services).length; // including "resume"                                    // 60
            if (numServices === 2)                                                                                   // 61
                return;                                                                                              // 62
            else{                                                                                                    // 63
                AccountsTemplates.setDisabled(true);                                                                 // 64
                Meteor.call("ATRemoveService", this._id, function(error){                                            // 65
                    AccountsTemplates.setDisabled(false);                                                            // 66
                });                                                                                                  // 67
            }                                                                                                        // 68
        } else {                                                                                                     // 69
            AccountsTemplates.setDisabled(true);                                                                     // 70
            var parentData = Template.parentData();                                                                  // 71
            var state = (parentData && parentData.state) || AccountsTemplates.getState();                            // 72
            var serviceName = this._id;                                                                              // 73
            var methodName;                                                                                          // 74
            if (serviceName === 'meteor-developer')                                                                  // 75
                methodName = "loginWithMeteorDeveloperAccount";                                                      // 76
            else                                                                                                     // 77
                methodName = "loginWith" + capitalize(serviceName);                                                  // 78
            var loginWithService = Meteor[methodName];                                                               // 79
            options = {                                                                                              // 80
                loginStyle: AccountsTemplates.options.socialLoginStyle,                                              // 81
            };                                                                                                       // 82
            if (Accounts.ui) {                                                                                       // 83
                if (Accounts.ui._options.requestPermissions[serviceName]) {                                          // 84
                    options.requestPermissions = Accounts.ui._options.requestPermissions[serviceName];               // 85
                }                                                                                                    // 86
                if (Accounts.ui._options.requestOfflineToken[serviceName]) {                                         // 87
                    options.requestOfflineToken = Accounts.ui._options.requestOfflineToken[serviceName];             // 88
                }                                                                                                    // 89
            }                                                                                                        // 90
            loginWithService(options, function(err) {                                                                // 91
                AccountsTemplates.setDisabled(false);                                                                // 92
                if (err && err instanceof Accounts.LoginCancelledError) {                                            // 93
                    // do nothing                                                                                    // 94
                }                                                                                                    // 95
                else if (err && err instanceof ServiceConfiguration.ConfigError) {                                   // 96
                    if (Accounts._loginButtonsSession)                                                               // 97
                        return Accounts._loginButtonsSession.configureService(serviceName);                          // 98
                }                                                                                                    // 99
                else                                                                                                 // 100
                    AccountsTemplates.submitCallback(err, state);                                                    // 101
            });                                                                                                      // 102
        }                                                                                                            // 103
    },                                                                                                               // 104
};                                                                                                                   // 105
                                                                                                                     // 106
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/useraccounts:core/lib/templates_helpers/at_terms_link.js                                                 //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
AT.prototype.atTermsLinkHelpers = {                                                                                  // 1
    disabled: function() {                                                                                           // 2
        return AccountsTemplates.disabled();                                                                         // 3
    },                                                                                                               // 4
    text: function(){                                                                                                // 5
        return T9n.get(AccountsTemplates.texts.termsPreamble, markIfMissing=false);                                  // 6
    },                                                                                                               // 7
    privacyUrl: function(){                                                                                          // 8
        return AccountsTemplates.options.privacyUrl;                                                                 // 9
    },                                                                                                               // 10
    privacyLinkText: function(){                                                                                     // 11
        return T9n.get(AccountsTemplates.texts.termsPrivacy, markIfMissing=false);                                   // 12
    },                                                                                                               // 13
    showTermsAnd: function(){                                                                                        // 14
        return !!AccountsTemplates.options.privacyUrl && !!AccountsTemplates.options.termsUrl;                       // 15
    },                                                                                                               // 16
    and: function(){                                                                                                 // 17
        return T9n.get(AccountsTemplates.texts.termsAnd, markIfMissing=false);                                       // 18
    },                                                                                                               // 19
    termsUrl: function(){                                                                                            // 20
        return AccountsTemplates.options.termsUrl;                                                                   // 21
    },                                                                                                               // 22
    termsLinkText: function(){                                                                                       // 23
        return T9n.get(AccountsTemplates.texts.termsTerms, markIfMissing=false);                                     // 24
    },                                                                                                               // 25
};                                                                                                                   // 26
                                                                                                                     // 27
AT.prototype.atTermsLinkEvents = {                                                                                   // 28
    "click a": function(event) {                                                                                     // 29
        if (AccountsTemplates.disabled())                                                                            // 30
            event.preventDefault();                                                                                  // 31
    },                                                                                                               // 32
};                                                                                                                   // 33
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/useraccounts:core/lib/templates_helpers/at_title.js                                                      //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
AT.prototype.atTitleHelpers = {                                                                                      // 1
  title: function() {                                                                                                // 2
    var parentData = Template.currentData();                                                                         // 3
    var state = (parentData && parentData.state) || AccountsTemplates.getState();                                    // 4
    return T9n.get(AccountsTemplates.texts.title[state], markIfMissing = false);                                     // 5
  },                                                                                                                 // 6
};                                                                                                                   // 7
                                                                                                                     // 8
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/useraccounts:core/lib/templates_helpers/at_message.js                                                    //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
AT.prototype.atMessageHelpers = {                                                                                    // 1
    message: function() {                                                                                            // 2
        var messageText = AccountsTemplates.state.form.get("message");                                               // 3
        if (messageText)                                                                                             // 4
            return T9n.get(messageText, markIfMissing=false);                                                        // 5
    },                                                                                                               // 6
};                                                                                                                   // 7
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/useraccounts:core/lib/methods.js                                                                         //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
                                                                                                                     // 1
Meteor.methods({                                                                                                     // 2
    ATRemoveService: function(service_name){                                                                         // 3
        var userId = this.userId;                                                                                    // 4
        if (userId){                                                                                                 // 5
            var user = Meteor.users.findOne(userId);                                                                 // 6
            var numServices = _.keys(user.services).length; // including "resume"                                    // 7
            if (numServices === 2)                                                                                   // 8
                throw new Meteor.Error(403, AccountsTemplates.texts.errors.cannotRemoveService, {});                 // 9
            var unset = {};                                                                                          // 10
            unset["services." + service_name] = "";                                                                  // 11
            Meteor.users.update(userId, {$unset: unset});                                                            // 12
        }                                                                                                            // 13
    },                                                                                                               // 14
});                                                                                                                  // 15
                                                                                                                     // 16
                                                                                                                     // 17
if (Meteor.isServer) {                                                                                               // 18
    Meteor.methods({                                                                                                 // 19
        ATCreateUserServer: function(options){                                                                       // 20
            if (AccountsTemplates.options.forbidClientAccountCreation)                                               // 21
                throw new Meteor.Error(403, AccountsTemplates.texts.errors.accountsCreationDisabled);                // 22
            // createUser() does more checking.                                                                      // 23
            check(options, Object);                                                                                  // 24
            var allFieldIds = AccountsTemplates.getFieldIds();                                                       // 25
            // Picks-up whitelisted fields for profile                                                               // 26
            var profile = options.profile;                                                                           // 27
            profile = _.pick(profile, allFieldIds);                                                                  // 28
            profile = _.omit(profile, "username", "email", "password");                                              // 29
            // Validates fields" value                                                                               // 30
            var signupInfo = _.clone(profile);                                                                       // 31
            if (options.username) {                                                                                  // 32
                signupInfo.username = options.username;                                                              // 33
                                                                                                                     // 34
                if (AccountsTemplates.options.lowercaseUsername) {                                                   // 35
                  signupInfo.username = signupInfo.username.trim().replace(/\s+/gm, ' ');                            // 36
                  options.profile.name = signupInfo.username;                                                        // 37
                  signupInfo.username = signupInfo.username.toLowerCase().replace(/\s+/gm, '');                      // 38
                  options.username = signupInfo.username                                                             // 39
                }                                                                                                    // 40
            }                                                                                                        // 41
            if (options.email) {                                                                                     // 42
                signupInfo.email = options.email;                                                                    // 43
                                                                                                                     // 44
                if (AccountsTemplates.options.lowercaseUsername) {                                                   // 45
                  signupInfo.email = signupInfo.email.toLowerCase().replace(/\s+/gm, '');                            // 46
                  options.email = signupInfo.email                                                                   // 47
                }                                                                                                    // 48
            }                                                                                                        // 49
            if (options.password)                                                                                    // 50
                signupInfo.password = options.password;                                                              // 51
            var validationErrors = {};                                                                               // 52
            var someError = false;                                                                                   // 53
                                                                                                                     // 54
            // Validates fields values                                                                               // 55
            _.each(AccountsTemplates.getFields(), function(field){                                                   // 56
                var fieldId = field._id;                                                                             // 57
                var value = signupInfo[fieldId];                                                                     // 58
                if (fieldId === "password"){                                                                         // 59
                    // Can"t Pick-up password here                                                                   // 60
                    // NOTE: at this stage the password is already encripted,                                        // 61
                    //       so there is no way to validate it!!!                                                    // 62
                    check(value, Object);                                                                            // 63
                    return;                                                                                          // 64
                }                                                                                                    // 65
                var validationErr = field.validate(value, "strict");                                                 // 66
                if (validationErr) {                                                                                 // 67
                    validationErrors[fieldId] = validationErr;                                                       // 68
                    someError = true;                                                                                // 69
                }                                                                                                    // 70
            });                                                                                                      // 71
                                                                                                                     // 72
            if (AccountsTemplates.options.showReCaptcha) {                                                           // 73
                var secretKey = null;                                                                                // 74
                                                                                                                     // 75
                if (AccountsTemplates.options.reCaptcha && AccountsTemplates.options.reCaptcha.secretKey) {          // 76
                    secretKey = AccountsTemplates.options.reCaptcha.secretKey;                                       // 77
                }                                                                                                    // 78
                else {                                                                                               // 79
                    secretKey = Meteor.settings.reCaptcha.secretKey;                                                 // 80
                }                                                                                                    // 81
                                                                                                                     // 82
                var apiResponse = HTTP.post("https://www.google.com/recaptcha/api/siteverify", {                     // 83
                  params: {                                                                                          // 84
                      secret: secretKey,                                                                             // 85
                      response: options.profile.reCaptchaResponse,                                                   // 86
                      remoteip: this.connection.clientAddress,                                                       // 87
                  }                                                                                                  // 88
                }).data;                                                                                             // 89
                                                                                                                     // 90
                if (!apiResponse.success) {                                                                          // 91
                    throw new Meteor.Error(403, AccountsTemplates.texts.errors.captchaVerification,                  // 92
                      apiResponse['error-codes'] ? apiResponse['error-codes'].join(", ") : "Unknown Error.");        // 93
                }                                                                                                    // 94
            }                                                                                                        // 95
                                                                                                                     // 96
            if (someError)                                                                                           // 97
                throw new Meteor.Error(403, AccountsTemplates.texts.errors.validationErrors, validationErrors);      // 98
                                                                                                                     // 99
            // Possibly removes the profile field                                                                    // 100
            if (_.isEmpty(options.profile))                                                                          // 101
                delete options.profile;                                                                              // 102
                                                                                                                     // 103
            // Create user. result contains id and token.                                                            // 104
            var userId = Accounts.createUser(options);                                                               // 105
            // safety belt. createUser is supposed to throw on error. send 500 error                                 // 106
            // instead of sending a verification email with empty userid.                                            // 107
            if (! userId)                                                                                            // 108
                throw new Error("createUser failed to insert new user");                                             // 109
                                                                                                                     // 110
            // Send a email address verification email in case the context permits it                                // 111
            // and the specific configuration flag was set to true                                                   // 112
            if (options.email && AccountsTemplates.options.sendVerificationEmail)                                    // 113
                Accounts.sendVerificationEmail(userId, options.email);                                               // 114
        },                                                                                                           // 115
                                                                                                                     // 116
        // Resend a user's verification e-mail                                                                       // 117
        ATResendVerificationEmail: function (email) {                                                                // 118
            check(email, String);                                                                                    // 119
                                                                                                                     // 120
            var user = Meteor.users.findOne({ "emails.address": email });                                            // 121
                                                                                                                     // 122
            // Send the standard error back to the client if no user exist with this e-mail                          // 123
            if (!user)                                                                                               // 124
                throw new Meteor.Error(403, "User not found");                                                       // 125
                                                                                                                     // 126
            try {                                                                                                    // 127
                Accounts.sendVerificationEmail(user._id);                                                            // 128
            }                                                                                                        // 129
            catch (error) {                                                                                          // 130
                // Handle error when email already verified                                                          // 131
                // https://github.com/dwinston/send-verification-email-bug                                           // 132
                throw new Meteor.Error(403, "Already verified");                                                     // 133
            }                                                                                                        // 134
        },                                                                                                           // 135
    });                                                                                                              // 136
}                                                                                                                    // 137
                                                                                                                     // 138
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['useraccounts:core'] = {
  AccountsTemplates: AccountsTemplates
};

})();
