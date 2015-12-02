import events from './events';

(() => {
    const fp = $('#fullpage');
    const slideCount = fp.find('.section').length;

    fp.fullpage({
        verticalCentered: false,
        scrollingSpeed: 1000,
        anchors: [ 'intro', 'qmedic', 'milkyway', 'rexpro' ],
        autoScrolling: true,
        scrollBar: true,
        fixedElements: null,
        navigation: false,
        navigationPosition: 'right',
        responsiveWidth: 1023,
        responsiveHeight: 700,
        loopTop: true, // important
        onLeave: function(index, nextIndex, direction) {
            let props = {
                slide: this,
                index,
                nextIndex,
                direction,
                slideCount
            };

            events.publish(events.names.FP_BEFORE_CHANGE, props);
            if (index === 1) {
                if (nextIndex === slideCount) {
                    events.publish(events.names.FP_LOOP_TOP, props);
                    return false;
                }
                events.publish(events.names.FP_INTRO_FOCUSOUT, props);
            }
        },
        afterLoad: function(anchorLink, index) {
            let props = { slide: this, anchorLink, index };

            if (index === 1) events.publish(events.names.FP_INTRO_FOCUSIN, props);
            events.publish(events.names.FP_AFTER_CHANGE, props);
        }
    });
})();
