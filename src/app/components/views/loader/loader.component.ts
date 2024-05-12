import { Component } from '@angular/core';
import { transition, trigger, useAnimation } from '@angular/animations';
import { transitionAnimation } from '../../functions/animation';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-loader',
  animations: [
    trigger('openClose', [
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
    ]),
  ],
  imports: [CommonModule],
  templateUrl: 'loader.component.html',
  styleUrls: ['loader.component.scss'],
})
export class LoaderComponent {}
