import FiltersObject from './interfaces/filters';
import Product from './interfaces/product';

type FilterKey = 'category' | 'brand' | 'price' | 'stock';

class FiltersHandler {
  private static handlerInstance: FiltersHandler;

  // TODO: перенести это поле из класса
  private static _products: Product[];

  private static checkboxFilters = ['category', 'brand'];

  private static appliedFilters: FiltersObject = {};

  public static get products() {
    return FiltersHandler._products;
  }

  public static init(products: Product[]): void {
    FiltersHandler._products = products;
  }

  public static handleFilters(filters: FiltersObject): Product[] {
    let filteredProducts: Product[] = FiltersHandler._products;
    const filterArray: Array<[string, Array<string | number>]> = Object.entries(
      filters,
    );
    filterArray.forEach((filter) => {
      const newFilteredProducts: Product[] = [];
      const parameter = filter[0] as FilterKey;
      filteredProducts.forEach((product) => {
        if (FiltersHandler.checkboxFilters.includes(filter[0])) {
          if (filter[1].includes(product[parameter]))
            newFilteredProducts.push(product);
        } else if (
          product[parameter] >= filter[1][0] &&
          product[parameter] <= filter[1][1]
        ) {
          newFilteredProducts.push(product);
        }
      });
      filteredProducts = newFilteredProducts;
    });
    return filteredProducts;
  }

  // TODO: Вынести этот метод из класса
  public static setHandlers(toUrlFunc: (filters: FiltersObject) => void): void {
    const filters = document.querySelector('.filters') as HTMLElement;
    filters.addEventListener('click', (event: Event) => {
      if (event.target instanceof HTMLInputElement) {
        const parameter = event.target.parentElement?.parentElement?.previousElementSibling?.textContent?.toLowerCase() as string;
        if (event.target.type === 'checkbox') {
          if (event.target.checked) {
            if (
              Object.prototype.hasOwnProperty.call(
                FiltersHandler.appliedFilters,
                parameter,
              )
            ) {
              FiltersHandler.appliedFilters[parameter].push(event.target.id);
            } else {
              FiltersHandler.appliedFilters[parameter] = [event.target.id];
            }
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
        toUrlFunc(FiltersHandler.appliedFilters);
      }
    });
  }
}

export default FiltersHandler;
