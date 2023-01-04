import filtersObject from './interfaces/filters';
import product from './interfaces/product';
import Router from './router';
import GridView from './view/grid-view';

type filterKey = 'category' | 'brand' | 'price' | 'stock';

class FiltersHandler {
  private static _instance: FiltersHandler;

  private static products: product[];
  private static checkboxFilters = ['category', 'brand'];
  private static appliedFilters: filtersObject = {};

  private constructor() {
    FiltersHandler.setHandlers();
  }

  public static get instance() {
    if (!this.products)
      throw new Error('Singleton class must be initialized before!');

    return (
      FiltersHandler._instance ||
      (FiltersHandler._instance = new FiltersHandler())
    );
  }

  public static init(products: product[]): void {
    FiltersHandler.products = products;
    FiltersHandler.setHandlers();
  }

  private static handleFilters(filters: filtersObject): product[] {
    let filteredProducts: product[] = FiltersHandler.products;
    const filterArray: Array<[string, Array<string | number>]> = Object.entries(
      filters,
    );
    filterArray.forEach((filter) => {
      let newFilteredProducts: product[] = [];
      const parameter = filter[0] as filterKey;
      for (let product of filteredProducts) {
        if (FiltersHandler.checkboxFilters.includes(filter[0])) {
          if (filter[1].includes(product[parameter]))
            newFilteredProducts.push(product);
        } else {
          if (
            product[parameter] >= filter[1][0] &&
            product[parameter] <= filter[1][1]
          ) {
            newFilteredProducts.push(product);
          }
        }
      }
      filteredProducts = newFilteredProducts;
    });
    return filteredProducts;
  }

  private static setHandlers(): void {
    const filters = document.querySelector('.filters') as HTMLElement;
    filters.addEventListener('click', (event: Event) => {
      if (event.target instanceof HTMLInputElement) {
        const parameter = event.target.parentElement?.parentElement?.previousElementSibling?.textContent?.toLowerCase() as string;
        if (event.target.type === 'checkbox') {
          if (event.target.checked) {
            FiltersHandler.appliedFilters.hasOwnProperty(parameter)
              ? FiltersHandler.appliedFilters[parameter].push(event.target.id)
              : (FiltersHandler.appliedFilters[parameter] = [event.target.id]);
          } else {
            const index: number = FiltersHandler.appliedFilters[
              parameter
            ].indexOf(event.target.id);
            FiltersHandler.appliedFilters[parameter].splice(index, 1);
            if (FiltersHandler.appliedFilters[parameter].length === 0)
              delete FiltersHandler.appliedFilters[parameter];
          }
        } else if (event.target.type === 'range') {
          const rangeInputs = event.target.parentElement?.querySelectorAll(
            '.range__input',
          ) as NodeListOf<HTMLInputElement>;
          FiltersHandler.appliedFilters[parameter] = [
            rangeInputs[0].value,
            rangeInputs[1].value,
          ];
        }
        Router.setUrlParams(FiltersHandler.appliedFilters);

        const filteredProducts = FiltersHandler.handleFilters(
          FiltersHandler.appliedFilters,
        );
        GridView.draw(filteredProducts);
      }
    });
  }
}

export default FiltersHandler;
