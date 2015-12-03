import intro      from './modules/intro';
import scroll     from './modules/scroll-controller';
import events     from './modules/events';
import animations from './modules/animations';
import activateFullpage from './modules/fp';

const $win = $(window);
let lastSectionName = null;

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

$win.on('mousewheel DOMMouseScroll scroll touchmove', (e) => {
    if (!intro.wasAnimated()) {
        intro.disableParallax();
        intro.playAnimations();
    }
});

events.subscribe(events.names.FP_INIT, (props) => {
    let { slides } = props;
    let activeSlide = slides.filter('.active');
    activeSlide.prevAll().addClass('prev');
    activeSlide.nextAll().addClass('next');
});

events.subscribe(events.names.INTRO_END_ANIMATIONS, enableScroll);

events.subscribe(events.names.FP_BEFORE_CHANGE, (props) => {
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

events.subscribe(events.names.FP_AFTER_CHANGE, (props) => {
    let { slide, index, anchorLink } = props;
    let sectionAnim = animations[anchorLink];
    let prevSectionAnim = animations[lastSectionName];

    slide.removeClass('prev next');

    $('.pagination__link')
        .removeClass('is-active')
        .eq(index - 1)
        .addClass('is-active');

    if (sectionAnim) sectionAnim.play();
    if (prevSectionAnim) prevSectionAnim.progress(0).pause();
    lastSectionName = anchorLink;
});

events.subscribe(events.names.FP_LOOP_TOP, (props) => {
    disableScroll();
    intro.playAnimationsReverse();
});

events.subscribe(events.names.FP_INTRO_FOCUSIN, () => {
    $('.links').removeClass('is-dark');
    $('.pagination').removeClass('is-dark');
});

events.subscribe(events.names.FP_INTRO_FOCUSOUT, () => {
    $('.links').addClass('is-dark');
    $('.pagination').addClass('is-dark');
});


activateFullpage();
intro.enableParallax();
disableScroll();
