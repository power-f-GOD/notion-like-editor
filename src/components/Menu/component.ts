import { Q, preprocess } from 'src/utils';
import { SVGIcon } from '../SVGIcon';
import menuHtml from './component.html?raw';
import itemHtml from './item.html?raw';
import { getTextareaTemplate } from '../Main/component';

let caretObserver: HTMLElement;
let menu: HTMLElement;
let bound: Partial<DOMRect> | null = null;

export const Menu = () => {
  // defer (or delay with setTimeout) till after component/element is mounted before (proceeding and) adding listeners
  setTimeout(() => {
    caretObserver = Q<HTMLElement>('[data-caret-observer]')!;
    console.log('Menu component mounted!');
    menu = caretObserver.querySelector("[role='menu']") as HTMLElement;
    appendTextarea();
    document.body.addEventListener('click', (e) => {
      if (!menu.contains(e.target as HTMLElement)) {
        caretObserver.classList.remove('show-menu');
      }
    });
  });

  return menuHtml;
};

const blocks = [
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

const moveCaretToEnd = (textarea: HTMLElement & Element) => {
  const range = document.createRange();
  const selection = window.getSelection();

  range.selectNodeContents(textarea);
  range.collapse(false);
  selection!.removeAllRanges();
  selection!.addRange(range);
  textarea.focus();
};

const switchContextTextarea = (
  e: KeyboardEvent,
  textarea: HTMLElement,
  allowSwitch?: boolean
) => {
  const selection = window.getSelection();
  const range = selection && selection?.getRangeAt(0);
  const caretRect = range?.getBoundingClientRect();
  const textareaRect = textarea.getBoundingClientRect();
  const {
    previousElementSibling: previousTextarea,
    nextElementSibling: nextTextarea
  } = textarea;

  if (allowSwitch) {
    if (
      (e.key === 'ArrowUp' || e.key === 'Backspace') &&
      caretRect!.x <= textareaRect.x &&
      previousTextarea
    ) {
      e.preventDefault();
      moveCaretToEnd(previousTextarea as HTMLElement);
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
      moveCaretToEnd(nextTextarea as HTMLElement);
    } else if (e.key === 'Enter') {
      e.preventDefault();
    }
  }

  return { selection, range, caretRect, textareaRect };
};

const setMenuPosition = (e: KeyboardEvent) => {
  const textarea = e.currentTarget as HTMLElement;
  const { range, caretRect, textareaRect } = switchContextTextarea(e, textarea);
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
  if (caretRect?.y && !bound) bound = caretRect;
  console.log({ caretRect, textareaRect });

  if (bound && canDisplayMenu) {
    const list = menu.querySelector('ul')!;
    const feedback = menu.querySelector('[data-feedback]')!;
    const textFilter = partialText.replace(/.*\/\s*(\w*)/, '$1');
    const left =
      bound.left || (textarea.offsetParent as HTMLElement).offsetLeft || 0;

    // Add menu list items
    list.innerHTML = '';
    feedback.textContent = textFilter || '/';
    blocks
      .filter(
        (block) =>
          partialText === '/' ||
          new RegExp(`${textFilter}`, 'i').test(block.title)
      )
      .forEach((block) => {
        list.insertAdjacentHTML(
          'beforeend',
          preprocess(itemHtml, {
            ...block,
            placeholder: block.placeholder || block.title,
            'text-t': SVGIcon('text-t', 'min-w-[1.75rem] opacity-40')
          })
        );
      });

    if (list.childElementCount === 0) {
      list.innerHTML = `<p class="p-3">No results.🥲</p>`;
    }

    // Add a click listener to parent list element with which child button elements will, sort of, inherit from
    list.onclick = (e) => {
      const element = e.target as HTMLElement;

      if (element.tagName !== 'BUTTON') return;
      appendTextarea(
        textarea,
        element.dataset as { tag: string; placeholder: string }
      );
      caretObserver.classList.remove('show-menu');
    };
    caretObserver.style.top = `${bound.top || 0}px`;
    caretObserver.style.left = `${left}px`;
    caretObserver.style.height = `${bound.height || 0}px`;

    if (left + 320 > window.innerWidth) {
      menu.style.transformOrigin = `${left}px top`;
      menu.style.left = `${window.innerWidth - (left + 336)}px`;
    } else {
      menu.style.left = '0';
      menu.style.transformOrigin = 'left top';
    }
  }

  caretObserver.classList[canDisplayMenu ? 'add' : 'remove']('show-menu');
  if (!canDisplayMenu) bound = null;
};

const appendTextarea = (
  node?: HTMLElement,
  props?: { tag: string; placeholder: string }
) => {
  const id = String(Math.random()).replace('0.', 'id');
  const template = getTextareaTemplate({
    id,
    tag: 'div',
    placeholder: blocks[0].placeholder!,
    ...props
  });
  const textareasContainer = Q('[data-textareas-container]') as HTMLElement;

  if (node) node.insertAdjacentHTML('afterend', template);
  else {
    textareasContainer.insertAdjacentHTML('beforeend', template);
  }

  const textarea = Q<HTMLElement>(`#${id}`) as HTMLElement;

  textarea.dataset.i = String(
    +(
      (textarea.previousElementSibling as HTMLElement | null)?.dataset.i || -1
    ) + 1
  );
  textarea.addEventListener('keydown', (e) => {
    switchContextTextarea(e, textarea, true);
  });
  textarea.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      appendTextarea(textarea);
    } else setMenuPosition(e as any);
  });
  textarea.addEventListener('blur', () => (bound = null));
  textarea.focus();
};
