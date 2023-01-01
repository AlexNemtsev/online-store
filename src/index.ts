import './style.scss';

import { setRoute, handleLocation } from './router';

import DataLoader from './data-loader';
import MainPageView from './view/main-page-view';
import product from './interfaces/product';

let allTheProducts: product[];

const logoLink = document.getElementById('logo-link');
logoLink?.addEventListener('click', setRoute);

const cartLink = document.getElementById('cart-link');
cartLink?.addEventListener('click', setRoute);

DataLoader.fetchProductsData().then((products) => {
  allTheProducts = products;
  MainPageView.draw(products);
});

window.addEventListener('popstate', handleLocation);
handleLocation();
