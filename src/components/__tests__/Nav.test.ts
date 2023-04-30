import '@testing-library/jest-dom';
import { vi } from 'vitest';

import { nav } from '../Nav/component';
import html from '../Nav/component.html?raw';

describe('Nav', () => {
  it('renders the Nav component template unchanged', () => {
    expect(html).toMatchSnapshot();
  });

  it("renders the Nav component's resultant html unchanged", () => {
    expect(nav.render()).toMatchSnapshot();
  });

  it('render() method triggers its init() method', async () => {
    const initSpy = vi.spyOn(nav, 'init');

    expect(initSpy).not.toHaveBeenCalled();
    nav.render();
    setTimeout(() => expect(initSpy).toHaveBeenCalled());
  });
});
