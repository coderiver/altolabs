import EventEmitter from 'events'

export const pubSub = new EventEmitter();

export const eventsNames = {
    INTRO_END_ANIMATIONS: 'introAnimEnd',
    FP_INTRO_FOCUSIN: 'fpIntroFocusIn',
    FP_INTRO_FOCUSOUT: 'fpIntroFocusOut',
    FP_BEFORE_CHANGE: 'fpBeforeChange',
    FP_AFTER_CHANGE: 'fpAfterChange',
    FP_LOOP_TOP: 'fpLoopTop',
    FP_INIT: 'fpInit'
};
