import './style.scss';

import Router from './router';

import DataLoader from './data-loader';
import MainPageView from './view/main-page-view';
import FiltersHandler from './filters-handler';

const logoLink = document.getElementById('logo-link');
logoLink?.addEventListener('click', (event) => Router.setRoute(event));

const cartLink = document.getElementById('cart-link');
cartLink?.addEventListener('click', (event) => Router.setRoute(event));

DataLoader.fetchProductsData()
  .then((products) => {
    MainPageView.draw(products, Router.setRoute);
    FiltersHandler.init(products);
  })
  .catch(() => console.log('Cannot load data'));

window.addEventListener('popstate', () => Router.handleLocation());
Router.handleLocation();
