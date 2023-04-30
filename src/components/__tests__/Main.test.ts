import '@testing-library/jest-dom';
import { vi } from 'vitest';

import { main } from '../Main/component';
import html from '../Main/component.html?raw';
import textareaHtml from '../Main/textarea.html?raw';

const textareaProps = {
  id: 'textarea',
  tag: 'p',
  placeholder: 'Type / for variants.'
};

describe('Main', () => {
  it('renders the Main component template unchanged', () => {
    expect(html).toMatchSnapshot();
  });

  it('renders the textarea template unchanged', () => {
    expect(textareaHtml).toMatchSnapshot();
  });

  it("renders the Main component's resultant html unchanged", () => {
    expect(main.render()).toMatchSnapshot();
  });

  it("renders the textarea component's resultant html unchanged", () => {
    expect(main.getTextareaTemplate(textareaProps)).toMatchSnapshot();
  });

  it(`renders a "${textareaProps.tag}" tag in the DOM`, () => {
    document.body.insertAdjacentHTML(
      'beforebegin',
      main.getTextareaTemplate(textareaProps)
    );
    expect(document.querySelector(textareaProps.tag)).toBeInTheDocument();
  });

  it('render() method triggers its init() method', async () => {
    const initSpy = vi.spyOn(main, 'init');

    expect(initSpy).not.toHaveBeenCalled();
    main.render();
    await new Promise((resolve) => {
      setTimeout(resolve);
    });
    expect(initSpy).toHaveBeenCalled();
  });
});
