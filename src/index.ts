import './style.scss';

// import { route, handleLocation } from './router';

// const links: HTMLCollection | undefined = document.querySelector('.sidebar')
//   ?.children;

// for (let i = 0; links && i < links?.length; i += 1) {
//   links[i].addEventListener('click', route);
// }

// window.addEventListener('popstate', handleLocation);
// handleLocation();

import DataLoader from './data-loader';
import gridView from './view/grid-view';

DataLoader.fetchProductsData()
  .then((products) => gridView(products))
  .catch((error) => console.log(error));
