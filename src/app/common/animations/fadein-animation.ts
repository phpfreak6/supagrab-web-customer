import { animate, state, style, transition, trigger } from '@angular/animations';

export let fadeInAnimation = trigger('fadeInAnimation', [
    transition('void => *', [
        style({ opacity: 0 }),
        animate(2000, style({ opacity: 1 }))
    ])
])