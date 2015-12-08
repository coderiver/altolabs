export function createHeadingAnimFor(context) {
    let heading = context.find('.project__heading');
    let ease    = Power1.easeInOut;

    TweenMax.set(heading, { y: -220, autoAlpha: 0 });

    return TweenMax.to(heading, 0.3, {
        y: 0,
        autoAlpha: 1,
        ease
    });
}

export function createAboutAnimFor(context) {
    let title       = context.find('.project__about .h3');
    let line        = context.find('.project__about-line');
    let description = context.find('.project__description');
    let btn         = context.find('.project__about .btn');
    let ease        = Power1.easeInOut;

    TweenMax.set([title, line, description, btn], { x: -200, autoAlpha: 0 });

    return [
        TweenMax.to(title, 0.5, {
            x: 0,
            autoAlpha: 1,
            ease
        }),
        TweenMax.to(line, 0.3, {
            x: 0,
            autoAlpha: 1,
            delay: 0.2,
            ease
        }),
        TweenMax.to(description, 0.3, {
            x: 0,
            autoAlpha: 1,
            delay: 0.4,
            ease
        }),
        TweenMax.to(btn, 0.3, {
            x: 0,
            autoAlpha: 1,
            delay: 0.5,
            ease
        })
    ];
}
