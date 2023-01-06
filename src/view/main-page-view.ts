import GridView from './grid-view';
import FiltersView from './filters-view';
import Product from '../interfaces/product';
import FiltersListener from '../filters-listener';
import FiltersHandler from '../filters-handler';
import SortHandler from '../sort-handler';
import FiltersObject from '../interfaces/filters';
import ProductsBarView from './products-bar-view';
import Builder from '../builder';

class MainPageView {
  private static _allProducts: Product[];

  public static get allProducts() {
    return MainPageView._allProducts;
  }

  public static init(products: Product[]): void {
    MainPageView._allProducts = products;
  }

  static draw(
    filters: FiltersObject,
    queryHandler: (filters: FiltersObject) => void,
    linkHandler: (e: Event) => void,
    prevState: unknown,
  ): void {
    if (
      prevState === null ||
      Object.keys(prevState as FiltersObject).length === 0
    ) {
      const parentElement = document.querySelector('.main') as HTMLElement;
      parentElement.innerHTML = '';
      const container = Builder.createBlock('div', ['main-page', 'container']);
      const cards = Builder.createBlock('div', ['cards']);
      const productsBlock = Builder.createBlock('div', ['products']);

      parentElement.append(container);
      container.append(
        FiltersView.draw(MainPageView.allProducts),
        productsBlock,
      );
      productsBlock.append(ProductsBarView.draw(), cards);
      FiltersListener.appliedFilters = filters;
      FiltersListener.setListeners(queryHandler);
    }

    let productsForRendering: Product[];
    productsForRendering = FiltersHandler.handleFilters(
      filters,
      MainPageView.allProducts,
    );
    if (Object.keys(filters).includes('sort'))
      productsForRendering = SortHandler.handleSort(
        filters,
        productsForRendering,
      );
    GridView.draw(productsForRendering, linkHandler);
  }
}

export default MainPageView;
