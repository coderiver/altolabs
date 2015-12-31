export default (() => {
    const $root    = $('body');
    let disabled   = false;
    let direction  = null;
    let scrollPos  = $(window).scrollTop();
    let prevDeltaY = null; // need for fix bug when scrolling from touchpad
    let wheeling;

    $root.on('wheel', (e) => {
        // if (!wheeling) {
        //     console.log('start scroll');
        // }
        // clearTimeout(wheeling);
        // wheeling = setTimeout(() => {
        //     console.log('end scroll');
        //     wheeling = null;
        // }, 100);

        _detectScrollDirection(e);
    });

    $root.on('scroll', (e) => {
        scrollPos = $(window).scrollTop();
    });

    function _preventScroll(e) {
        e.preventDefault();
    }

    function _detectScrollDirection(e) {
        let deltaY = e.originalEvent.deltaY;
        if (deltaY < 0) {
            direction = 'up';
        } else if (deltaY > 0) {
            direction = 'down';
        } else {
            direction = (prevDeltaY < 0) ? 'up' : 'down';
        }
        // direction = (deltaY <= 0) ? 'up' : 'down';
        prevDeltaY = deltaY;
    }

    function disable() {
        if (disabled) return;
        $root.on('wheel', _preventScroll);
        disabled = true;
    }

    function enable() {
        if (!disabled) return;
        $root.off('wheel', _preventScroll);
        disabled = false;
    }

    function isDisabled() {
        return disabled;
    }

    function getScrollPos() {
        return scrollPos;
    }

    function getDirection(argument) {
        return direction;
    }

    function isWheeling() {
        return wheeling;
    }

    return {
        disable,
        enable,
        isDisabled,
        getDirection,
        getScrollPos,
        isWheeling
    };
})();
