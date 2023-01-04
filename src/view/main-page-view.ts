import GridView from './grid-view';
import FiltersView from './filters-view';
import Product from '../interfaces/product';
import FiltersHandler from '../filters-handler';
import FiltersObject from '../interfaces/filters';

class MainPageView {
  private static isFiltersShown = false;

  static draw(filters: FiltersObject, linkHandler: (e: Event) => void): void {
    const allProducts: Product[] = FiltersHandler.products;
    let products: Product[];
    if (Object.keys(filters).length !== 0) {
      products = FiltersHandler.handleFilters(filters);
    } else {
      products = allProducts;
    }

    if (!MainPageView.isFiltersShown) {
      const parentElement = document.querySelector('.main') as HTMLElement;
      parentElement.innerHTML = '';
      const container = document.createElement('div');
      container.classList.add('main-page', 'container');
      const cards = document.createElement('div');
      cards.classList.add('cards');

      parentElement.append(container);
      container.append(FiltersView.draw(allProducts), cards);
      FiltersHandler.setHandlers();

      MainPageView.isFiltersShown = true;
    }

    GridView.draw(products, linkHandler);
  }
}

export default MainPageView;
