import {
  trigger,
  transition,
  useAnimation,
} from '@angular/animations';
import { transitionAnimation } from './animation';
export const triggerAnimation = trigger('openClose', [
  transition('open => closed', [
    useAnimation(transitionAnimation, {
      params: {
        height: 0,
        opacity: 1,
        backgroundColor: 'red',
        time: '1s',
      },
    }),
  ]),
]);
