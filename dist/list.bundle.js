!function(t){var e={};function n(r){if(e[r])return e[r].exports;var o=e[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)n.d(r,o,function(e){return t[e]}.bind(null,o));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=133)}({133:function(t,e,n){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}n.r(e),n.d(e,"default",(function(){return o}));var o=function t(e){var n=this,o=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[];r(this,t),this.name=e,this.tasks=o,this.addTask=function(t){n.tasks.push(t)},this.removeTask=function(t){n.tasks.splice(t,1)},this.editTask=function(t,e){n.tasks[t].title=e.title,n.tasks[t].description=e.description,n.tasks[t].dueDate=e.dueDate,n.tasks[t].priority=e.priority,n.tasks[t].notes=e.notes}}}});
//# sourceMappingURL=list.bundle.js.map