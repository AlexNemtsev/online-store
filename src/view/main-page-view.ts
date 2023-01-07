import GridView from './grid-view';
import FiltersView from './filters-view';
import Product from '../interfaces/product';
import FiltersListener from '../filters-listener';
import FiltersHandler from '../filters-handler';
import SortHandler from '../sort-handler';
import SearchHandler from '../search-handler';
import FiltersObject from '../interfaces/filters';
import ProductsBarView from './products-bar-view';
import Builder from '../builder';

class MainPageView {
  private static _allProducts: Product[];

  public static get allProducts() {
    return MainPageView._allProducts;
  }

  private static copyLinkHandler(e: Event): void {
    navigator.clipboard
      .writeText(window.location.href)
      .then(() => {
        const btn = e.target as HTMLButtonElement;
        btn.textContent = 'Copied!';
        setTimeout(() => {
          btn.textContent = 'Copy link';
        }, 500);
      })
      .catch(() => {});
  }

  // private static resetFiltersHandler(): void {

  // }

  private static noProductsFound(): void {
    const cards = document.querySelector('.cards') as HTMLElement;
    cards.innerHTML = '';
    const header = document.createElement('h1');
    header.textContent = 'No products Found';
    cards.append(header);
  }

  public static init(products: Product[]): void {
    MainPageView._allProducts = products;
  }

  static draw(
    filters: FiltersObject,
    queryHandler: (filters: FiltersObject) => void,
    linkHandler: (e: Event) => void,
  ): void {
    const parentElement = document.querySelector('.main') as HTMLElement;
    parentElement.innerHTML = '';
    const container = Builder.createBlock('div', ['main-page', 'container']);
    const cards = Builder.createBlock('div', ['cards']);
    const productsBlock = Builder.createBlock('div', ['products']);

    parentElement.append(container);
    container.append(FiltersView.draw(MainPageView.allProducts), productsBlock);
    productsBlock.append(ProductsBarView.draw(), cards);
    FiltersListener.appliedFilters = filters;
    FiltersListener.setListeners(queryHandler);

    const productsForRendering: Product[] = MainPageView.runFilters(cards, filters);
    if (productsForRendering.length)
      GridView.draw(productsForRendering, linkHandler);
    else MainPageView.noProductsFound();
    ProductsBarView.updateProductsCount(productsForRendering.length);

    const copyLinkBtn = document.querySelector('#copy-link-btn');
    copyLinkBtn?.addEventListener('click', MainPageView.copyLinkHandler);

    const resetFiltersBtn = document.querySelector('#reset-filters-btn');
    resetFiltersBtn?.addEventListener('click', () => queryHandler({}));
  }

  private static runFilters(cards: HTMLElement, filters: FiltersObject): Product[] {
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
    if (Object.keys(filters).includes('search'))
      productsForRendering = SearchHandler.handleSearch(
        filters,
        productsForRendering,
      );
    if (Object.keys(filters).includes('grid')) {
      const [gridOption]: (string | number)[] = [...filters.grid];
      MainPageView.handleGridOption(cards, gridOption.toString());
    }

    return productsForRendering;
  }

  private static handleGridOption(cards: HTMLElement, option: string): void {
    const gridButtons: Element[] = [...document.querySelectorAll('.products__grid-button')];

    if (option === 'column') {
      gridButtons[0].classList.remove('products__grid-button--active');
      gridButtons[1].classList.add('products__grid-button--active');
      if (!cards.classList.contains('cards--column')) {
        cards.classList.add('cards--column');
      }
    }
    if (option === 'matrix') {
      gridButtons[1].classList.remove('products__grid-button--active');
      gridButtons[0].classList.add('products__grid-button--active');
      if (cards.classList.contains('cards--column')) {
        cards.classList.remove('cards--column');
      }
    }
  }
}

export default MainPageView;
