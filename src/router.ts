import FiltersObject from './interfaces/filters';
import MainPageView from './view/main-page-view';

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
      .map(([key, values]) => `${key}=${values.join('|')}`)
      .join('&');

    return `?${query}`;
  }

  private static transformUrlParams(urlParams: string): FiltersObject {
    const filters: FiltersObject = {};

    if (urlParams) {
      const params: string = urlParams.substring(1);
      params.split('&').forEach((filterString) => {
        const [key, values] = filterString.split('=');
        filters[key] = values?.split('|');
      });
    }

    return filters;
  }

  static handleLocation(): void {
    const path: string = window.location.pathname;
    const filters = Router.transformUrlParams(window.location.search);
    const prevState: unknown = window.history.state;

    switch (path) {
      case '/':
        MainPageView.draw(filters, Router.setRoute, prevState);
        break;

      default:
        break;
    }
  }
}

export default Router;
