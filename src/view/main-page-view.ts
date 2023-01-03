import GridView from './grid-view';
import FiltersView from './filters-view';
import product from '../interfaces/product';

class MainPageView {
  static draw(products: product[]): void {
    const parentElement = document.querySelector('.main') as HTMLElement;
    parentElement.innerHTML = '';
    const container = document.createElement('div');
    container.classList.add('main-page', 'container');
    const cards = document.createElement('div');
    cards.classList.add('cards');

    parentElement.append(container);
    container.append(FiltersView.draw(products), cards);
    GridView.draw(products);
  }
}

export default MainPageView;
