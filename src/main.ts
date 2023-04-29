import './styles/index.scss';
import { nav, main, menu } from './components';

document.querySelector('#app')!.innerHTML = `
  ${nav.render()}
  ${main.render()}
  ${menu.render()}
`;
