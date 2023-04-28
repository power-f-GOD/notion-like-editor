import './styles/index.scss';
import { Nav, SVGIcon, Main } from './components';
import { preprocess } from './utils';
import type { SVGIconName } from './types';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  ${preprocess<SVGIconName>(Nav, {
    'caret-double-right': SVGIcon('caret-double-right', 'w-4 h-4 min-w-[1rem]'),
    'book-open': SVGIcon('book-open'),
    'caret-down': SVGIcon('caret-down'),
    'lock-key-open': SVGIcon('lock-key-open')
  })}
  ${preprocess<SVGIconName>(Main, {
    clock: SVGIcon('clock', 'w-4 h-4 min-w-[1rem]'),
    'arrow-down-left': SVGIcon('arrow-down-left'),
    'check-circle': SVGIcon('check-circle'),
    cloud: SVGIcon('cloud'),
    'dots-three-vertical': SVGIcon('dots-three-vertical')
  })}
`;
