import './style.scss';

import Router from './router';

import DataLoader from './data-loader';
import MainPageView from './view/main-page-view';
import FiltersHandler from './filters-handler';
import product from './interfaces/product';

let allTheProducts: product[];

const logoLink = document.getElementById('logo-link');
logoLink?.addEventListener('click', Router.setRoute);

const cartLink = document.getElementById('cart-link');
cartLink?.addEventListener('click', Router.setRoute);

DataLoader.fetchProductsData().then((products) => {
  allTheProducts = products;
  MainPageView.draw(products);
  const filtersHandler = new FiltersHandler(products);
});

window.addEventListener('popstate', Router.handleLocation);
Router.handleLocation();
