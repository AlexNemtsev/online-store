import GridView from './grid-view';
import FiltersView from './filters-view';
import Product from '../interfaces/product';
import FiltersHandler from '../filters-handler';
import FiltersObject from '../interfaces/filters';
import ProductsBarView from './products-bar-view';
import Builder from '../builder';

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
      const container = Builder.createBlock('div', ['main-page', 'container']);
      const cards = Builder.createBlock('div', ['cards']);
      const productsBlock = Builder.createBlock('div', ['products']);

      parentElement.append(container);
      container.append(FiltersView.draw(allProducts), productsBlock);
      productsBlock.append(ProductsBarView.draw(), cards);
      FiltersHandler.setHandlers();

      MainPageView.isFiltersShown = true;
    }

    GridView.draw(products, linkHandler);
  }
}

export default MainPageView;
