import GridView from './grid-view';
import FiltersView from './filters-view';
import ProductsBarView from './products-bar-view';
import Builder from '../builder';
import product from '../interfaces/product';

class MainPageView {
  static draw(products: product[]): void {
    const parentElement = document.querySelector('.main') as HTMLElement;
    parentElement.innerHTML = '';
    const container = Builder.createBlock('div', ['main-page', 'container']);
    const cards = Builder.createBlock('div', ['cards']);
    const productsBlock = Builder.createBlock('div', ['products']);

    parentElement.append(container);
    container.append(FiltersView.draw(products), productsBlock);
    productsBlock.append(ProductsBarView.draw(), cards);
    GridView.draw(products);
  }
}

export default MainPageView;
