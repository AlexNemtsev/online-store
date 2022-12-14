import route from './router';

const nav = document.querySelector('.sidebar');

if (nav?.children) {
  for (const anchor of nav.children) {
    anchor.addEventListener('click', route);
  }
}
