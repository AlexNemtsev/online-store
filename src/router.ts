import FiltersObject from './interfaces/filters';
// import product from './interfaces/product';
// import MainPageView from './view/main-page-view';

// const productPageHandler = (): void => {
//   console.log('Draw product');
// };

class Router {
  // private static routes: { [key: string]: (products: product[]) => void } = {
  //   '/': MainPageView.draw,
  //   'product-details': productPageHandler,
  // };

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
      .map(([key, values]) => `${key}=${values.join('|')}`)
      .join('&');

    return `?${query}`;
  }

  private static transformUrlParams(urlParams?: string): FiltersObject {
    const params: string | undefined = urlParams?.substring(1);
    const filters: FiltersObject = {};

    params?.split('&').forEach((filterString) => {
      const [key, values] = filterString.split('=');
      filters[key] = values?.split('|');
    });

    return filters;
  }

  static handleLocation(): void {
    const path: string = window.location.pathname;
    const filters = Router.transformUrlParams(window.location.search);

    switch (path) {
      case '/':
        // MainPageView.draw()
        break;

      default:
        break;
    }

    // if (path === '/') Router.routes[path]();
    // else {
    //   const parts = path.split('/');
    //   Router.routes[parts[1]]();
    // }
    // const content: string = Router.routes[path] || path['404'];
    // Router.updatePage(content);
  }

  // private static updatePage(content: string): void {
  //   const header: HTMLElement | null = document.querySelector('h1');
  //   if (header) header.textContent = content;
  // }
}

export default Router;
