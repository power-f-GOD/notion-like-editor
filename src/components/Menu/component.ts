import { SVGIcon } from '../SVGIcon';
import { Main, main } from '../Main/component';
import { Component } from 'src/types';
import html from './component.html?raw';
import itemHtml from './item.html?raw';

export class Menu extends Component {
  private caretObserver!: HTMLElement;
  private menu!: HTMLElement;
  private list!: HTMLUListElement;
  private feedback!: HTMLElement;
  private caretRect: Partial<DOMRect> | null = null;

  private blocks: Array<{
    title: string;
    tag: 'p' | 'h1' | 'h2' | 'h3';
    description: string;
    placeholder?: string;
  }> = [
    {
      title: 'Text',
      tag: 'p',
      description: 'Plain text or paragraph.',
      placeholder:
        "Type '/' for block, ('@' to link docs or people doesn't work for now😌)"
    },
    { title: 'Heading 1', tag: 'h1', description: 'Big section heading.' },
    { title: 'Heading 2', tag: 'h2', description: 'Medium section heading.' },
    { title: 'Heading 3', tag: 'h3', description: 'Small section heading.' }
  ];

  constructor(
    protected template: (typeof Component)['prototype']['template'],
    private mainComponent: Main,
    private icon: typeof SVGIcon
  ) {
    super(template);
  }

  init() {
    console.log('Menu component mounted!');
    this.caretObserver = this.query('[data-caret-observer]')!;
    this.menu = this.caretObserver.querySelector(
      "[role='menu']"
    ) as HTMLElement;
    this.list = this.menu.querySelector('ul')!;
    this.feedback = this.menu.querySelector('[data-feedback]')!;
    this.appendTextarea();
    document.body.addEventListener('click', (e) => {
      if (!this.menu.contains(e.target as HTMLElement)) {
        this.showMenu(false);
      }
    });
  }

  private showMenu(show: boolean) {
    this.caretObserver.dataset.showMenu = String(show);
  }

  private get isShowingMenu() {
    return this.caretObserver.dataset.showMenu === 'true';
  }

  private removeSlash(textarea: HTMLElement) {
    textarea.textContent! = textarea.textContent!.replace(
      '/' + this.feedback.textContent!.replace('...', ''),
      ''
    );
  }

  private moveTextareaCaretToPosition = (
    textarea: HTMLElement | Element,
    toEnd?: boolean
  ) => {
    const text = textarea.childNodes[0]?.textContent;
    const range = document.createRange();
    const selection = window.getSelection();
    const prevOffset = +(
      (toEnd ? text?.length : (textarea as HTMLElement).dataset.offset) || -1
    );
    const hasOffset =
      prevOffset > -1 && prevOffset <= (text?.length || -Infinity);

    if (hasOffset) range.setStart(textarea.childNodes[0], prevOffset);
    range.collapse(hasOffset);
    selection!.removeAllRanges();
    selection!.addRange(range);
    if (!hasOffset) selection?.collapseToEnd();
    (textarea as HTMLElement).focus();
  };

  private switchContextTextarea = (e: KeyboardEvent, switchable?: boolean) => {
    const textarea = e.currentTarget as HTMLElement;
    const selection = window.getSelection();
    const range = selection && selection?.getRangeAt(0);
    const caretRect = range?.getBoundingClientRect();
    const textareaRect = textarea.getBoundingClientRect();
    const {
      previousElementSibling: previousTextarea,
      nextElementSibling: nextTextarea
    } = textarea;
    const textLength = textarea.textContent?.length || 0;

    // Save current caret offset/position, so to be remembered when re-focused
    textarea.dataset.offset = String(range?.startOffset || textLength - 1);

    if (switchable) {
      const isEmpty = !textLength;

      if (
        (e.key === 'ArrowUp' ||
          e.key === 'ArrowLeft' ||
          e.key === 'Backspace') &&
        previousTextarea
      ) {
        const isAtStart = range?.startOffset === 0;

        if (e.key === 'Backspace' && isEmpty && isAtStart) {
          e.preventDefault();
          textarea.parentNode?.removeChild(textarea);
        }

        if (
          e.key === 'ArrowUp' ||
          (isAtStart && range.startOffset === range.endOffset) ||
          isEmpty
        ) {
          e.preventDefault();
          this.moveTextareaCaretToPosition(
            previousTextarea,
            e.key === 'Backspace'
          );
        }
      } else if (
        (e.key === 'ArrowDown' || e.key === 'ArrowRight') &&
        nextTextarea
      ) {
        if (range?.startOffset === textLength || e.key === 'ArrowDown') {
          e.preventDefault();
          this.moveTextareaCaretToPosition(nextTextarea);
        }
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (this.isShowingMenu) this.removeSlash(textarea);
        this.appendTextarea(
          textarea,
          this.isShowingMenu
            ? (this.list.querySelector('button')?.dataset as
                | { tag: string; placeholder: string }
                | undefined)
            : undefined
        );
        this.showMenu(false);
      }
    }

    return { selection, range, caretRect, textareaRect, textarea };
  };

  private setMenuPosition = (e: KeyboardEvent) => {
    const { range, caretRect, textarea } = this.switchContextTextarea(e);
    const text = textarea.textContent!;
    const partialText = text.slice(
      Math.max((range?.startOffset || 0) - 8, 0),
      (range?.startOffset || 0) + 1
    );
    const canShowMenu =
      /\/\s?([^\s]+)?$/.test(partialText) && e.key !== 'Escape';

    // We don't want the menu moving as the user types, hence we check if it's currently displaying, i.e. bound would most likely be null at this point
    if (caretRect?.y && !this.caretRect) this.caretRect = caretRect;

    if (this.caretRect && canShowMenu) {
      const textFilter = partialText.trim().replace(/.*\/(\s?([^\s]+)?)/, '$1');
      const left =
        this.caretRect.left ||
        (textarea.offsetParent as HTMLElement).offsetLeft ||
        0;

      // Add menu list items
      this.list.innerHTML = '';
      this.feedback.textContent = textFilter || '...';
      this.blocks
        .filter(
          (block) =>
            partialText === '/' ||
            new RegExp(`${textFilter}`, 'i').test(block.title)
        )
        .forEach((block) => {
          this.list.insertAdjacentHTML(
            'beforeend',
            this.preprocess(itemHtml, {
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
        this.removeSlash(textarea);
        this.appendTextarea(
          textarea,
          itemElement.dataset as { tag: string; placeholder: string }
        );
        this.showMenu(false);
      };
      this.list.onkeydown = (e) => {
        if (e.key === 'Escape') {
          this.showMenu(false);
          this.query(`#${document.body.dataset.activetextarea}`)?.focus();
        }

        if (!this.isShowingMenu) this.list.onkeydown = null;
      };
      this.caretObserver.style.top = `${this.caretRect.top || 0}px`;
      this.caretObserver.style.left = `${left}px`;
      this.caretObserver.style.height = `${this.caretRect.height || 0}px`;

      // Move menu accordingly in x-axis if all part of it is not visible within the screen
      if (left + 336 > window.innerWidth) {
        this.menu.style.transformOrigin = `${window.innerWidth - left}px top`;
        this.menu.style.left = `${window.innerWidth - (left + 336)}px`;
      } else {
        this.menu.style.left = '0';
        this.menu.style.transformOrigin = 'left top';
      }

      // Move menu accordingly in y-axis if all part of it is not visible within the screen
      if (
        this.menu.offsetHeight >
        window.innerHeight - this.caretObserver.offsetTop - 32
      ) {
        this.menu.style.bottom = '100%';
        this.menu.style.top = 'unset';
        this.menu.style.transformOrigin =
          this.menu.style.transformOrigin.replace('top', 'bottom');
      } else {
        this.menu.style.bottom = 'unset';
        this.menu.style.top = '100%';
        this.menu.style.transformOrigin =
          this.menu.style.transformOrigin.replace('bottom', 'top');
      }
    }

    this.showMenu(canShowMenu);
    if (!canShowMenu) this.caretRect = null;
    document.body.dataset.activetextarea = textarea.id;
  };

  private appendTextarea = (
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

    textarea.addEventListener('keydown', (e) => {
      this.switchContextTextarea(e, true);
    });
    textarea.addEventListener('keyup', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
      } else this.setMenuPosition(e as any);
    });
    textarea.addEventListener('blur', () => (this.caretRect = null));
    textarea.focus();
  };
}

export const menu = new Menu({ html }, main, SVGIcon);
