const updatePage = (content: string): void => {
  const header: HTMLElement | null = document.querySelector('.header');
  if (header) header.textContent = content;
};

const routes: { [key: string]: string } = {
  '404': '404 ERROR',
  '/': 'HOME',
  '/about': 'ABOUT',
  '/lorem': 'LOREM',
};

const handleLocation = () => {
  const path: string = window.location.pathname;
  const content: string = routes[path] || path['404'];
  updatePage(content);
};

const route = (e: Event): void => {
  const event: Event = e || window.event;
  event.preventDefault();

  let href: string | undefined;

  if (event.target instanceof HTMLAnchorElement) {
    href = event.target.href;
  }

  window.history.pushState({}, '', href);
  handleLocation();
};

export { route, handleLocation };
