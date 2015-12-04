!function e(t,n,i){function r(a,s){if(!n[a]){if(!t[a]){var l="function"==typeof require&&require;if(!s&&l)return l(a,!0);if(o)return o(a,!0);var u=new Error("Cannot find module '"+a+"'");throw u.code="MODULE_NOT_FOUND",u}var c=n[a]={exports:{}};t[a][0].call(c.exports,function(e){var n=t[a][1][e];return r(n?n:e)},c,c.exports,e,t,n,i)}return n[a].exports}for(var o="function"==typeof require&&require,a=0;a<i.length;a++)r(i[a]);return r}({1:[function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{"default":e}}function r(){c["default"].disable(),$.fn.fullpage.setAllowScrolling(!1),$.fn.fullpage.setKeyboardScrolling(!1)}function o(){c["default"].enable(),$.fn.fullpage.setAllowScrolling(!0),$.fn.fullpage.setKeyboardScrolling(!0)}function a(e){var t=null!=e.target?e.target.matches:e.matches;t?(0,f.setAnimationsProgress)(0):(0,f.setAnimationsProgress)(1)}var s=e("./modules/intro"),l=i(s),u=e("./modules/scroll-controller"),c=i(u),d=e("./modules/pub-sub"),f=e("./modules/animations"),p=e("./modules/fp"),m=i(p),v=$(window),_=window.matchMedia("(min-width: 1024px)"),h=null;_.addListener(function(e){a(e)}),d.pubSub.on(d.eventsNames.FP_INIT,function(e){var t=e.slides,n=t.filter(".active");n.prevAll().addClass("prev"),n.nextAll().addClass("next"),setTimeout(function(){r(),l["default"].enableParallax()},1),$(".scroll-down").click(function(){v.trigger("mousewheel"),v.trigger("DOMMouseScroll")}),$(".intro__main-text .btn").on("click",$.fn.fullpage.moveSectionDown)}),d.pubSub.on(d.eventsNames.FP_BEFORE_CHANGE,function(e){var t=e.slide,n=e.direction;switch(t.prevAll().removeClass("next").addClass("prev"),t.nextAll().removeClass("prev").addClass("next"),n){case"down":t.addClass("prev");break;case"up":t.addClass("next")}}),d.pubSub.on(d.eventsNames.FP_AFTER_CHANGE,function(e){var t=e.slide,n=e.index,i=e.anchorLink,r=f.animations[i],o=f.animations[h];t.removeClass("prev next"),$(".pagination__link").removeClass("is-active").eq(n-1).addClass("is-active"),_.matches&&(r&&r.play(),o&&o.progress(0).pause()),h=i}),v.on("mousewheel DOMMouseScroll",function(){console.log(c["default"].getDirection())}),d.pubSub.on(d.eventsNames.FP_INTRO_FOCUSIN,function(){1===l["default"].animation.progress()&&l["default"].animation.reverse(),l["default"].enableParallax(),r(),d.pubSub.once(d.eventsNames.INTRO_END_ANIMATIONS,o),v.one("mousewheel DOMMouseScroll touchmove",function(e){l["default"].disableParallax(),l["default"].animation.play()}),$(".links, .pagination").removeClass("is-dark")}),d.pubSub.on(d.eventsNames.FP_INTRO_FOCUSOUT,function(){$(".links, .pagination").addClass("is-dark")}),(0,m["default"])(),a(_)},{"./modules/animations":3,"./modules/fp":4,"./modules/intro":5,"./modules/pub-sub":6,"./modules/scroll-controller":7}],2:[function(e,t,n){"use strict";function i(e){var t=e.find(".project__heading"),n=Power1.easeInOut;return TweenMax.set(t,{y:-220,autoAlpha:0}),TweenMax.to(t,.5,{y:0,autoAlpha:1,ease:n})}function r(e){var t=e.find(".project__about .h3"),n=e.find(".project__about-line"),i=e.find(".project__description"),r=e.find(".project__about .btn"),o=Power1.easeInOut;return TweenMax.set([t,n,i,r],{x:-200,autoAlpha:0}),[TweenMax.to(t,1.175,{x:0,autoAlpha:1,ease:o}),TweenMax.to(n,1,{x:0,autoAlpha:1,delay:.2,ease:o}),TweenMax.to(i,.75,{x:0,autoAlpha:1,delay:.75,ease:o}),TweenMax.to(r,.5,{x:0,autoAlpha:1,delay:1,ease:o})]}Object.defineProperty(n,"__esModule",{value:!0}),n.createHeadingAnimFor=i,n.createAboutAnimFor=r},{}],3:[function(e,t,n){"use strict";function i(){var e=arguments.length<=0||void 0===arguments[0]?0:arguments[0];for(var t in f)f.hasOwnProperty(t)&&"intro"!==t&&f[t].progress(e)}Object.defineProperty(n,"__esModule",{value:!0}),n.animations=void 0,n.setAnimationsProgress=i;var r=e("./animations-base"),o=$(".project[data-animations=qmedic]"),a=$(".project[data-animations=milkyway]"),s=$(".project[data-animations=rexpro]"),l=new TimelineMax({paused:!0}),u=new TimelineMax({paused:!0}),c=new TimelineMax({paused:!0}),d=Power1.easeInOut;l.add((0,r.createHeadingAnimFor)(o)).fromTo(o.find(".project__bg"),.5,{yPercent:100,opacity:0},{yPercent:0,opacity:1,ease:d}).fromTo(o.find(".project__image"),1,{yPercent:100,opacity:0},{yPercent:0,opacity:1,ease:d}).add((0,r.createAboutAnimFor)(o)),u.add((0,r.createHeadingAnimFor)(a)).fromTo(a.find(".bg-milkyway__layer-2"),.5,{yPercent:100,opacity:0},{yPercent:0,opacity:1,ease:d}).add([TweenMax.fromTo(a.find(".milkyway"),1,{yPercent:150,opacity:0},{yPercent:0,opacity:1,ease:d}),TweenMax.fromTo(a.find(".milkyway__layer-0"),1,{x:200},{x:0,ease:d}),TweenMax.fromTo(a.find(".milkyway__layer-2"),.5,{x:-200,opacity:0},{x:0,delay:.5,opacity:1,ease:d})]).add([TweenMax.fromTo(a.find(".bg-milkyway__layer-1"),.5,{xPercent:100,opacity:0},{xPercent:0,opacity:1,ease:d}),TweenMax.fromTo(a.find(".milkyway__layer-1"),.5,{yPercent:100,opacity:0},{yPercent:0,opacity:1,ease:d})]).add((0,r.createAboutAnimFor)(a)),c.add((0,r.createHeadingAnimFor)(s)).fromTo(s.find(".bg-rex-pro__layer-2"),.5,{xPercent:-100},{xPercent:0,ease:d}).fromTo(s.find(".bg-rex-pro__layer-3"),.5,{opacity:0},{opacity:1,ease:d}).fromTo(s.find(".project__image"),.7,{yPercent:150,opacity:0},{yPercent:0,opacity:1,ease:d},"-=0.3").add((0,r.createAboutAnimFor)(s));var f=n.animations={qmedic:l,milkyway:u,rexpro:c}},{"./animations-base":2}],4:[function(e,t,n){"use strict";function i(){var e=$("#fullpage"),t=e.find(".section"),n=t.length;e.fullpage({verticalCentered:!1,scrollingSpeed:1e3,anchors:["intro","qmedic","milkyway","rexpro"],autoScrolling:!0,scrollBar:!0,fixedElements:null,navigation:!1,navigationPosition:"right",responsiveWidth:900,responsiveHeight:650,onLeave:function(e,t,i){var o={slide:this,index:e,nextIndex:t,direction:i,slideCount:n};r.pubSub.emit(r.eventsNames.FP_BEFORE_CHANGE,o),1===e&&r.pubSub.emit(r.eventsNames.FP_INTRO_FOCUSOUT,o)},afterLoad:function(e,t){var n={slide:this,anchorLink:e,index:t};1===t&&r.pubSub.emit(r.eventsNames.FP_INTRO_FOCUSIN,n),r.pubSub.emit(r.eventsNames.FP_AFTER_CHANGE,n)},afterRender:function(){r.pubSub.emit(r.eventsNames.FP_INIT,{slides:t})}})}Object.defineProperty(n,"__esModule",{value:!0}),n["default"]=i;var r=e("./pub-sub")},{"./pub-sub":6}],5:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var i=e("./pub-sub");n["default"]=function(){function e(e){var t=.008*(e.pageX-window.innerWidth/2);TweenMax.set(s,{rotationY:t+"deg"})}function t(){f||($(document).on("mousemove",e),f=!0)}function n(){f&&($(document).off("mousemove",e),TweenMax.to(s,1,{rotationY:0}),f=!1)}var r=$(".intro"),o=r.find(".intro__row .char:not(.char-placeholder)"),a=r.find(".char-a, .char-a-shadow"),s=r.find(".intro__parallax-layer-1, .intro__parallax-layer-3"),l=r.find(".intro__main-text"),u=l.find(".btn"),c=r.find(".intro__triangle .svg-icon"),d=new TimelineMax({paused:!0}),f=!1,p=200,m=[{duration:.5,delay:0,y:-p},{duration:.5,delay:.175,y:-p},{duration:.25,delay:.4,y:-p},{duration:.25,delay:.5,y:-p},{duration:.4,delay:.25,y:-p},{duration:.4,delay:.4,y:-p},{duration:.5,delay:.05,y:p},{duration:.25,delay:.5,y:p},{duration:.4,delay:.25,y:p},{duration:.25,delay:.45,y:p}];return TweenMax.set(l,{position:"absolute",top:"50%",left:0,right:0,autoAlpha:0}),TweenMax.set(u,{y:100,opacity:0}),d.add(m.map(function(e,t){return TweenMax.to(o[t],e.duration,{y:e.y,delay:e.delay,opacity:0,ease:Power1.easeInOut})},0)).add(function(){return r.toggleClass("is-animated")}).add([TweenMax.to(a[1],1,{x:-700,ease:Power1.easeInOut}),TweenMax.to(a[0],1,{x:700,ease:Power1.easeInOut}),TweenMax.to(c,.5,{scale:.625})]).to(l,.75,{autoAlpha:1}).to(u,.5,{y:0,opacity:1,ease:Power1.easeInOut},"-=0.3").add(function(){i.pubSub.emit(i.eventsNames.INTRO_END_ANIMATIONS,{animation:d})}),{enableParallax:t,disableParallax:n,animation:d}}()},{"./pub-sub":6}],6:[function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(n,"__esModule",{value:!0}),n.eventsNames=n.pubSub=void 0;var r=e("events"),o=i(r);n.pubSub=new o["default"],n.eventsNames={INTRO_END_ANIMATIONS:"introAnimEnd",FP_INTRO_FOCUSIN:"fpIntroFocusIn",FP_INTRO_FOCUSOUT:"fpIntroFocusOut",FP_BEFORE_CHANGE:"fpBeforeChange",FP_AFTER_CHANGE:"fpAfterChange",FP_LOOP_TOP:"fpLoopTop",FP_INIT:"fpInit"}},{events:8}],7:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n["default"]=function(){function e(e){e.preventDefault()}function t(e){c=e.originalEvent.wheelDelta>=0?"up":"down"}function n(e){c=e.originalEvent.detail<=0?"up":"down"}function i(){u||(l.on("mousewheel DOMMouseScroll touchmove",e),u=!0)}function r(){u&&(l.off("mousewheel DOMMouseScroll touchmove",e),u=!1)}function o(){return u}function a(){return d}function s(e){return c}var l=$(window),u=!1,c="down",d=l.scrollTop();return l.on("scroll",function(e){d=l.scrollTop()}),$("body").on("mousewheel",t),$("body").on("DOMMouseScroll",n),{disable:i,enable:r,isDisabled:o,getDirection:s,getScrollPos:a}}()},{}],8:[function(e,t,n){function i(){this._events=this._events||{},this._maxListeners=this._maxListeners||void 0}function r(e){return"function"==typeof e}function o(e){return"number"==typeof e}function a(e){return"object"==typeof e&&null!==e}function s(e){return void 0===e}t.exports=i,i.EventEmitter=i,i.prototype._events=void 0,i.prototype._maxListeners=void 0,i.defaultMaxListeners=10,i.prototype.setMaxListeners=function(e){if(!o(e)||0>e||isNaN(e))throw TypeError("n must be a positive number");return this._maxListeners=e,this},i.prototype.emit=function(e){var t,n,i,o,l,u;if(this._events||(this._events={}),"error"===e&&(!this._events.error||a(this._events.error)&&!this._events.error.length)){if(t=arguments[1],t instanceof Error)throw t;throw TypeError('Uncaught, unspecified "error" event.')}if(n=this._events[e],s(n))return!1;if(r(n))switch(arguments.length){case 1:n.call(this);break;case 2:n.call(this,arguments[1]);break;case 3:n.call(this,arguments[1],arguments[2]);break;default:o=Array.prototype.slice.call(arguments,1),n.apply(this,o)}else if(a(n))for(o=Array.prototype.slice.call(arguments,1),u=n.slice(),i=u.length,l=0;i>l;l++)u[l].apply(this,o);return!0},i.prototype.addListener=function(e,t){var n;if(!r(t))throw TypeError("listener must be a function");return this._events||(this._events={}),this._events.newListener&&this.emit("newListener",e,r(t.listener)?t.listener:t),this._events[e]?a(this._events[e])?this._events[e].push(t):this._events[e]=[this._events[e],t]:this._events[e]=t,a(this._events[e])&&!this._events[e].warned&&(n=s(this._maxListeners)?i.defaultMaxListeners:this._maxListeners,n&&n>0&&this._events[e].length>n&&(this._events[e].warned=!0,console.error("(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.",this._events[e].length),"function"==typeof console.trace&&console.trace())),this},i.prototype.on=i.prototype.addListener,i.prototype.once=function(e,t){function n(){this.removeListener(e,n),i||(i=!0,t.apply(this,arguments))}if(!r(t))throw TypeError("listener must be a function");var i=!1;return n.listener=t,this.on(e,n),this},i.prototype.removeListener=function(e,t){var n,i,o,s;if(!r(t))throw TypeError("listener must be a function");if(!this._events||!this._events[e])return this;if(n=this._events[e],o=n.length,i=-1,n===t||r(n.listener)&&n.listener===t)delete this._events[e],this._events.removeListener&&this.emit("removeListener",e,t);else if(a(n)){for(s=o;s-- >0;)if(n[s]===t||n[s].listener&&n[s].listener===t){i=s;break}if(0>i)return this;1===n.length?(n.length=0,delete this._events[e]):n.splice(i,1),this._events.removeListener&&this.emit("removeListener",e,t)}return this},i.prototype.removeAllListeners=function(e){var t,n;if(!this._events)return this;if(!this._events.removeListener)return 0===arguments.length?this._events={}:this._events[e]&&delete this._events[e],this;if(0===arguments.length){for(t in this._events)"removeListener"!==t&&this.removeAllListeners(t);return this.removeAllListeners("removeListener"),this._events={},this}if(n=this._events[e],r(n))this.removeListener(e,n);else if(n)for(;n.length;)this.removeListener(e,n[n.length-1]);return delete this._events[e],this},i.prototype.listeners=function(e){var t;return t=this._events&&this._events[e]?r(this._events[e])?[this._events[e]]:this._events[e].slice():[]},i.prototype.listenerCount=function(e){if(this._events){var t=this._events[e];if(r(t))return 1;if(t)return t.length}return 0},i.listenerCount=function(e,t){return e.listenerCount(t)}},{}]},{},[1]);
//# sourceMappingURL=app.js.map
