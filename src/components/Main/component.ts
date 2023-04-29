import { SVGIconName } from 'src/types';
import { preprocess } from 'src/utils';
import { SVGIcon } from '../SVGIcon';
import mainHtml from './component.html?raw';
import textareaHtml from './textarea.html?raw';

export const Main = () => {
  setTimeout(() => {
    console.log('Main component mounted!');
  });

  return preprocess<SVGIconName>(mainHtml, {
    clock: SVGIcon('clock', 'w-4 h-4 min-w-[1rem]'),
    'arrow-down-left': SVGIcon('arrow-down-left'),
    'check-circle': SVGIcon('check-circle'),
    cloud: SVGIcon('cloud'),
    'dots-three-vertical': SVGIcon('dots-three-vertical')
  });
};

export const getTextareaTemplate = (props: {
  id: string;
  tag: string;
  placeholder: string;
}) => {
  return preprocess(textareaHtml, props);
};
