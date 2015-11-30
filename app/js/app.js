import intro from './modules/intro';
import scroll from './modules/scroll-controller';
import events from './modules/pub-sub';

const $win = $(window);

scroll.disable();
intro.enableParallax();

$win.on('mousewheel DOMMouseScroll touchmove', (e) => {
    if (!intro.wasAnimated()) {
        intro.disableParallax();
        intro.playAnimations();
    }
});

events.subscribe('introAnimEnd', scroll.enable);
