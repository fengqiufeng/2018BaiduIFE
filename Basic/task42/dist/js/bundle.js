!function(e){var n=window.webpackHotUpdate;window.webpackHotUpdate=function(e,t){!function(e,n){if(O[e]&&b[e]){for(var t in b[e]=!1,n)Object.prototype.hasOwnProperty.call(n,t)&&(h[t]=n[t]);0==--v&&0===w&&E()}}(e,t),n&&n(e,t)};var t,r=!0,o="9acf0a5524811a9f68eb",i=1e4,c={},d=[],a=[];function s(e){var n=P[e];if(!n)return H;var r=function(r){return n.hot.active?(P[r]?-1===P[r].parents.indexOf(e)&&P[r].parents.push(e):(d=[e],t=r),-1===n.children.indexOf(r)&&n.children.push(r)):(console.warn("[HMR] unexpected require("+r+") from disposed module "+e),d=[]),H(r)},o=function(e){return{configurable:!0,enumerable:!0,get:function(){return H[e]},set:function(n){H[e]=n}}};for(var i in H)Object.prototype.hasOwnProperty.call(H,i)&&"e"!==i&&Object.defineProperty(r,i,o(i));return r.e=function(e){return"ready"===f&&u("prepare"),w++,H.e(e).then(n,function(e){throw n(),e});function n(){w--,"prepare"===f&&(m[e]||D(e),0===w&&0===v&&E())}},r}var l=[],f="idle";function u(e){f=e;for(var n=0;n<l.length;n++)l[n].call(null,e)}var p,h,y,v=0,w=0,m={},b={},O={};function _(e){return+e+""===e?+e:e}function g(e){if("idle"!==f)throw new Error("check() is only allowed in idle status");return r=e,u("check"),(n=i,n=n||1e4,new Promise(function(e,t){if("undefined"==typeof XMLHttpRequest)return t(new Error("No browser support"));try{var r=new XMLHttpRequest,i=H.p+""+o+".hot-update.json";r.open("GET",i,!0),r.timeout=n,r.send(null)}catch(e){return t(e)}r.onreadystatechange=function(){if(4===r.readyState)if(0===r.status)t(new Error("Manifest request to "+i+" timed out."));else if(404===r.status)e();else if(200!==r.status&&304!==r.status)t(new Error("Manifest request to "+i+" failed."));else{try{var n=JSON.parse(r.responseText)}catch(e){return void t(e)}e(n)}}})).then(function(e){if(!e)return u("idle"),null;b={},m={},O=e.c,y=e.h,u("prepare");var n=new Promise(function(e,n){p={resolve:e,reject:n}});return h={},D(0),"prepare"===f&&0===w&&0===v&&E(),n});var n}function D(e){O[e]?(b[e]=!0,v++,function(e){var n=document.getElementsByTagName("head")[0],t=document.createElement("script");t.charset="utf-8",t.src=H.p+""+e+"."+o+".hot-update.js",n.appendChild(t)}(e)):m[e]=!0}function E(){u("ready");var e=p;if(p=null,e)if(r)Promise.resolve().then(function(){return j(r)}).then(function(n){e.resolve(n)},function(n){e.reject(n)});else{var n=[];for(var t in h)Object.prototype.hasOwnProperty.call(h,t)&&n.push(_(t));e.resolve(n)}}function j(n){if("ready"!==f)throw new Error("apply() is only allowed in ready status");var t,r,i,a,s;function l(e){for(var n=[e],t={},r=n.slice().map(function(e){return{chain:[e],id:e}});r.length>0;){var o=r.pop(),i=o.id,c=o.chain;if((a=P[i])&&!a.hot._selfAccepted){if(a.hot._selfDeclined)return{type:"self-declined",chain:c,moduleId:i};if(a.hot._main)return{type:"unaccepted",chain:c,moduleId:i};for(var d=0;d<a.parents.length;d++){var s=a.parents[d],l=P[s];if(l){if(l.hot._declinedDependencies[i])return{type:"declined",chain:c.concat([s]),moduleId:i,parentId:s};-1===n.indexOf(s)&&(l.hot._acceptedDependencies[i]?(t[s]||(t[s]=[]),p(t[s],[i])):(delete t[s],n.push(s),r.push({chain:c.concat([s]),id:s})))}}}}return{type:"accepted",moduleId:e,outdatedModules:n,outdatedDependencies:t}}function p(e,n){for(var t=0;t<n.length;t++){var r=n[t];-1===e.indexOf(r)&&e.push(r)}}n=n||{};var v={},w=[],m={},b=function(){console.warn("[HMR] unexpected require("+D.moduleId+") to disposed module")};for(var g in h)if(Object.prototype.hasOwnProperty.call(h,g)){var D;s=_(g);var E=!1,j=!1,x=!1,I="";switch((D=h[g]?l(s):{type:"disposed",moduleId:g}).chain&&(I="\nUpdate propagation: "+D.chain.join(" -> ")),D.type){case"self-declined":n.onDeclined&&n.onDeclined(D),n.ignoreDeclined||(E=new Error("Aborted because of self decline: "+D.moduleId+I));break;case"declined":n.onDeclined&&n.onDeclined(D),n.ignoreDeclined||(E=new Error("Aborted because of declined dependency: "+D.moduleId+" in "+D.parentId+I));break;case"unaccepted":n.onUnaccepted&&n.onUnaccepted(D),n.ignoreUnaccepted||(E=new Error("Aborted because "+s+" is not accepted"+I));break;case"accepted":n.onAccepted&&n.onAccepted(D),j=!0;break;case"disposed":n.onDisposed&&n.onDisposed(D),x=!0;break;default:throw new Error("Unexception type "+D.type)}if(E)return u("abort"),Promise.reject(E);if(j)for(s in m[s]=h[s],p(w,D.outdatedModules),D.outdatedDependencies)Object.prototype.hasOwnProperty.call(D.outdatedDependencies,s)&&(v[s]||(v[s]=[]),p(v[s],D.outdatedDependencies[s]));x&&(p(w,[D.moduleId]),m[s]=b)}var k,M=[];for(r=0;r<w.length;r++)s=w[r],P[s]&&P[s].hot._selfAccepted&&M.push({module:s,errorHandler:P[s].hot._selfAccepted});u("dispose"),Object.keys(O).forEach(function(e){!1===O[e]&&function(e){delete installedChunks[e]}(e)});for(var A,T,U=w.slice();U.length>0;)if(s=U.pop(),a=P[s]){var q={},L=a.hot._disposeHandlers;for(i=0;i<L.length;i++)(t=L[i])(q);for(c[s]=q,a.hot.active=!1,delete P[s],delete v[s],i=0;i<a.children.length;i++){var R=P[a.children[i]];R&&(k=R.parents.indexOf(s))>=0&&R.parents.splice(k,1)}}for(s in v)if(Object.prototype.hasOwnProperty.call(v,s)&&(a=P[s]))for(T=v[s],i=0;i<T.length;i++)A=T[i],(k=a.children.indexOf(A))>=0&&a.children.splice(k,1);for(s in u("apply"),o=y,m)Object.prototype.hasOwnProperty.call(m,s)&&(e[s]=m[s]);var S=null;for(s in v)if(Object.prototype.hasOwnProperty.call(v,s)&&(a=P[s])){T=v[s];var N=[];for(r=0;r<T.length;r++)if(A=T[r],t=a.hot._acceptedDependencies[A]){if(-1!==N.indexOf(t))continue;N.push(t)}for(r=0;r<N.length;r++){t=N[r];try{t(T)}catch(e){n.onErrored&&n.onErrored({type:"accept-errored",moduleId:s,dependencyId:T[r],error:e}),n.ignoreErrored||S||(S=e)}}}for(r=0;r<M.length;r++){var C=M[r];s=C.module,d=[s];try{H(s)}catch(e){if("function"==typeof C.errorHandler)try{C.errorHandler(e)}catch(t){n.onErrored&&n.onErrored({type:"self-accept-error-handler-errored",moduleId:s,error:t,originalError:e}),n.ignoreErrored||S||(S=t),S||(S=e)}else n.onErrored&&n.onErrored({type:"self-accept-errored",moduleId:s,error:e}),n.ignoreErrored||S||(S=e)}}return S?(u("fail"),Promise.reject(S)):(u("idle"),new Promise(function(e){e(w)}))}var P={};function H(n){if(P[n])return P[n].exports;var r=P[n]={i:n,l:!1,exports:{},hot:function(e){var n={_acceptedDependencies:{},_declinedDependencies:{},_selfAccepted:!1,_selfDeclined:!1,_disposeHandlers:[],_main:t!==e,active:!0,accept:function(e,t){if(void 0===e)n._selfAccepted=!0;else if("function"==typeof e)n._selfAccepted=e;else if("object"==typeof e)for(var r=0;r<e.length;r++)n._acceptedDependencies[e[r]]=t||function(){};else n._acceptedDependencies[e]=t||function(){}},decline:function(e){if(void 0===e)n._selfDeclined=!0;else if("object"==typeof e)for(var t=0;t<e.length;t++)n._declinedDependencies[e[t]]=!0;else n._declinedDependencies[e]=!0},dispose:function(e){n._disposeHandlers.push(e)},addDisposeHandler:function(e){n._disposeHandlers.push(e)},removeDisposeHandler:function(e){var t=n._disposeHandlers.indexOf(e);t>=0&&n._disposeHandlers.splice(t,1)},check:g,apply:j,status:function(e){if(!e)return f;l.push(e)},addStatusHandler:function(e){l.push(e)},removeStatusHandler:function(e){var n=l.indexOf(e);n>=0&&l.splice(n,1)},data:c[e]};return t=void 0,n}(n),parents:(a=d,d=[],a),children:[]};return e[n].call(r.exports,r,r.exports,s(n)),r.l=!0,r.exports}H.m=e,H.c=P,H.d=function(e,n,t){H.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:t})},H.r=function(e){Object.defineProperty(e,"__esModule",{value:!0})},H.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return H.d(n,"a",n),n},H.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},H.p="",H.h=function(){return o},s(4)(H.s=4)}([function(e,n,t){"use strict";function r(e){this.cash=e.cash,this.seats=e.seats,this.staff=e.staff}function o(e,n){this.name=e,this.salary=n}Object.defineProperty(n,"__esModule",{value:!0}),r.prototype.hire=function(e){this.staff.push(e)},r.prototype.fire=function(e){for(var n in this.staff)this.staff[n]==e&&this.staff.splice(n,1)},o.prototype.finish=function(){console.log("工作已完成")},n.toTest=function(){var e=new r({cash:1e6,seats:20,staff:[]}),n=new function(e,n){o.call(this,"Tony",1e4)}("Tony",1e4);e.hire(n),console.log(e.staff),e.fire(n),console.log(e.staff)}},function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.addLoadEvent=function(e){var n=window.onload;"function"!=typeof window.onload?window.onload=e:window.onload=function(){n(),e()}}},,function(e,n,t){},function(e,n,t){"use strict";t(3);var r=t(1),o=t(0);(0,r.addLoadEvent)((0,o.toTest)())}]);