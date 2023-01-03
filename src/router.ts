import filtersObject from './interfaces/filters';

const mainPageHandler = (): void => {
  console.log('Draw main');
};

const productPageHandler = (): void => {
  console.log('Draw product');
};

class Router {
  private static routes: { [key: string]: () => void } = {
    // '404': '404 ERROR',
    // '/': 'HOME',
    // '/about': 'ABOUT',
    // '/lorem': 'LOREM',
    '/': mainPageHandler,
    'product-details': productPageHandler,
  };

  static setRoute(e: Event): void {
    const event: Event = e || window.event;
    event.preventDefault();

    let href: string | undefined;

    if (event.currentTarget instanceof HTMLAnchorElement) {
      href = event.currentTarget.href;
    }

    window.history.pushState({}, '', href);
    Router.handleLocation();
  }

  static setUrlParams(filters: filtersObject): void {
    const params = Router.transformToUrlParams(filters);
    window.history.pushState(filters, '', params);
    Router.handleLocation();
  }

  private static transformToUrlParams(filters: filtersObject): string {
    const query: string = Object.entries(filters)
      .map(([key, values]) => `${key}=${values.join('|')}`)
      .join('&');

    return `?${query}`;
  }

  private static transformUrlParams(urlParams: string): filtersObject {
    const params: string = urlParams.substring(1);
    const filters: filtersObject = {};

    params.split('&').forEach((filterString) => {
      const [key, values] = filterString.split('=');
      filters[key] = values.split('|');
    });

    return filters;
  }

  static handleLocation(): void {
    const path: string = window.location.pathname;

    if (path === '/') {
      Router.routes[path]();
    } else {
      const parts = path.split('/');
      Router.routes[parts[1]]();
    }
    // const content: string = Router.routes[path] || path['404'];
    // Router.updatePage(content);
  }

  // private static updatePage(content: string): void {
  //   const header: HTMLElement | null = document.querySelector('h1');
  //   if (header) header.textContent = content;
  // }
}

export default Router;
