import { SVGIconName } from 'src/types';
import { preprocess } from 'src/utils';
import { SVGIcon } from '../SVGIcon';
import nav from './component.html?raw';

export const Nav = () => {
  setTimeout(() => {
    console.log('Nav component!');
  });

  return preprocess<SVGIconName>(nav, {
    'caret-double-right': SVGIcon('caret-double-right', 'w-4 h-4 min-w-[1rem]'),
    'book-open': SVGIcon('book-open'),
    'caret-down': SVGIcon('caret-down'),
    'lock-key-open': SVGIcon('lock-key-open')
  });
};
