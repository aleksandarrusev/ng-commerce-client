import {
  trigger,
  animate,
  group,
  transition,
  style,
  query
} from '@angular/animations';

export const routerFadeAnimation = trigger('fadeAnimation', [
  transition('* <=> *', [
    group([
      query(
        ':enter',
        [
          style({
            opacity: 0,
          }),
          animate(
            '0.35s cubic-bezier(0, 1.8, 1, 1.8)',
            style({ opacity: 1, })
          ),
        ],
        { optional: true }
      ),
      query(
        ':leave',
        [animate('0.35s', style({ opacity: 0 }))],
        { optional: true }
      )
    ])
  ])
]);
