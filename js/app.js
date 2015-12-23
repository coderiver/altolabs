!function e(t,n,i){function r(o,s){if(!n[o]){if(!t[o]){var l="function"==typeof require&&require;if(!s&&l)return l(o,!0);if(a)return a(o,!0);var u=new Error("Cannot find module '"+o+"'");throw u.code="MODULE_NOT_FOUND",u}var c=n[o]={exports:{}};t[o][0].call(c.exports,function(e){var n=t[o][1][e];return r(n?n:e)},c,c.exports,e,t,n,i)}return n[o].exports}for(var a="function"==typeof require&&require,o=0;o<i.length;o++)r(i[o]);return r}({1:[function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{"default":e}}function r(){b.matches&&(d["default"].disable(),$.fn.fullpage.setAllowScrolling(!1),$.fn.fullpage.setKeyboardScrolling(!1))}function a(){d["default"].enable(),$.fn.fullpage.setAllowScrolling(!0),$.fn.fullpage.setKeyboardScrolling(!0)}function o(e){var t=null!=e.target?e.target.matches:e.matches;t?((0,p.setAnimationsProgress)(0),(0,v["default"])()):((0,p.setAnimationsProgress)(1),u["default"].animation.progress(0),"function"==typeof $.fn.fullpage.destroy&&$.fn.fullpage.destroy("all")),u["default"].toggleIntroTextVisibility()}function s(e){var t=d["default"].getDirection();if(b.matches)switch(t){case"up":f.pubSub.emit(f.eventsNames.INTRO_FIRST_STATE);break;case"down":f.pubSub.emit(f.eventsNames.INTRO_SECOND_STATE)}}var l=e("./modules/intro"),u=i(l),c=e("./modules/scroll-controller"),d=i(c),f=e("./modules/pub-sub"),p=e("./modules/animations"),m=e("./modules/pagination"),_=e("./modules/fp"),v=i(_),h="wheel",y=$("body"),g=$(".pagination__link"),b=window.matchMedia("(min-width: 1024px)"),T=null,x=null;b.addListener(function(e){o(e)}),f.pubSub.on(f.eventsNames.FP_INIT,function(e){var t=e.slides,n=t.filter(".active");n.prevAll().addClass("prev"),n.nextAll().addClass("next"),$(".scroll-down").on("click touchend",function(e){e.preventDefault(),g.eq(1).trigger("click")}),$(".intro__main-text .btn").on("click touchend",$.fn.fullpage.moveSectionDown),$(".header__link").on("click",function(e){e.preventDefault(),g.first().trigger("click")}),g.on("click",function(e){var t=$(this);switch(e.preventDefault(),t.index()){case 0:setTimeout(function(){f.pubSub.emit(f.eventsNames.INTRO_FIRST_STATE)},100);break;case 1:return $.fn.fullpage.moveTo(1),void setTimeout(function(){f.pubSub.emit(f.eventsNames.INTRO_SECOND_STATE)},100)}$.fn.fullpage.moveTo(this.hash.slice(1))})}),f.pubSub.on(f.eventsNames.INTRO_FIRST_STATE,function(){u["default"].animation.progress();setTimeout(function(){return m.pagination.toggle(0)},700),1!==T&&(u["default"].animation.reverse(),u["default"].enableParallax(),setTimeout(r,0),T=1)}),f.pubSub.on(f.eventsNames.INTRO_SECOND_STATE,function(){u["default"].animation.progress();setTimeout(function(){return m.pagination.toggle(1)},700),2!==T&&(u["default"].disableParallax(),u["default"].animation.play(),setTimeout(a,500),T=2)}),f.pubSub.on(f.eventsNames.FP_BEFORE_CHANGE,function(e){var t=e.slide,n=e.direction;e.nextIndex;switch(t.prevAll().removeClass("next").addClass("prev"),t.nextAll().removeClass("prev").addClass("next"),n){case"down":t.addClass("prev");break;case"up":t.addClass("next")}}),f.pubSub.on(f.eventsNames.FP_AFTER_CHANGE,function(e){var t=e.slide,n=e.index,i=e.anchorLink,r=p.animations[i],a=p.animations[x];t.removeClass("prev next"),b.matches&&(r&&r.play(),a&&a.progress(0).pause()),1!==n&&m.pagination.toggle(n-1,!0),x=i}),f.pubSub.on(f.eventsNames.FP_INTRO_FOCUSIN,function(e){var t=(e.index,e.prevIndex);$(".links, .pagination").removeClass("is-dark"),y.on(h,s),2===t&&m.pagination.toggle(1)}),f.pubSub.once(f.eventsNames.FP_INTRO_FOCUSIN,function(e){var t=e.prevIndex;null===t&&f.pubSub.emit(f.eventsNames.INTRO_FIRST_STATE)}),f.pubSub.on(f.eventsNames.FP_INTRO_FOCUSOUT,function(e){$(".links, .pagination").addClass("is-dark"),y.off(h,s),b.matches&&f.pubSub.emit(f.eventsNames.INTRO_SECOND_STATE)}),o(b)},{"./modules/animations":3,"./modules/fp":4,"./modules/intro":5,"./modules/pagination":6,"./modules/pub-sub":7,"./modules/scroll-controller":8}],2:[function(e,t,n){"use strict";function i(e){var t=e.find(".project__heading"),n=Power3.easeOut;return TweenMax.set(t,{y:-220,autoAlpha:0}),TweenMax.to(t,.3,{y:0,autoAlpha:1,ease:n})}function r(e){var t=e.find(".project__about .h3"),n=e.find(".project__about-line"),i=e.find(".project__description"),r=e.find(".project__about .btn"),a=Power3.easeOut;return TweenMax.set([t,n,i,r],{x:-150,autoAlpha:0}),[TweenMax.to(t,.5,{x:0,autoAlpha:1,ease:a}),TweenMax.to(n,.5,{x:0,autoAlpha:1,delay:.1,ease:a}),TweenMax.to(i,.5,{x:0,autoAlpha:1,delay:.2,ease:a}),TweenMax.to(r,.5,{x:0,autoAlpha:1,delay:.25,ease:a})]}Object.defineProperty(n,"__esModule",{value:!0}),n.createHeadingAnimFor=i,n.createAboutAnimFor=r},{}],3:[function(e,t,n){"use strict";function i(){var e=arguments.length<=0||void 0===arguments[0]?0:arguments[0];for(var t in f)f.hasOwnProperty(t)&&"intro"!==t&&f[t].progress(e)}Object.defineProperty(n,"__esModule",{value:!0}),n.animations=void 0,n.setAnimationsProgress=i;var r=e("./animations-base"),a=$(".project[data-animations=qmedic]"),o=$(".project[data-animations=milkyway]"),s=$(".project[data-animations=rexpro]"),l=new TimelineMax({paused:!0}),u=new TimelineMax({paused:!0}),c=new TimelineMax({paused:!0}),d=Power3.easeOut;l.add((0,r.createHeadingAnimFor)(a)).fromTo(a.find(".project__image"),.5,{yPercent:50,opacity:0},{yPercent:0,opacity:1,ease:d}).fromTo(a.find(".project__bg"),.5,{yPercent:100,opacity:0},{yPercent:0,opacity:1,ease:d},"-=0.2").add((0,r.createAboutAnimFor)(a),"-=0.5"),u.add((0,r.createHeadingAnimFor)(o)).add([TweenMax.fromTo(o.find(".milkyway"),.6,{yPercent:150,opacity:0},{yPercent:0,opacity:1,ease:d}),TweenMax.fromTo(o.find(".milkyway__layer-0"),.6,{x:200},{x:0,ease:d}),TweenMax.fromTo(o.find(".milkyway__layer-2"),.3,{x:-200,opacity:0},{x:0,delay:.3,opacity:1,ease:d}),TweenMax.fromTo(o.find(".bg-milkyway__layer-1"),.3,{xPercent:100,opacity:0},{xPercent:0,delay:.3,opacity:1,ease:d}),TweenMax.fromTo(o.find(".milkyway__layer-1"),.3,{yPercent:100,opacity:0},{yPercent:0,delay:.5,opacity:1,ease:d})]).add([TweenMax.fromTo(o.find(".bg-milkyway__layer-2"),.4,{yPercent:100,opacity:0},{yPercent:0,opacity:1,ease:d}),(0,r.createAboutAnimFor)(o)],"-=0.3"),c.add((0,r.createHeadingAnimFor)(s)).addLabel("begin",0).fromTo(s.find(".bg-rex-pro__layer-2"),.6,{xPercent:-100},{xPercent:0,ease:d}).fromTo(s.find(".project__image"),.5,{yPercent:70,opacity:0},{yPercent:0,opacity:1,ease:d},"begin+=0.2").fromTo(s.find(".bg-rex-pro__layer-3"),.6,{opacity:0},{opacity:1,ease:d},"begin+=0.5").add((0,r.createAboutAnimFor)(s),"begin+=0.5");var f=n.animations={qmedic:l,milkyway:u,rexpro:c}},{"./animations-base":2}],4:[function(e,t,n){"use strict";function i(){var e=$("#fullpage"),t=e.find(".section"),n=t.length,i=null,a=null;e.fullpage({verticalCentered:!1,scrollingSpeed:700,anchors:["intro","qmedic","milkyway","rexpro"],autoScrolling:!0,scrollBar:!1,fixedElements:null,navigation:!1,navigationPosition:"right",responsiveWidth:1024,responsiveHeight:650,recordHistory:!0,fitToSection:!0,easingcss3:"cubic-bezier(0.770, 0.000, 0.175, 1.000)",onLeave:function(e,t,o){var s={slide:this,index:e,nextIndex:t,direction:o,slideCount:n};1===e&&r.pubSub.emit(r.eventsNames.FP_INTRO_FOCUSOUT,s),r.pubSub.emit(r.eventsNames.FP_BEFORE_CHANGE,s),i=o,a=e},afterLoad:function(e,t){var n={slide:this,anchorLink:e,index:t,prevIndex:a,directionBefore:i};1===t&&r.pubSub.emit(r.eventsNames.FP_INTRO_FOCUSIN,n),r.pubSub.emit(r.eventsNames.FP_AFTER_CHANGE,n)},afterRender:function(){r.pubSub.emit(r.eventsNames.FP_INIT,{slides:t})}})}Object.defineProperty(n,"__esModule",{value:!0}),n["default"]=i;var r=e("./pub-sub")},{"./pub-sub":7}],5:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var i=e("./pub-sub");n["default"]=function(){function e(e){var t=e.pageX-window.innerWidth/2,n=e.pageY-window.innerHeight/2,i=.008*-t,r=.008*n,a=.5;TweenMax.to(u,a,{x:.005*t,y:.005*n,rotationX:r+"deg",rotationY:i+"deg"}),TweenMax.to(c,a,{x:.01*-t,y:.01*-n,rotationX:r+"deg",rotationY:i+"deg"}),TweenMax.to(d,a,{x:.025*-t,y:.025*-n,rotationX:r+"deg",rotationY:i+"deg"}),h&&TweenMax.to(f,a,{x:.015*-t,y:.015*-n,rotationX:r+"deg",rotationY:i+"deg"})}function t(){y||($(document).on("mousemove",e),y=!0)}function n(){y&&($(document).off("mousemove",e),TweenMax.to([u,c,d],.5,{x:0,y:0,rotationY:0,rotationX:0}),h&&TweenMax.to(f,.5,{x:0,y:0,rotationY:0,rotationX:0}),y=!1)}function r(){y?n():t()}function a(){var e=p[0].style.opacity,t="1"===e;TweenMax.set(p,{autoAlpha:t?0:1}),TweenMax.set(m,{opacity:t?0:1,y:0})}var o=$(".intro"),s=o.find(".parallax__row .char:not(.char-placeholder)"),l=o.find(".char-a"),u=(o.find(".parallax__inner"),o.find(".parallax__layer-1")),c=o.find(".parallax__layer-2"),d=o.find(".parallax__layer-3"),f=o.find(".parallax__layer-static"),p=o.find(".intro__main-text"),m=p.find(".btn"),_=o.find(".intro__triangle .svg-icon"),v=new TimelineMax({paused:!0}),h=/^((?!chrome|android).)*safari/i.test(navigator.userAgent),y=!1,g=300,b=[{duration:.2,delay:.4,y:-g},{duration:.2,delay:.5,y:-g},{duration:.2,delay:.4,y:g},{duration:.4,delay:0,y:-g},{duration:.4,delay:.175,y:-g},{duration:.25,delay:.25,y:-g},{duration:.3,delay:.3,y:-g},{duration:.4,delay:.05,y:g},{duration:.35,delay:.2,y:g},{duration:.2,delay:.35,y:g}];return v.add(b.map(function(e,t){return TweenMax.to(s[t],e.duration,{y:e.y,delay:e.delay,opacity:0,ease:Power1.easeInOut})},0)).add(function(){return o.toggleClass("is-animated")}).add([TweenMax.to(l[1],.5,{x:-$(window).width()/2,ease:Power1.easeInOut}),TweenMax.to(l[0],.5,{x:$(window).width()/2,ease:Power1.easeInOut}),TweenMax.to(_,.5,{scale:.625})],"-=0.1").fromTo(p,.5,{autoAlpha:0},{autoAlpha:1}).fromTo(m,.4,{y:100,opacity:0},{y:0,opacity:1,ease:Power1.easeInOut},"-=0.3").add(function(){i.pubSub.emit(i.eventsNames.INTRO_END_ANIMATIONS,{animation:v})}),{enableParallax:t,disableParallax:n,toggleParallax:r,animation:v,toggleIntroTextVisibility:a}}()},{"./pub-sub":7}],6:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0});n.pagination=function(){function e(e){var t=arguments.length<=1||void 0===arguments[1]?!1:arguments[1],n=t?a:r;("number"==typeof e||isFinite(e))&&(r.filter("."+i).removeClass(i),n.eq(e).addClass(i))}function t(){r.filter("."+i).removeClass(i)}var n=2,i="is-active",r=$(".pagination__link"),a=r.not(":nth-child("+n+")");return{toggle:e,reset:t}}()},{}],7:[function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(n,"__esModule",{value:!0}),n.eventsNames=n.pubSub=void 0;var r=e("events"),a=i(r);n.pubSub=new a["default"],n.eventsNames={INTRO_END_ANIMATIONS:"introAnimEnd",INTRO_FIRST_STATE:"introFirstState",INTRO_SECOND_STATE:"introSecondState",FP_INTRO_FOCUSIN:"fpIntroFocusIn",FP_INTRO_FOCUSOUT:"fpIntroFocusOut",FP_BEFORE_CHANGE:"fpBeforeChange",FP_AFTER_CHANGE:"fpAfterChange",FP_LOOP_TOP:"fpLoopTop",FP_INIT:"fpInit"}},{events:9}],8:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n["default"]=function(){function e(e){e.preventDefault()}function t(e){u=e.originalEvent.deltaY<=0?"up":"down"}function n(){l||(s.on("wheel",e),l=!0)}function i(){l&&(s.off("wheel",e),l=!1)}function r(){return l}function a(){return c}function o(e){return u}var s=$("body"),l=!1,u=null,c=$(window).scrollTop();return s.on("wheel",t),s.on("scroll",function(e){c=$(window).scrollTop()}),{disable:n,enable:i,isDisabled:r,getDirection:o,getScrollPos:a}}()},{}],9:[function(e,t,n){function i(){this._events=this._events||{},this._maxListeners=this._maxListeners||void 0}function r(e){return"function"==typeof e}function a(e){return"number"==typeof e}function o(e){return"object"==typeof e&&null!==e}function s(e){return void 0===e}t.exports=i,i.EventEmitter=i,i.prototype._events=void 0,i.prototype._maxListeners=void 0,i.defaultMaxListeners=10,i.prototype.setMaxListeners=function(e){if(!a(e)||0>e||isNaN(e))throw TypeError("n must be a positive number");return this._maxListeners=e,this},i.prototype.emit=function(e){var t,n,i,a,l,u;if(this._events||(this._events={}),"error"===e&&(!this._events.error||o(this._events.error)&&!this._events.error.length)){if(t=arguments[1],t instanceof Error)throw t;throw TypeError('Uncaught, unspecified "error" event.')}if(n=this._events[e],s(n))return!1;if(r(n))switch(arguments.length){case 1:n.call(this);break;case 2:n.call(this,arguments[1]);break;case 3:n.call(this,arguments[1],arguments[2]);break;default:a=Array.prototype.slice.call(arguments,1),n.apply(this,a)}else if(o(n))for(a=Array.prototype.slice.call(arguments,1),u=n.slice(),i=u.length,l=0;i>l;l++)u[l].apply(this,a);return!0},i.prototype.addListener=function(e,t){var n;if(!r(t))throw TypeError("listener must be a function");return this._events||(this._events={}),this._events.newListener&&this.emit("newListener",e,r(t.listener)?t.listener:t),this._events[e]?o(this._events[e])?this._events[e].push(t):this._events[e]=[this._events[e],t]:this._events[e]=t,o(this._events[e])&&!this._events[e].warned&&(n=s(this._maxListeners)?i.defaultMaxListeners:this._maxListeners,n&&n>0&&this._events[e].length>n&&(this._events[e].warned=!0,console.error("(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.",this._events[e].length),"function"==typeof console.trace&&console.trace())),this},i.prototype.on=i.prototype.addListener,i.prototype.once=function(e,t){function n(){this.removeListener(e,n),i||(i=!0,t.apply(this,arguments))}if(!r(t))throw TypeError("listener must be a function");var i=!1;return n.listener=t,this.on(e,n),this},i.prototype.removeListener=function(e,t){var n,i,a,s;if(!r(t))throw TypeError("listener must be a function");if(!this._events||!this._events[e])return this;if(n=this._events[e],a=n.length,i=-1,n===t||r(n.listener)&&n.listener===t)delete this._events[e],this._events.removeListener&&this.emit("removeListener",e,t);else if(o(n)){for(s=a;s-- >0;)if(n[s]===t||n[s].listener&&n[s].listener===t){i=s;break}if(0>i)return this;1===n.length?(n.length=0,delete this._events[e]):n.splice(i,1),this._events.removeListener&&this.emit("removeListener",e,t)}return this},i.prototype.removeAllListeners=function(e){var t,n;if(!this._events)return this;if(!this._events.removeListener)return 0===arguments.length?this._events={}:this._events[e]&&delete this._events[e],this;if(0===arguments.length){for(t in this._events)"removeListener"!==t&&this.removeAllListeners(t);return this.removeAllListeners("removeListener"),this._events={},this}if(n=this._events[e],r(n))this.removeListener(e,n);else if(n)for(;n.length;)this.removeListener(e,n[n.length-1]);return delete this._events[e],this},i.prototype.listeners=function(e){var t;return t=this._events&&this._events[e]?r(this._events[e])?[this._events[e]]:this._events[e].slice():[]},i.prototype.listenerCount=function(e){if(this._events){var t=this._events[e];if(r(t))return 1;if(t)return t.length}return 0},i.listenerCount=function(e,t){return e.listenerCount(t)}},{}]},{},[1]);
//# sourceMappingURL=app.js.map
