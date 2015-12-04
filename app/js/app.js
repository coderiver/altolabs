import intro                                 from './modules/intro';
import scroll                                from './modules/scroll-controller';
import { pubSub, eventsNames }               from './modules/pub-sub';
import { animations, setAnimationsProgress } from './modules/animations';
import activateFullpage                      from './modules/fp';

const EVENTS_LIST   = 'mousewheel DOMMouseScroll touchmove';
const $root         = $('#fullpage');
const mq            = window.matchMedia('(min-width: 1024px)');
let lastSectionName = null;

// functions
function disableScroll() {
    scroll.disable();
    $.fn.fullpage.setAllowScrolling(false);
    $.fn.fullpage.setKeyboardScrolling(false);
}

function enableScroll() {
    scroll.enable();
    $.fn.fullpage.setAllowScrolling(true);
    $.fn.fullpage.setKeyboardScrolling(true);
}

function windowResizeHandler(e) {
    let matches = (e.target != null) ? e.target.matches : e.matches;
    if (matches) {
        setAnimationsProgress(0);
    } else {
        setAnimationsProgress(1);
    }
}

function scrollHandlerWhenOnIntro(e) {
    let direction = scroll.getDirection();
    let progress  = intro.animation.progress();

    console.log(direction);
    switch (direction) {
    case 'up':
        if (progress === 1) intro.animation.reverse();
        disableScroll();
        break;
    case 'down':
        if (progress === 1) {
            enableScroll();
        } else {
            intro.animation.play();
            setTimeout(enableScroll, 500);
        }
        break;
    }
}


// events
mq.addListener(function(e) {
    windowResizeHandler(e);
});

pubSub.on(eventsNames.FP_INIT, (props) => {
    let { slides } = props;
    let activeSlide = slides.filter('.active');

    activeSlide.prevAll().addClass('prev');
    activeSlide.nextAll().addClass('next');

    setTimeout(() => {
        disableScroll();
        if (intro.animation.progress() < 1) intro.enableParallax();
    }, 1);

    $('.scroll-down').click(() => {
        $root.trigger('mousewheel');
    });

    $('.intro__main-text .btn').on('click', $.fn.fullpage.moveSectionDown);
});

pubSub.on(eventsNames.FP_BEFORE_CHANGE, (props) => {
    let { slide, direction } = props;

    slide.prevAll().removeClass('next').addClass('prev');
    slide.nextAll().removeClass('prev').addClass('next');

    switch (direction) {
    case 'down':
        slide.addClass('prev');
        break;
    case 'up':
        slide.addClass('next');
        break;
    }
});

pubSub.on(eventsNames.FP_AFTER_CHANGE, (props) => {
    let { slide, index, anchorLink } = props;
    let sectionAnim = animations[anchorLink];
    let prevSectionAnim = animations[lastSectionName];

    slide.removeClass('prev next');

    $('.pagination__link')
        .removeClass('is-active')
        .eq(index - 1)
        .addClass('is-active');

    if (mq.matches) {
        if (sectionAnim) sectionAnim.play();
        if (prevSectionAnim) prevSectionAnim.progress(0).pause();
    }
    lastSectionName = anchorLink;
});

pubSub.on(eventsNames.FP_INTRO_FOCUSIN, () => {
    console.log('focus in');
    disableScroll();
    $root.on(EVENTS_LIST, scrollHandlerWhenOnIntro);
    $('.links, .pagination').removeClass('is-dark');
});

pubSub.on(eventsNames.FP_INTRO_FOCUSOUT, () => {
    console.log('focus out');
    enableScroll();
    $root.off(EVENTS_LIST, scrollHandlerWhenOnIntro);
    $('.links, .pagination').addClass('is-dark');
});


// initial actions
activateFullpage();
windowResizeHandler(mq);
