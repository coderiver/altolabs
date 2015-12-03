import { createHeadingAnimFor, createAboutAnimFor } from './animations-base';
import intro from './intro';

export default (() => {
    const $qmedic   = $('.project[data-animations=qmedic]');
    const $milkyway = $('.project[data-animations=milkyway]');
    const $rexpro   = $('.project[data-animations=rexpro]');

    const qmedic    = new TimelineMax({ paused: true });
    const milkyway  = new TimelineMax({ paused: true });
    const rexpro    = new TimelineMax({ paused: true });

    const ease      = Power1.easeInOut;

    qmedic
        .add(createHeadingAnimFor($qmedic))
        .fromTo($qmedic.find('.project__bg'), 0.5, {
            yPercent: 100,
            opacity: 0
        }, {
            yPercent: 0,
            opacity: 1,
            ease
        })
        .fromTo($qmedic.find('.project__image'), 1, {
            yPercent: 100,
            opacity: 0
        }, {
            yPercent: 0,
            opacity: 1,
            ease
        })
        .add(createAboutAnimFor($qmedic));

    milkyway
        .add(createHeadingAnimFor($milkyway))
        .fromTo($milkyway.find('.bg-milkyway__layer-2'), 0.5, {
            yPercent: 100,
            opacity: 0
        }, {
            yPercent: 0,
            opacity: 1,
            ease
        })
        .add([
            TweenMax.fromTo($milkyway.find('.milkyway'), 1, {
                yPercent: 150,
                opacity: 0
            }, {
                yPercent: 0,
                opacity: 1,
                ease
            }),
            TweenMax.fromTo($milkyway.find('.milkyway__layer-0'), 1, {
                x: 200
            }, {
                x: 0,
                ease
            }),
            TweenMax.fromTo($milkyway.find('.milkyway__layer-2'), 0.5, {
                x: -200,
                opacity: 0
            }, {
                x: 0,
                delay: 0.5,
                opacity: 1,
                ease
            })
        ])
        .add([
            TweenMax.fromTo($milkyway.find('.bg-milkyway__layer-1'), 0.5, {
                xPercent: 100,
                opacity: 0
            }, {
                xPercent: 0,
                opacity: 1,
                ease
            }),
            TweenMax.fromTo($milkyway.find('.milkyway__layer-1'), 0.5, {
                yPercent: 100,
                opacity: 0
            }, {
                yPercent: 0,
                opacity: 1,
                ease
            })
        ])
        .add(createAboutAnimFor($milkyway));

    rexpro
        .add(createHeadingAnimFor($rexpro))
        .fromTo($rexpro.find('.bg-rex-pro__layer-2'), 0.5, {
            xPercent: -100
        }, {
            xPercent: 0,
            ease
        })
        .fromTo($rexpro.find('.bg-rex-pro__layer-3'), 0.5, {
            opacity: 0
        }, {
            opacity: 1,
            ease
        })
        .fromTo($rexpro.find('.project__image'), 0.7, {
            yPercent: 150,
            opacity: 0
        }, {
            yPercent: 0,
            opacity: 1,
            ease
        }, '-=0.3')
        .add(createAboutAnimFor($rexpro));

    // return all Timelines include Timeline from ./intro.js
    return {
        qmedic,
        milkyway,
        rexpro,
        intro: intro.tl
    };
})();
