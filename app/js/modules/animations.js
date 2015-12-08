import { createHeadingAnimFor, createAboutAnimFor } from './animations-base';

const $qmedic   = $('.project[data-animations=qmedic]');
const $milkyway = $('.project[data-animations=milkyway]');
const $rexpro   = $('.project[data-animations=rexpro]');

const qmedic    = new TimelineMax({ paused: true });
const milkyway  = new TimelineMax({ paused: true });
const rexpro    = new TimelineMax({ paused: true });

const ease      = Power1.easeInOut;

qmedic
    .add(createHeadingAnimFor($qmedic))
    .fromTo($qmedic.find('.project__bg'), 0.3, {
        yPercent: 100,
        opacity: 0
    }, {
        yPercent: 0,
        opacity: 1,
        ease
    })
    .fromTo($qmedic.find('.project__image'), 0.5, {
        yPercent: 100,
        opacity: 0
    }, {
        yPercent: 0,
        opacity: 1,
        ease
    })
    .add(createAboutAnimFor($qmedic), '-=0.2');

milkyway
    .add(createHeadingAnimFor($milkyway))
    .fromTo($milkyway.find('.bg-milkyway__layer-2'), 0.3, {
        yPercent: 100,
        opacity: 0
    }, {
        yPercent: 0,
        opacity: 1,
        ease
    })
    .add([
        TweenMax.fromTo($milkyway.find('.milkyway'), 0.6, {
            yPercent: 150,
            opacity: 0
        }, {
            yPercent: 0,
            opacity: 1,
            ease
        }),
        TweenMax.fromTo($milkyway.find('.milkyway__layer-0'), 0.6, {
            x: 200
        }, {
            x: 0,
            ease
        }),
        TweenMax.fromTo($milkyway.find('.milkyway__layer-2'), 0.3, {
            x: -200,
            opacity: 0
        }, {
            x: 0,
            delay: 0.5,
            opacity: 1,
            ease
        }),
        createAboutAnimFor($milkyway)
    ])
    .add([
        TweenMax.fromTo($milkyway.find('.bg-milkyway__layer-1'), 0.3, {
            xPercent: 100,
            opacity: 0
        }, {
            xPercent: 0,
            opacity: 1,
            ease
        }),
        TweenMax.fromTo($milkyway.find('.milkyway__layer-1'), 0.3, {
            yPercent: 100,
            opacity: 0
        }, {
            yPercent: 0,
            opacity: 1,
            ease
        })
    ], '-=0.1');

rexpro
    .add(createHeadingAnimFor($rexpro))
    .fromTo($rexpro.find('.bg-rex-pro__layer-2'), 0.3, {
        xPercent: -100
    }, {
        xPercent: 0,
        ease
    })
    .fromTo($rexpro.find('.bg-rex-pro__layer-3'), 0.3, {
        opacity: 0
    }, {
        opacity: 1,
        ease
    })
    .fromTo($rexpro.find('.project__image'), 0.5, {
        yPercent: 70,
        opacity: 0
    }, {
        yPercent: 0,
        opacity: 1,
        ease
    }, '-=0.3')
    .add(createAboutAnimFor($rexpro), '-=0.2');

// return all Timelines include Timeline from ./intro.js
export const animations = {
    qmedic,
    milkyway,
    rexpro
};

export function setAnimationsProgress(val = 0) {
    for (let key in animations) {
        if (!animations.hasOwnProperty(key) || key === 'intro') continue;
        animations[key].progress(val);
    }
}
