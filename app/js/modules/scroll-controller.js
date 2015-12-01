export default (() => {
    const $win    = $(window);
    let disabled  = false;
    let scrollPos = $win.scrollTop();

    function _preventScroll(e) {
        e.preventDefault();
    }

    $win.on('scroll', (e) => {
        scrollPos = $win.scrollTop();
    });

    function disable() {
        if (disabled) return;
        $win.on('mousewheel DOMMouseScroll touchmove scroll', _preventScroll);
        disabled = true;
    }

    function enable() {
        if (!disabled) return;
        $win.off('mousewheel DOMMouseScroll touchmove scroll', _preventScroll);
        disabled = false;
    }

    function isDisabled() {
        return disabled;
    }

    function getScrollPos() {
        return scrollPos;
    }

    return {
        disable,
        enable,
        isDisabled,
        getScrollPos
    };
})();
