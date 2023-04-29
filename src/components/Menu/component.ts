import { Q, preprocess } from 'src/utils';
import { SVGIcon } from '../SVGIcon';
import menuHtml from './component.html?raw';
import itemHtml from './item.html?raw';
import { getTextareaTemplate } from '../Main/component';

const blocks = [
  { title: 'Text', tag: 'p', description: 'Plain text or paragraph.' },
  { title: 'Heading 1', tag: 'h1', description: 'Big section heading.' },
  { title: 'Heading 2', tag: 'h3', description: 'Medium section heading.' },
  { title: 'Heading 3', tag: 'h5', description: 'Small section heading.' }
];

export const Menu = () => {
  setTimeout(() => {
    const textareaIds: Record<string, string> = {};
    const caretObserver = Q<HTMLElement>('[data-caret-observer]')!;
    console.log('Menu component!', caretObserver);
    let bound: Partial<DOMRect> | null = null;

    const setPos = (e: KeyboardEvent) => {
      const textarea = e.currentTarget as HTMLElement;
      const selection = window.getSelection();
      const range = selection && selection?.getRangeAt(0);
      const rect = range?.getBoundingClientRect();
      const text = textarea.textContent!;
      const canShowMenu =
        e.key &&
        text
          .trim()
          .slice(
            Math.max((range?.startOffset || 0) - 4, 0),
            (range?.startOffset || 0) + 1
          )
          .includes('/');

      if (rect?.y && !bound) bound = rect;
      console.log({ e });

      if (bound && canShowMenu) {
        const menu = caretObserver.querySelector("[role='menu'") as HTMLElement;
        const list = menu.querySelector('ul')!;
        const left =
          bound.left || (textarea.offsetParent as HTMLElement).offsetLeft || 0;

        blocks.forEach((block) => {
          list.insertAdjacentHTML(
            'beforeend',
            preprocess(itemHtml, {
              ...block,
              'text-t': SVGIcon('text-t', 'min-w-[1.75rem] opacity-40')
            })
          );
        });
        list.addEventListener('click', (e) => {
          const element = e.target as HTMLElement;

          if (element.tagName !== 'BUTTON') return;
          appendTextarea(textarea, element.dataset.tag);
          console.log(e.target);
        });
        console.log({ bound, rect, left });
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

      caretObserver.classList[canShowMenu ? 'add' : 'remove']('show-menu');
      if (!canShowMenu) bound = null;
    };

    const appendTextarea = (node?: HTMLElement, tag?: string) => {
      const id = String(Math.random()).replace('0.', 'id');
      const template = getTextareaTemplate(id, tag || 'div');
      const textareasContainer = Q('[data-textareas-container]') as HTMLElement;

      textareaIds[id] = id;

      if (node) node.insertAdjacentHTML('afterend', template);
      else {
        textareasContainer.insertAdjacentHTML('beforeend', template);
      }

      const textarea = Q<HTMLElement>(`#${id}`) as HTMLElement;

      textarea.dataset.i = String(
        +(
          (textarea.previousElementSibling as HTMLElement | null)?.dataset.i ||
          -1
        ) + 1
      );
      textarea.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') e.preventDefault();

        if (e.key === 'Backspace' && textarea.previousElementSibling) {
          (textarea.previousElementSibling as HTMLDivElement).focus();
        }
      });
      textarea.addEventListener('keyup', (e) => {
        if (e.key === 'Enter' && !textarea.nextElementSibling) {
          e.preventDefault();
          appendTextarea(textarea);
        } else setPos(e as any);
      });
      textarea.addEventListener('blur', () => (bound = null));
      textarea.focus();
    };

    appendTextarea();
  });

  return menuHtml;
};
