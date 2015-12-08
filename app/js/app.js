import intro                                 from './modules/intro';
import scroll                                from './modules/scroll-controller';
import { pubSub, eventsNames }               from './modules/pub-sub';
import { animations, setAnimationsProgress } from './modules/animations';
import { pagination }                        from './modules/pagination';
import activateFullpage                      from './modules/fp';

const EVENTS_LIST       = 'wheel';
const $root             = $('body');
const $paginationsLinks = $('.pagination__link');
const mq                = window.matchMedia('(min-width: 1024px)');
let introState          = null; // (swiched between 1 and 2)
let lastSectionName     = null;


// functions
function disableScroll() {
    console.log('scroll disable');
    scroll.disable();
    $.fn.fullpage.setAllowScrolling(false);
    $.fn.fullpage.setKeyboardScrolling(false);
}

function enableScroll() {
    console.log('scroll enable');
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

    switch (direction) {
    case 'up':
        pubSub.emit(eventsNames.INTRO_FIRST_STATE);
        break;
    case 'down':
        pubSub.emit(eventsNames.INTRO_SECOND_STATE);
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

    $('.scroll-down').click(() => {
        $paginationsLinks.eq(1).trigger('click');
    });

    $('.intro__main-text .btn').on('click', $.fn.fullpage.moveSectionDown);

    $('.header__link').on('click', function(e) {
        e.preventDefault();
        $paginationsLinks.first().trigger('click');
    });

    $paginationsLinks.on('click', function(e) {
        let $this = $(this);

        e.preventDefault();

        switch ($this.index()) {
        case 0:
            setTimeout(() => {
                pubSub.emit(eventsNames.INTRO_FIRST_STATE);
            }, 100);
            break;
        case 1:
            $.fn.fullpage.moveTo(1);
            setTimeout(() => {
                pubSub.emit(eventsNames.INTRO_SECOND_STATE);
            }, 100);
            return;
        }

        $.fn.fullpage.moveTo(this.hash.slice(1));
    });
});

pubSub.on(eventsNames.INTRO_FIRST_STATE, () => {
    let progress = intro.animation.progress();

    setTimeout(() => pagination.toggle(0), 700);

    if (introState === 1) return;
    console.log('state 1');

    intro.animation.reverse();
    intro.enableParallax();
    setTimeout(disableScroll, 0);

    introState = 1;
});

pubSub.on(eventsNames.INTRO_SECOND_STATE, () => {
    let progress = intro.animation.progress();

    setTimeout(() => pagination.toggle(1), 700);

    if (introState === 2) return;
    console.log('state 2');

    intro.disableParallax();
    intro.animation.play();
    setTimeout(enableScroll, 500);

    introState = 2;
});

pubSub.on(eventsNames.FP_BEFORE_CHANGE, (props) => {
    let { slide, direction, nextIndex } = props;

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

    if (mq.matches) {
        if (sectionAnim) sectionAnim.play();
        if (prevSectionAnim) prevSectionAnim.progress(0).pause();
    }

    if (index !== 1) {
        pagination.toggle(index - 1, true);
    }

    lastSectionName = anchorLink;
});

pubSub.on(eventsNames.FP_INTRO_FOCUSIN, (props) => {
    let { index, prevIndex } = props;
    console.log('focus in');

    $('.links, .pagination').removeClass('is-dark');

    $root.on(EVENTS_LIST, scrollHandlerWhenOnIntro);
    if (prevIndex === 2) pagination.toggle(1);
});

pubSub.once(eventsNames.FP_INTRO_FOCUSIN, (props) => {
    let { prevIndex } = props;
    if (prevIndex === null) pubSub.emit(eventsNames.INTRO_FIRST_STATE);
});

pubSub.on(eventsNames.FP_INTRO_FOCUSOUT, (props) => {
    console.log('focus out');

    $('.links, .pagination').addClass('is-dark');

    $root.off(EVENTS_LIST, scrollHandlerWhenOnIntro);
    if (mq.matches) {
        pubSub.emit(eventsNames.INTRO_SECOND_STATE);
    }
});


// initial actions
activateFullpage();
windowResizeHandler(mq);
