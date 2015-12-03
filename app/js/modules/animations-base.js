export function createHeadingAnimFor(context) {
    let heading = context.find('.project__heading');
    let ease    = Power1.easeInOut;

    TweenMax.set(heading, { y: -220, autoAlpha: 0 });

    return TweenMax.to(heading, 0.5, {
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
        TweenMax.to(title, 1.175, {
            x: 0,
            autoAlpha: 1,
            ease
        }),
        TweenMax.to(line, 1, {
            x: 0,
            autoAlpha: 1,
            delay: 0.2,
            ease
        }),
        TweenMax.to(description, 0.75, {
            x: 0,
            autoAlpha: 1,
            delay: 0.75,
            ease
        }),
        TweenMax.to(btn, 0.5, {
            x: 0,
            autoAlpha: 1,
            delay: 1,
            ease
        })
    ];
}
