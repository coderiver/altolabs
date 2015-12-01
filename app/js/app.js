import intro from './modules/intro';
import scroll from './modules/scroll-controller';
import events from './modules/events';
import PageSlider from './modules/page-slider';
// import './modules/scroll-scenes';

const $win = $(window);

scroll.disable();
intro.enableParallax();

$win.on('mousewheel DOMMouseScroll scroll touchmove', (e) => {
    if (!intro.wasAnimated()) {
        intro.disableParallax();
        intro.playAnimations();
    }
});

$('.header__left .svg-icon').on('click', () => {
    intro.playAnimationsReverse();
});


PageSlider.setupSlides('.intro', '.main-content');

events.subscribe(events.names.INTRO_END_ANIMATIONS, () => {
    scroll.enable();
    let slideTL = PageSlider.slideFromTo('.intro', '.main-content');
    setTimeout(() => slideTL.reverse(), 4000);
    $('.header__left .svg-icon').one('click', () => {
        intro.playAnimationsReverse();
    });
});

// (() => {
//     const controller = new ScrollMagic.Controller({ container: 'body' });

//     new ScrollMagic.Scene({
//         duration: '100%',
//         triggerHook: 'onLeave',
//         triggerElement: 'body'
//     }).on('start', (e) => {
//         console.log(e);
//     }).setPin('.intro').addTo(controller);
// })();
//

