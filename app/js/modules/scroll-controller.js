export default (() => {
    const $root   = $('#fullpage');
    let disabled  = false;
    let direction = '';
    let scrollPos = $(window).scrollTop();

    function _preventScroll(e) {
        e.preventDefault();
    }

    $root.on('scroll', (e) => {
        scrollPos = $(window).scrollTop();
    });

    function detectScrollDirection(e) {
        direction = (e.originalEvent.wheelDelta >= 0) ? 'up' : 'down';
    }

    function mozDetectScrollDirection(e) {
        direction = (e.originalEvent.detail <= 0) ? 'up' : 'down';
    }

    $root.on('mousewheel', detectScrollDirection);
    $root.on('DOMMouseScroll', mozDetectScrollDirection);

    function disable() {
        if (disabled) return;
        $root.on('mousewheel DOMMouseScroll touchmove', _preventScroll);
        disabled = true;
    }

    function enable() {
        if (!disabled) return;
        $root.off('mousewheel DOMMouseScroll touchmove', _preventScroll);
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
