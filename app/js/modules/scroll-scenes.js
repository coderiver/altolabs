(() => {
    const controller = new ScrollMagic.Controller({ container: 'body' });

    new ScrollMagic.Scene({
        duration: '100%',
        triggerHook: 'onLeave',
        triggerElement: 'body'
    }).on('start', (e) => {
        console.log(e);
    }).setPin('.intro').addTo(controller);
})();
