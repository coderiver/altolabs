import intro                                 from './modules/intro';
import scroll                                from './modules/scroll-controller';
import { pubSub, eventsNames }               from './modules/pub-sub';
import { animations, setAnimationsProgress } from './modules/animations';
import { pagination }                        from './modules/pagination';
import activateFullpage                      from './modules/fp';
import throttle                              from 'lodash.throttle';
// import debounce                              from 'lodash.debounce';

const EVENTS_LIST       = 'wheel';
const $root             = $('body');
const $paginationsLinks = $('.pagination__link');
const mq                = window.matchMedia('(min-width: 1024px)');
let introState          = null; // (swiched between 1 and 2)
let lastSectionName     = null;
let wheeling            = null;
let flag                = 0;


// functions
function disableScroll() {
    if (!mq.matches) return;
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
    let matches = e.matches;
    if (matches) {
        setAnimationsProgress(0);
        activateFullpage();
        $root.removeClass('mobile');
    } else {
        // complete animations for section on mobile
        $root.addClass('mobile');
        setAnimationsProgress(1);
        intro.animation.progress(0);
        intro.disableParallax();
        scroll.enable();
        if (typeof $.fn.fullpage.destroy === 'function') {
            $.fn.fullpage.destroy('all');
        }
        $('.links.is-dark').removeClass('is-dark');
    }
    intro.toggleIntroTextVisibility();
}

// const scrollHandlerWhenOnIntro = throttle((e) => {
//     let direction = scroll.getDirection();
//
//     if (!mq.matches) return;
//     switch (direction) {
//     case 'up':
//         pubSub.emit(eventsNames.INTRO_FIRST_STATE);
//         break;
//     case 'down':
//         pubSub.emit(eventsNames.INTRO_SECOND_STATE);
//         break;
//     }
// }, 200, {trailing: false});

function scrollHandlerWhenOnIntro(e) {
    console.log(flag);
    if (flag) console.log('not going anywhere');
    if (flag) return;
    flag = 1;
    let direction = scroll.getDirection();

    if (!mq.matches) return;



    clearTimeout(wheeling);
    wheeling = setTimeout(() => {
        console.log('end scroll');
        flag = 0;
    }, 1000);

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

    $('.scroll-down').on('click touchend', (e) => {
        e.preventDefault();
        $paginationsLinks.eq(1).trigger('click');
    });

    $('.intro__main-text .btn').on('click touchend', $.fn.fullpage.moveSectionDown);

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

    intro.animation.reverse();
    intro.enableParallax();
    setTimeout(disableScroll, 0);

    introState = 1;
});

pubSub.on(eventsNames.INTRO_SECOND_STATE, () => {
    let progress = intro.animation.progress();

    setTimeout(() => pagination.toggle(1), 700);

    if (introState === 2) return;

    intro.disableParallax();
    intro.animation.play();
    setTimeout(enableScroll, 2500);

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

    $('.links, .pagination').removeClass('is-dark');

    $root.on(EVENTS_LIST, scrollHandlerWhenOnIntro);
    if (prevIndex === 2) pagination.toggle(1);
});

pubSub.once(eventsNames.FP_INTRO_FOCUSIN, (props) => {
    let { prevIndex } = props;
    if (prevIndex === null) pubSub.emit(eventsNames.INTRO_FIRST_STATE);
});

pubSub.on(eventsNames.FP_INTRO_FOCUSOUT, (props) => {
    $('.links, .pagination').addClass('is-dark');

    $root.off(EVENTS_LIST, scrollHandlerWhenOnIntro);
    if (mq.matches) {
        pubSub.emit(eventsNames.INTRO_SECOND_STATE);
    }
});


// initial actions
$(document).ready(function() {
    $('body').addClass('in');

    $('.header__link').on('click', (e) => {
        if (mq.matches) return;
        e.preventDefault();
        $('html, body').animate({
            scrollTop: 0
        }, 500);
    });

    setTimeout(() => intro.demonstarateParallax(!mq.matches), 1000);
});

windowResizeHandler(mq);
