import '@testing-library/jest-dom';

import { menu } from '../Menu/component';
import html from '../Menu/component.html?raw';
import itemHtml from '../Menu/item.html?raw';
import { main } from '../Main/component';

describe('Menu', () => {
  it('renders the Menu component template unchanged', () => {
    expect(html).toMatchSnapshot();
  });

  it('renders the item template unchanged', () => {
    expect(itemHtml).toMatchSnapshot();
  });

  it('renders a textarea and the Menu component correctly', async () => {
    const body = document.body;

    body.insertAdjacentHTML('beforeend', main.render());
    expect(
      body.querySelector('[data-textareas-container]')
    ).toBeInTheDocument();
    body.insertAdjacentHTML('beforeend', menu.render());
    expect(body.innerHTML).toMatchSnapshot();
    await new Promise((resolve) => {
      setTimeout(resolve);
    });

    const textarea = body.querySelector(
      'div[contenteditable="true"]'
    ) as HTMLElement;

    expect(textarea).toBeInTheDocument();
    expect(textarea.innerHTML).toMatchSnapshot();
    expect(textarea.getAttribute('placeholder')).toBe(
      "Type '/' for block, ('@' to link docs or people doesn't work for now😌)"
    );
    expect(body.querySelector('div[role="menu"]')).toBeInTheDocument();
  });
});
