const updatePage = (content: string): void => {
  const header: HTMLElement | null = document.querySelector('h1');
  if (header) header.textContent = content;
};

const routes: { [key: string]: string } = {
  '404': '404 ERROR',
  '/': 'HOME',
  '/about': 'ABOUT',
  '/lorem': 'LOREM',
};

const handleLocation = (): void => {
  const path: string = window.location.pathname;
  const content: string = routes[path] || path['404'];
  updatePage(content);
};

const setRoute = (e: Event): void => {
  const event: Event = e || window.event;
  event.preventDefault();

  let href: string | undefined;

  if (event.currentTarget instanceof HTMLAnchorElement) {
    href = event.currentTarget.href;
  }

  window.history.pushState({}, '', href);
  // handleLocation();
};

export { setRoute, handleLocation };
