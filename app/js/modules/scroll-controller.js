export default (() => {
    const $root   = $('body');
    let disabled  = false;
    let direction = null;
    let scrollPos = $(window).scrollTop();

    $root.on('wheel', _detectScrollDirection);
    $root.on('scroll', (e) => {
        scrollPos = $(window).scrollTop();
    });

    function _preventScroll(e) {
        e.preventDefault();
    }

    function _detectScrollDirection(e) {
        direction = (e.originalEvent.deltaY <= 0) ? 'up' : 'down';
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

    return {
        disable,
        enable,
        isDisabled,
        getDirection,
        getScrollPos
    };
})();
