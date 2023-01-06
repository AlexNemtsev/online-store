import FiltersObject from './interfaces/filters';
import MainPageView from './view/main-page-view';
import ProductPageView from './view/product-view';
import PageNotFoundView from './view/page-not-found-view';
// import ProductPageView from './view/product-view';
// import PageNotFoundView from './view/page-not-found-view';

const productPageDummy = (id: string): void => {
  console.log('details of product', id);
};
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

    return `?${query}`;
  }

  private static transformUrlParams(urlParams: string): FiltersObject {
    const filters: FiltersObject = {};

    if (urlParams) {
      const params: string = urlParams.substring(1);
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
    const prevState: unknown = window.history.state;

    if (path === '/') {
      MainPageView.draw(
        filters,
        Router.setUrlParams,
        Router.setRoute,
        prevState,
      );
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
          cartPageDummy();
          break;

        default:
          PageNotFoundView.draw();
          break;
      }
    }
  }
}

export default Router;
