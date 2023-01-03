class Router {
  private static routes: { [key: string]: string } = {
    // '404': '404 ERROR',
    // '/': 'HOME',
    // '/about': 'ABOUT',
    // '/lorem': 'LOREM',
  };

  static setRoute(e: Event): void {
    const event: Event = e || window.event;
    event.preventDefault();

    let href: string | undefined;

    if (event.currentTarget instanceof HTMLAnchorElement) {
      href = event.currentTarget.href;
    }

    window.history.pushState({}, '', href);
    // Router.handleLocation();
  }

  static setUrlParams(filters: {
    [key: string]: Array<string | number>;
  }): void {
    const params = Router.transformToUrlParams(filters);
    window.history.pushState(filters, '', params);
  }

  private static transformToUrlParams(filters: {
    [key: string]: Array<string | number>;
  }): string {
    const query: string = Object.entries(filters)
      .map(([key, values]) => `${key}=${values.join('|')}`)
      .join('&');

    return `?${query}`;
  }

  static handleLocation(): void {
    const path: string = window.location.pathname;
    const content: string = Router.routes[path] || path['404'];
    Router.updatePage(content);
  }

  private static updatePage(content: string): void {
    const header: HTMLElement | null = document.querySelector('h1');
    if (header) header.textContent = content;
  }
}

export default Router;
