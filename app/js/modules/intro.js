import { pubSub, eventsNames } from './pub-sub';

export default (() => {
    const $intro       = $('.intro');
    const $chars       = $intro.find('.intro__row .char:not(.char-placeholder)');
    const $charsA      = $intro.find('.char-a, .char-a-shadow');
    const $parallax1    = $intro.find('.intro__parallax-layer-1');
    const $parallax2    = $intro.find('.intro__parallax-layer-2');
    const $parallax3    = $intro.find('.intro__parallax-layer-3');
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
        TweenMax.set($parallax1, {
            x: -x * 0.01,
            y: -y * 0.01,
            rotationY: `${-x * 0.005}deg`,
            rotationX: `${-y * 0.005}deg`
        });
        TweenMax.set($parallax2, {
            x: -x * 0.02,
            y: -y * 0.02,
            rotationY: `${-x * 0.002}deg`,
            rotationX: `${-y * 0.002}deg`
        });
        TweenMax.set($parallax3, {
            x: -x * 0.03,
            y: -y * 0.03,
            rotationY: `${-x * 0.007}deg`,
            rotationX: `${-y * 0.007}deg`
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
        TweenMax.to([$parallax1, $parallax2, $parallax3], 1, {
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
