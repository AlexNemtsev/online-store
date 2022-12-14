const route = (event: Event) => {
  event = event || window.event;
  event.preventDefault();
  const { target } = event;
  let href;

  if (target instanceof HTMLAnchorElement) {
    href = target.href;
  }
  window.history.pushState({}, '', href);
};

// const routes = {};

// const handleLocation = async () => void {
//   const path = window.location.pathname;
// };

export default route;
