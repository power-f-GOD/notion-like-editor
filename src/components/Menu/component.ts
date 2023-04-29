import { SVGIconName } from 'src/types';
import { preprocess } from 'src/utils';
import { SVGIcon } from '../SVGIcon';
import menu from './component.html?raw';

export const Menu = () => {
  setTimeout(() => {
    console.log('Menu component!');
  });
  return preprocess<SVGIconName>(menu, {
    'text-t': SVGIcon('text-t', 'min-w-[1.75rem] opacity-40')
  });
};
