import GridView from './grid-view';
import FiltersView from './filters-view';
import Product from '../interfaces/product';
import FiltersHandler from '../filters-handler';
import FiltersObject from '../interfaces/filters';

class MainPageView {
  private static noProductsFound(): void {
    const cards = document.querySelector('.cards') as HTMLElement;
    cards.innerHTML = '';
    const header = document.createElement('h1');
    header.textContent = 'No products Found';
    cards.append(header);
  }

  static draw(
    filters: FiltersObject,
    toUrlFunc: (filters: FiltersObject) => void,
    linkHandler: (e: Event) => void,
    prevState: unknown,
  ): void {
    const allProducts: Product[] = FiltersHandler.products;
    let products: Product[];
    if (Object.keys(filters).length !== 0) {
      products = FiltersHandler.handleFilters(filters);
    } else {
      products = allProducts;
    }

    if (
      prevState === null ||
      Object.keys(prevState as FiltersObject).length === 0
    ) {
      const parentElement = document.querySelector('.main') as HTMLElement;
      parentElement.innerHTML = '';
      const container = document.createElement('div');
      container.classList.add('main-page', 'container');
      const cards = document.createElement('div');
      cards.classList.add('cards');

      parentElement.append(container);
      container.append(FiltersView.draw(allProducts), cards);
      FiltersHandler.setHandlers(toUrlFunc);
    }

    if (products.length) GridView.draw(products, linkHandler);
    else MainPageView.noProductsFound();
  }
}

export default MainPageView;
