import intro from './modules/intro';
import scroll from './modules/scroll-controller';
import events from './modules/events';
import './modules/fp';

const $win = $(window);


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

disableScroll();
intro.enableParallax();

$('.header__link').on('click', (e) => {
    e.preventDefault();
    $.fn.fullpage.moveTo('intro');
});

$win.on('mousewheel DOMMouseScroll scroll touchmove', (e) => {
    if (!intro.wasAnimated()) {
        intro.disableParallax();
        intro.playAnimations();
    }
});

events.subscribe(events.names.INTRO_END_ANIMATIONS, enableScroll);

events.subscribe(events.names.FP_BEFORE_CHANGE, (props) => {
    let { slide, direction } = props;

    // slide.prev().prevAll().removeClass('next').addClass('prev');
    // slide.next().nextAll().removeClass('prev').addClass('next');

    switch (direction) {
    case 'down':
        slide.addClass('prev');
        break;
    case 'up':
        slide.addClass('next');
        break;
    }
});

events.subscribe(events.names.FP_LOOP_TOP, (props) => {
    console.log('loopTop');
    disableScroll();
    intro.playAnimationsReverse();
});

events.subscribe(events.names.FP_AFTER_CHANGE, (props) => {
    let { slide, index } = props;
    slide.removeClass('prev next');
    $('.pagination__link')
        .removeClass('is-active')
        .eq(index - 1)
        .addClass('is-active');
});

events.subscribe(events.names.FP_INTRO_FOCUSIN, () => {
    console.log('intro in focus');
    $('.links').removeClass('is-dark');
    $('.pagination').removeClass('is-dark');
});

events.subscribe(events.names.FP_INTRO_FOCUSOUT, () => {
    console.log('intro out of focus');
    $('.links').addClass('is-dark');
    $('.pagination').addClass('is-dark');
});
