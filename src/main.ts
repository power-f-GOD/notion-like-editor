import './styles/index.scss';
import { Nav, Main, Menu } from './components';
import { Q } from './utils';

Q('#app')!.innerHTML = `
  ${Nav()}
  ${Main()}
  ${Menu()}
`;
