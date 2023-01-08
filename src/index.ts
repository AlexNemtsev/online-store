import './style.scss';

import Router from './router';
import DataLoader from './data-loader';
import MainPageView from './view/main-page-view';
import Cart from './cart';

const logoLink = document.getElementById('logo-link');
logoLink?.addEventListener('click', (event) => Router.setRoute(event));

const cartLink = document.getElementById('cart-link');
cartLink?.addEventListener('click', (event) => Router.setRoute(event));

Cart.loadCart();

DataLoader.fetchProductsData()
  .then((products) => {
    MainPageView.init(products);
    Router.handleLocation();
  })
  .catch((error) => console.log(error));

window.addEventListener('popstate', () => Router.handleLocation());
