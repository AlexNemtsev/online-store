import FiltersObject from './interfaces/filters';
import MainPageView from './view/main-page-view';
import ProductPageView from './view/product-view';
import CartPageView from './view/cart-view';
import PageNotFoundView from './view/page-not-found-view';

const cartPageDummy = (): void => {
  console.log('cart page');
};

class Router {
  static setRoute = (e: Event): void => {
    const event: Event = e || window.event;
    event.preventDefault();

    let href: string | undefined;

    if (event.currentTarget instanceof HTMLAnchorElement) {
      href = event.currentTarget.href;
    }

    window.history.pushState({}, '', href);
    Router.handleLocation();
  };

  static setUrlParams(filters: FiltersObject): void {
    const params = Router.transformToUrlParams(filters);
    window.history.pushState(filters, '', params);
    Router.handleLocation();
  }

  private static transformToUrlParams(filters: FiltersObject): string {
    const query: string = Object.entries(filters)
      .map(([key, values]) => `${key}=${values.join(';')}`)
      .join('&');
    return `?${encodeURIComponent(query)}`;
  }

  private static transformUrlParams(urlParams: string): FiltersObject {
    const filters: FiltersObject = {};

    if (urlParams) {
      const params: string = decodeURIComponent(urlParams).substring(1);
      params.split('&').forEach((filterString) => {
        const [key, values] = filterString.split('=');
        filters[key] = values?.split(';');
      });
    }

    return filters;
  }

  static handleLocation(): void {
    const path: string = window.location.pathname;
    const filters = Router.transformUrlParams(window.location.search);

    if (path === '/') {
      MainPageView.draw(filters, Router.setUrlParams, Router.setRoute);
    } else {
      const page: string = path.split('/')[1];
      switch (page) {
        case 'product-details':
          // const productId = Number(path.split('/')[2]);
          ProductPageView.fillPageTemplate(
            MainPageView.allProducts[Number(path.split('/')[2]) - 1],
          );
          break;

        case 'cart':
          CartPageView.draw();
          break;

        default:
          PageNotFoundView.draw();
          break;
      }
    }
  }
}

export default Router;
