import './styles/index.scss';
import { Nav } from './components';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  ${Nav}
`;
