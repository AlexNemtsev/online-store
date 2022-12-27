import './style.scss';

import Router from './router';

import DataLoader from './data-loader';
import GridView from './view/grid-view';
import product from './interfaces/product';

let allTheProducts: product[];

const logoLink = document.getElementById('logo-link');
logoLink?.addEventListener('click', Router.setRoute);

const cartLink = document.getElementById('cart-link');
cartLink?.addEventListener('click', Router.setRoute);

DataLoader.fetchProductsData().then((products) => {
  allTheProducts = products;
  GridView.draw(products);
});

window.addEventListener('popstate', Router.handleLocation);
Router.handleLocation();
