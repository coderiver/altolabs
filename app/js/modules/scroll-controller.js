export default (() => {
    const $win    = $(window);
    let disabled  = false;
    let direction = '';
    let scrollPos = $win.scrollTop();

    function _preventScroll(e) {
        e.preventDefault();
    }

    $win.on('scroll', (e) => {
        scrollPos = $win.scrollTop();
    });

    function detectScrollDirection(e) {
        direction = (e.originalEvent.wheelDelta >= 0) ? 'up' : 'down';
    }

    function mozDetectScrollDirection(e) {
        direction = (e.originalEvent.detail <= 0) ? 'up' : 'down';
    }

    $('body').on('mousewheel', detectScrollDirection);
    $('body').on('DOMMouseScroll', mozDetectScrollDirection);

    function disable() {
        if (disabled) return;
        $win.on('mousewheel DOMMouseScroll touchmove', _preventScroll);
        disabled = true;
    }

    function enable() {
        if (!disabled) return;
        $win.off('mousewheel DOMMouseScroll touchmove', _preventScroll);
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

    return {
        disable,
        enable,
        isDisabled,
        getDirection,
        getScrollPos
    };
})();
