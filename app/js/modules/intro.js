import { pubSub, eventsNames } from './pub-sub';

export default (() => {
    const $intro       = $('.intro');
    const $chars       = $intro.find('.parallax__row .char:not(.char-placeholder)');
    const $charsA      = $intro.find('.char-a, .char-a-shadow');
    const $parallaxIn  = $intro.find('.parallax__inner');
    const $parallaxL1  = $intro.find('.parallax__layer-1');
    const $parallaxL2  = $intro.find('.parallax__layer-2');
    const $parallaxL3  = $intro.find('.parallax__layer-3');
    const $text        = $intro.find('.intro__main-text');
    const $button      = $text.find('.btn');
    const $triangle    = $intro.find('.intro__triangle .svg-icon');
    const animation    = new TimelineMax({ paused: true });
    let parallaxActive = false;

    // animations properties for each character in words 'coming soon'
    let halfWindowWidth = 200;
    const animProp = [
        // c
        {
            duration: 0.5,
            delay: 0,
            y: -halfWindowWidth
        },
        // o
        {
            duration: 0.5,
            delay: 0.175,
            y: -halfWindowWidth
        },
        // m
        {
            duration: 0.25,
            delay: 0.4,
            y: -halfWindowWidth
        },
        // i
        {
            duration: 0.25,
            delay: 0.5,
            y: -halfWindowWidth
        },
        // n
        {
            duration: 0.4,
            delay: 0.25,
            y: -halfWindowWidth
        },
        // g
        {
            duration: 0.4,
            delay: 0.4,
            y: -halfWindowWidth
        },
        // s
        {
            duration: 0.5,
            delay: 0.05,
            y: halfWindowWidth
        },
        // o
        {
            duration: 0.25,
            delay: 0.5,
            y: halfWindowWidth
        },
        // o
        {
            duration: 0.4,
            delay: 0.25,
            y: halfWindowWidth
        },
        // n
        {
            duration: 0.25,
            delay: 0.45,
            y: halfWindowWidth
        }
    ];

    animation
        .add(
            animProp.map((props, i) => {
                return TweenMax.to($chars[i], props.duration, {
                    y: props.y,
                    delay: props.delay,
                    opacity: 0,
                    ease: Power1.easeInOut
                });
            }, 0)
        )
        .add(() => $intro.toggleClass('is-animated'))
        .add([
            TweenMax.to($charsA[1], 1, {
                x: -700,
                ease: Power1.easeInOut
            }),
            TweenMax.to($charsA[0], 1, {
                x: 700,
                ease: Power1.easeInOut
            }),
            TweenMax.to($triangle, 0.5, {
                scale: 0.625
            })
        ])
        .fromTo($text, 0.75, {
            autoAlpha: 0
        }, {
            autoAlpha: 1
        })
        .fromTo($button, 0.5, {
            y: 100,
            opacity: 0
        }, {
            y: 0,
            opacity: 1,
            ease: Power1.easeInOut
        }, '-=0.3')
        .add(() => {
            pubSub.emit(eventsNames.INTRO_END_ANIMATIONS, { animation });
        });

    function _rotateLayers(e) {
        let x = e.pageX - window.innerWidth / 2;
        let y = e.pageY - window.innerHeight / 2;
        let angleY = x * 0.008;
        let angleX = -y * 0.008;
        TweenMax.to($parallaxL1, 0.5, {
            x: -x * 0.005,
            y: -y * 0.005,
            rotationX: `${angleX}deg`,
            rotationY: `${angleY}deg`
        });
        TweenMax.to($parallaxL2, 0.5, {
            x: -x * 0.01,
            y: -y * 0.01,
            rotationX: `${angleX}deg`,
            rotationY: `${angleY}deg`
        });
        TweenMax.to($parallaxL3, 0.5, {
            x: -x * 0.02,
            y: -y * 0.02,
            rotationX: `${angleX}deg`,
            rotationY: `${angleY}deg`
        });
    }

    function enableParallax() {
        if (parallaxActive) return;
        $(document).on('mousemove', _rotateLayers);
        parallaxActive = true;
    }

    function disableParallax() {
        if (!parallaxActive) return;
        $(document).off('mousemove', _rotateLayers);
        TweenMax.to([$parallaxL1, $parallaxL2, $parallaxL3], 1, {
            x: 0,
            y: 0,
            rotationY: 0,
            rotationX: 0
        });
        parallaxActive = false;
    }

    function toggleParallax() {
        if (parallaxActive) {
            disableParallax();
        } else {
            enableParallax();
        }
    }

    return {
        enableParallax,
        disableParallax,
        toggleParallax,
        animation
    };
})();
