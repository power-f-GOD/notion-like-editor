import '@testing-library/jest-dom';

import { SVGIcon } from '../SVGIcon';

test('SVGIcon renders an svg icon/element', () => {
  document.body.innerHTML = SVGIcon('book-open', 'w-5 h-5');
  expect(document.querySelector('svg')).toBeInTheDocument();
  expect(document.querySelector('svg')?.getAttribute('class')).toBe('w-5 h-5');
  expect(document.body.innerHTML).toMatchSnapshot();
});
