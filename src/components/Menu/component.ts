import { preprocess } from 'src/utils';
import { SVGIcon } from '../SVGIcon';
import { Main, main } from '../Main/component';
import { Component } from 'src/types';
import html from './component.html?raw';
import itemHtml from './item.html?raw';

export class Menu extends Component {
  caretObserver!: HTMLElement;
  menu!: HTMLElement;
  list!: HTMLUListElement;
  feedback!: HTMLElement;
  bound: Partial<DOMRect> | null = null;

  blocks: Array<{
    title: string;
    tag: 'p' | 'h1' | 'h3' | 'h5';
    description: string;
    placeholder?: string;
  }> = [
    {
      title: 'Text',
      tag: 'p',
      description: 'Plain text or paragraph.',
      placeholder:
        "Type / for block, (@ to link docs or people doesn't work for now😌)"
    },
    { title: 'Heading 1', tag: 'h1', description: 'Big section heading.' },
    { title: 'Heading 2', tag: 'h3', description: 'Medium section heading.' },
    { title: 'Heading 3', tag: 'h5', description: 'Small section heading.' }
  ];

  constructor(
    protected template: (typeof Component)['prototype']['template'],
    protected preprocessor: typeof preprocess,
    private mainComponent: Main,
    // private query: typeof Q,
    private icon: typeof SVGIcon
  ) {
    super(template, preprocessor);
  }

  init(): void {
    console.log('Menu component mounted!');
    this.caretObserver = this.query('[data-caret-observer]')!;
    this.menu = this.caretObserver.querySelector(
      "[role='menu']"
    ) as HTMLElement;
    this.appendTextarea();
    document.body.addEventListener('click', (e) => {
      if (!this.menu.contains(e.target as HTMLElement)) {
        this.caretObserver.classList.remove('show-menu');
      }
    });
  }

  moveCaretToEnd = (textarea: HTMLElement & Element) => {
    const range = document.createRange();
    const selection = window.getSelection();

    range.selectNodeContents(textarea);
    range.collapse(false);
    selection!.removeAllRanges();
    selection!.addRange(range);
    textarea.focus();
  };

  switchContextTextarea = (e: KeyboardEvent, switchable?: boolean) => {
    const textarea = e.currentTarget as HTMLElement;
    const selection = window.getSelection();
    const range = selection && selection?.getRangeAt(0);
    const caretRect = range?.getBoundingClientRect();
    const textareaRect = textarea.getBoundingClientRect();
    const {
      previousElementSibling: previousTextarea,
      nextElementSibling: nextTextarea
    } = textarea;

    if (switchable) {
      if (
        (e.key === 'ArrowUp' || e.key === 'Backspace') &&
        caretRect!.x <= textareaRect.x &&
        previousTextarea
      ) {
        e.preventDefault();
        this.moveCaretToEnd(previousTextarea as HTMLElement);
        if (
          e.key === 'Backspace' &&
          textarea.parentNode!.childElementCount! > 1
        ) {
          textarea.parentNode?.removeChild(textarea);
        }
      } else if (
        e.key === 'ArrowDown' &&
        (!caretRect!.x || caretRect!.bottom >= textareaRect.bottom - 5) &&
        nextTextarea
      ) {
        e.preventDefault();
        this.moveCaretToEnd(nextTextarea as HTMLElement);
      } else if (e.key === 'Enter') {
        e.preventDefault();
      }
    }

    return { selection, range, caretRect, textareaRect, textarea };
  };

  setMenuPosition = (e: KeyboardEvent) => {
    const { range, caretRect, textareaRect, textarea } =
      this.switchContextTextarea(e);
    const text = textarea.textContent!;
    const partialText = text
      .trim()
      .slice(
        Math.max((range?.startOffset || 0) - 8, 0),
        (range?.startOffset || 0) + 1
      );
    const canDisplayMenu =
      e.key && partialText.includes('/') && e.key !== 'Escape';

    // We don't want the menu moving as the user types, hence we check if it's currently displaying, i.e. bound would most likely be null at this point
    if (caretRect?.y && !this.bound) this.bound = caretRect;
    console.log({ caretRect, textareaRect });

    if (this.bound && canDisplayMenu) {
      if (!this.list) {
        this.list = this.menu.querySelector('ul')!;
        this.feedback = this.menu.querySelector('[data-feedback]')!;
      }

      const textFilter = partialText.replace(/.*\/\s*(\w*)/, '$1');
      const left =
        this.bound.left ||
        (textarea.offsetParent as HTMLElement).offsetLeft ||
        0;

      // Add menu list items
      this.list.innerHTML = '';
      this.feedback.textContent = textFilter || '/';
      this.blocks
        .filter(
          (block) =>
            partialText === '/' ||
            new RegExp(`${textFilter}`, 'i').test(block.title)
        )
        .forEach((block) => {
          this.list.insertAdjacentHTML(
            'beforeend',
            preprocess(itemHtml, {
              ...block,
              placeholder: block.placeholder || block.title,
              'text-t': this.icon('text-t', 'min-w-[1.75rem] opacity-40')
            })
          );
        });

      if (this.list.childElementCount === 0) {
        this.list.innerHTML = `<p class="p-3">No results.🥲</p>`;
      }

      // Add a click listener to parent list element with which child button elements will, sort of, inherit from
      this.list.onclick = (e) => {
        const itemElement = e.target as HTMLElement;

        if (itemElement.tagName !== 'BUTTON') return;
        this.appendTextarea(
          textarea,
          itemElement.dataset as { tag: string; placeholder: string }
        );
        this.caretObserver.classList.remove('show-menu');
      };
      this.caretObserver.style.top = `${this.bound.top || 0}px`;
      this.caretObserver.style.left = `${left}px`;
      this.caretObserver.style.height = `${this.bound.height || 0}px`;

      if (left + 320 > window.innerWidth) {
        this.menu.style.transformOrigin = `${left}px top`;
        this.menu.style.left = `${window.innerWidth - (left + 336)}px`;
      } else {
        this.menu.style.left = '0';
        this.menu.style.transformOrigin = 'left top';
      }
    }

    this.caretObserver.classList[canDisplayMenu ? 'add' : 'remove'](
      'show-menu'
    );
    if (!canDisplayMenu) this.bound = null;
  };

  appendTextarea = (
    node?: HTMLElement,
    props?: { tag: string; placeholder: string }
  ) => {
    const id = String(Math.random()).replace('0.', 'id');
    const template = this.mainComponent.getTextareaTemplate({
      id,
      tag: 'div',
      placeholder: this.blocks[0].placeholder!,
      ...props
    });
    const textareasContainer = this.query(
      '[data-textareas-container]'
    ) as HTMLElement;

    if (node) node.insertAdjacentHTML('afterend', template);
    else {
      textareasContainer.insertAdjacentHTML('beforeend', template);
    }

    const textarea = this.query(`#${id}`)!;

    // textarea.dataset.i = String(
    //   +(
    //     (textarea.previousElementSibling as HTMLElement | null)?.dataset.i || -1
    //   ) + 1
    // );
    textarea.addEventListener('keydown', (e) => {
      this.switchContextTextarea(e, true);
    });
    textarea.addEventListener('keyup', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        this.appendTextarea(textarea);
      } else this.setMenuPosition(e as any);
    });
    textarea.addEventListener('blur', () => (this.bound = null));
    textarea.focus();
  };
}

export const menu = new Menu({ html }, preprocess, main, SVGIcon);
