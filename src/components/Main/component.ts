import { Component, SVGIconName } from 'src/types';
import { preprocess } from 'src/utils';
import { SVGIcon } from '../SVGIcon';
import html from './component.html?raw';
import textareaHtml from './textarea.html?raw';

export class Main<
  Variables extends SVGIconName = SVGIconName
> extends Component<Variables> {
  init(): void {
    console.log('Main component mounted!');
  }

  getTextareaTemplate = (props: {
    id: string;
    tag: string;
    placeholder: string;
  }) => {
    return this.preprocess(textareaHtml, props);
  };
}

export const main = new Main(
  {
    html,
    variables: {
      clock: SVGIcon('clock', 'w-4 h-4 min-w-[1rem]'),
      'arrow-down-left': SVGIcon('arrow-down-left'),
      'check-circle': SVGIcon('check-circle'),
      cloud: SVGIcon('cloud'),
      'dots-three-vertical': SVGIcon('dots-three-vertical')
    }
  },
  preprocess
);
