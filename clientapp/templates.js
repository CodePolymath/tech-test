(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory();
    } else if (typeof root["app"] === 'undefined' || root["app"] !== Object(root["app"])) {
        throw new Error('templatizer: window["app"] does not exist or is not an object');
    } else {
        root["app"].templatizer = factory();
    }
}(this, function () {
    var jade=function(){function r(r){return null!=r&&""!==r}function n(e){return Array.isArray(e)?e.map(n).filter(r).join(" "):e}var e={};return e.merge=function t(n,e){if(1===arguments.length){for(var a=n[0],s=1;s<n.length;s++)a=t(a,n[s]);return a}var i=n["class"],l=e["class"];(i||l)&&(i=i||[],l=l||[],Array.isArray(i)||(i=[i]),Array.isArray(l)||(l=[l]),n["class"]=i.concat(l).filter(r));for(var o in e)"class"!=o&&(n[o]=e[o]);return n},e.joinClasses=n,e.cls=function(r,t){for(var a=[],s=0;s<r.length;s++)a.push(t&&t[s]?e.escape(n([r[s]])):n(r[s]));var i=n(a);return i.length?' class="'+i+'"':""},e.attr=function(r,n,t,a){return"boolean"==typeof n||null==n?n?" "+(a?r:r+'="'+r+'"'):"":0==r.indexOf("data")&&"string"!=typeof n?" "+r+"='"+JSON.stringify(n).replace(/'/g,"&apos;")+"'":t?" "+r+'="'+e.escape(n)+'"':" "+r+'="'+n+'"'},e.attrs=function(r,t){var a=[],s=Object.keys(r);if(s.length)for(var i=0;i<s.length;++i){var l=s[i],o=r[l];"class"==l?(o=n(o))&&a.push(" "+l+'="'+o+'"'):a.push(e.attr(l,o,!1,t))}return a.join("")},e.escape=function(r){var n=String(r).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");return n===""+r?r:n},e.rethrow=function a(r,n,e,t){if(!(r instanceof Error))throw r;if(!("undefined"==typeof window&&n||t))throw r.message+=" on line "+e,r;try{t=t||require("fs").readFileSync(n,"utf8")}catch(s){a(r,null,e)}var i=3,l=t.split("\n"),o=Math.max(e-i,0),c=Math.min(l.length,e+i),i=l.slice(o,c).map(function(r,n){var t=n+o+1;return(t==e?"  > ":"    ")+t+"| "+r}).join("\n");throw r.path=n,r.message=(n||"Jade")+":"+e+"\n"+i+"\n\n"+r.message,r},e}();

    var templatizer = {};


    // home.jade compiled template
    templatizer["home"] = function tmpl_home() {
        return '<h1>Login to the Test App</h1><div class="form-inline"><h4>Please login below:</h4><div class="form-group"><label for="username">User Name:</label><input type="text" name="username" class="form-control"/></div><div class="form-group"><label for="password">Password:</label><input type="password" name="password" class="form-control"/></div><div class="form-group"><button id="btnLogin" type="button">Login</button></div></div><div id="divMessage" class="hidden"></div><button id="btnNewUser">New Users</button>';
    };

    // newuser.jade compiled template
    templatizer["newuser"] = function tmpl_newuser() {
        return '<h1>Create a New User</h1><div class="divNewUser"><h4>All data is required:</h4><div class="divUserData"><div class="form-group"><label for="username">User Name:</label><input type="text" name="username" class="form-control"/></div><div class="form-group"><label for="password">Password:</label><input type="password" name="password" class="form-control"/></div><div class="form-group"><label for="username">Email:</label><input type="text" name="email" class="form-control"/></div><div class="form-group"><label for="password">City:</label><input type="text" name="city" class="form-control"/></div><div class="form-group"><label for="username">State:</label><input type="text" name="state" maxlength="2" class="form-control"/></div><div class="form-group"><h5>Gender:</h5><label class="radio-inline control-label"><input id="radFemale" type="radio" name="gender" value="F" checked="checked"/>Female</label><label class="radio-inline control-label"><input id="radMale" type="radio" name="gender" value="M"/>Male</label></div><div class="form-group"><label for="username">Age:</label><input type="text" name="age" maxlength="3" class="form-control"/></div><div id="divMessage" class="hidden"></div><button type="button" id="btnCreate">Create New User</button></div></div>';
    };

    // users.jade compiled template
    templatizer["users"] = function tmpl_users(locals) {
        var buf = [];
        var jade_mixins = {};
        var jade_interp;
        var locals_for_with = locals || {};
        (function(models, undefined) {
            buf.push('<h1>Current Users</h1><div class="divCountrols"><div class="form-inline"><h4>Enter a filter:</h4><div class="form-group"><label for="selField">Field:</label><select id="selField"><option value="null">Please Select:</option><option value="city">City</option><option value="state">State</option><option value="gender">Gender</option></select><label for="selValue">Value:</label><select id="selValue"><option value="null">Please Select:</option></select><button id="btnReset" type="button">Reset</button></div></div></div><ul>');
            (function() {
                var $obj = models;
                if ("number" == typeof $obj.length) {
                    for (var $index = 0, $l = $obj.length; $index < $l; $index++) {
                        var model = $obj[$index];
                        if (model.showing) {
                            buf.push('<li class="list-unstyled"><dl class="dl-horizontal"><dt>UserName:</dt><dd>' + jade.escape(null == (jade_interp = model.attributes.username) ? "" : jade_interp) + "</dd><dt>Email:</dt><dd>" + jade.escape(null == (jade_interp = model.attributes.email) ? "" : jade_interp) + "</dd><dt>City:</dt><dd>" + jade.escape(null == (jade_interp = model.attributes.city) ? "" : jade_interp) + "</dd><dt>State:</dt><dd>" + jade.escape(null == (jade_interp = model.attributes.state) ? "" : jade_interp) + "</dd><dt>Age:</dt><dd>" + jade.escape(null == (jade_interp = model.attributes.age) ? "" : jade_interp) + "</dd><dt>Gender:</dt><dd>" + jade.escape(null == (jade_interp = model.attributes.gender) ? "" : jade_interp) + "</dd></dl></li>");
                        }
                    }
                } else {
                    var $l = 0;
                    for (var $index in $obj) {
                        $l++;
                        var model = $obj[$index];
                        if (model.showing) {
                            buf.push('<li class="list-unstyled"><dl class="dl-horizontal"><dt>UserName:</dt><dd>' + jade.escape(null == (jade_interp = model.attributes.username) ? "" : jade_interp) + "</dd><dt>Email:</dt><dd>" + jade.escape(null == (jade_interp = model.attributes.email) ? "" : jade_interp) + "</dd><dt>City:</dt><dd>" + jade.escape(null == (jade_interp = model.attributes.city) ? "" : jade_interp) + "</dd><dt>State:</dt><dd>" + jade.escape(null == (jade_interp = model.attributes.state) ? "" : jade_interp) + "</dd><dt>Age:</dt><dd>" + jade.escape(null == (jade_interp = model.attributes.age) ? "" : jade_interp) + "</dd><dt>Gender:</dt><dd>" + jade.escape(null == (jade_interp = model.attributes.gender) ? "" : jade_interp) + "</dd></dl></li>");
                        }
                    }
                }
            }).call(this);
            buf.push("</ul>");
        }).call(this, "models" in locals_for_with ? locals_for_with.models : typeof models !== "undefined" ? models : undefined, "undefined" in locals_for_with ? locals_for_with.undefined : typeof undefined !== "undefined" ? undefined : undefined);
        return buf.join("");
    };

    return templatizer;
}));