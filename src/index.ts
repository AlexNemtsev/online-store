import './style.css';

import { route, handleLocation } from './router';

const links: HTMLCollection | undefined = document.querySelector('.sidebar')
  ?.children;

for (let i = 0; links && i < links?.length; i += 1) {
  links[i].addEventListener('click', route);
}

window.addEventListener('popstate', handleLocation);
handleLocation();
