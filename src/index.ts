import './style.scss';

import Router from './router';

import DataLoader from './data-loader';
import FiltersHandler from './filters-handler';

const logoLink = document.getElementById('logo-link');
logoLink?.addEventListener('click', (event) => Router.setRoute(event));

const cartLink = document.getElementById('cart-link');
cartLink?.addEventListener('click', (event) => Router.setRoute(event));

DataLoader.fetchProductsData()
  .then((products) => {
    FiltersHandler.init(products);
    Router.handleLocation();
  })
  .catch((error) => console.log(error));

window.addEventListener('popstate', () => Router.handleLocation());
