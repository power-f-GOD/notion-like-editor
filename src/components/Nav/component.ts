import { Component, SVGIconName } from 'src/types';
import { preprocess } from 'src/utils';
import { SVGIcon } from '../SVGIcon';
import html from './component.html?raw';

export class Nav<
  Variables extends SVGIconName = SVGIconName
> extends Component<Variables> {
  init(): void {
    console.log('Nav component mounted!');
  }
}

export const nav = new Nav(
  {
    html,
    variables: {
      'caret-double-right': SVGIcon(
        'caret-double-right',
        'w-4 h-4 min-w-[1rem]'
      ),
      'book-open': SVGIcon('book-open'),
      'caret-down': SVGIcon('caret-down'),
      'lock-key-open': SVGIcon('lock-key-open')
    }
  },
  preprocess
);
