import { pubSub, eventsNames } from './pub-sub';

export default function activateFullpage() {
    const fp            = $('#fullpage');
    const slides        = fp.find('.section');
    const slideCount    = slides.length;
    let directionBefore = null;
    let prevIndex       = null;

    fp.fullpage({
        verticalCentered: false,
        scrollingSpeed: 1000,
        anchors: [ 'intro', 'qmedic', 'milkyway', 'rexpro' ],
        autoScrolling: true,
        scrollBar: true,
        fixedElements: null,
        navigation: false,
        navigationPosition: 'right',
        responsiveWidth: 900,
        responsiveHeight: 650,
        recordHistory: true,
        fitToSection: true,
        onLeave: function(index, nextIndex, direction) {
            let props = {
                slide: this,
                index,
                nextIndex,
                direction,
                slideCount
            };

            if (index === 1) {
                pubSub.emit(eventsNames.FP_INTRO_FOCUSOUT, props);
            }

            pubSub.emit(eventsNames.FP_BEFORE_CHANGE, props);

            directionBefore = direction;
            prevIndex = index;
        },
        afterLoad: function(anchorLink, index) {
            let props = { slide: this, anchorLink, index, prevIndex, directionBefore };

            if (index === 1) pubSub.emit(eventsNames.FP_INTRO_FOCUSIN, props);
            pubSub.emit(eventsNames.FP_AFTER_CHANGE, props);
        },
        afterRender: function() {
            pubSub.emit(eventsNames.FP_INIT, { slides });
        }
    });
}
