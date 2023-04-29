import { SVGIconName } from 'src/types';
import { preprocess } from 'src/utils';
import { SVGIcon } from '../SVGIcon';
import main from './component.html?raw';

export const Main = () => {
  setTimeout(() => {
    console.log('Main component!');
  });

  return preprocess<SVGIconName>(main, {
    clock: SVGIcon('clock', 'w-4 h-4 min-w-[1rem]'),
    'arrow-down-left': SVGIcon('arrow-down-left'),
    'check-circle': SVGIcon('check-circle'),
    cloud: SVGIcon('cloud'),
    'dots-three-vertical': SVGIcon('dots-three-vertical')
  });
};
