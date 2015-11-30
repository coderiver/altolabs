import events from './pub-sub';
export default (() => {
    const $intro    = $('.intro');
    const $chars    = $intro.find('.intro__row .svg-icon:not(.char-placeholder)');
    const $charsA   = $intro.find('.char-a-front, .char-a-back');
    const $parallax = $intro.find('.intro__parallax-layer-1, .intro__parallax-layer-3');
    const $text     = $intro.find('.intro__main-text');
    const $button   = $text.find('.btn');
    const $triangle = $intro.find('.intro__triangle .svg-icon');
    const tl        = new TimelineMax({ paused: true });
    let animated    = false;

    // animations properties for each character in words 'coming soon'
    let halfWindowWidth = window.innerWidth / 2;
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

    TweenMax.set($text, {
        position: 'absolute',
        top: '50%',
        left: 0,
        right: 0,
        autoAlpha: 0,
        marginTop: '-3em'
    });

    TweenMax.set($button, {
        y: 100,
        opacity: 0
    });

    tl
        .add(() => animated = true)
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
        .add([
            TweenMax.to($charsA[0], 1, {
                x: -1000,
                ease: Power1.easeInOut
            }),
            TweenMax.to($charsA[1], 1, {
                x: 1000,
                ease: Power1.easeInOut
            }),
            TweenMax.to($triangle, 0.5, {
                scale: 0.625
            })
        ])
        .to($text, 0.75, {
            autoAlpha: 1
        })
        .to($button, 0.5, {
            y: 0,
            opacity: 1,
            ease: Power1.easeInOut
        }, '-=0.3')
        .add(() => events.publish('introAnimEnd'));

    function _rotateLayers(e) {
        let angle = (e.pageX - window.innerWidth / 2) * 0.008;
        TweenMax.set($parallax, {
            rotationY: `${angle}deg`
        });
    }

    function enableParallax() {
        $intro.on('mousemove', _rotateLayers);
    }

    function disableParallax() {
        $intro.off('mousemove', _rotateLayers);
        TweenMax.to($parallax, 1, {
            rotationY: 0
        });
    }

    function playAnimations() {
        return new Promise((resolve, reject) => {
            if (animated) {
                reject(new Error('Intro was successfully animated'));
            } else {
                tl.play().eventCallback('onComplete', resolve, [tl]);
            }
        });
    }

    function playAnimationsReverse() {
        tl.reverse();
    }

    function wasAnimated() {
        return animated;
    }

    return {
        enableParallax,
        disableParallax,
        playAnimations,
        playAnimationsReverse,
        wasAnimated
    };
})();
