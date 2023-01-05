import FiltersObject from './interfaces/filters';
import Product from './interfaces/product';

type FilterKey = 'category' | 'brand' | 'price' | 'stock';

class FiltersHandler {
  private static handlerInstance: FiltersHandler;

  private static checkboxFilters = ['category', 'brand'];
  
  private static rangeFilters = ['price', 'stock'];

  private static filterKeys = [...FiltersHandler.checkboxFilters, ...FiltersHandler.rangeFilters];

  public static get instance() {
    if (!FiltersHandler.handlerInstance)
      FiltersHandler.handlerInstance = new FiltersHandler();
    return FiltersHandler.handlerInstance;
  }

  private static handleRangeView(filters: [string, (string | number)[]][]): void {
    filters.forEach((filter) => {
      const inputs = [...document.querySelectorAll(`.range__input[data-filter="${filter[0]}"]`)] as HTMLInputElement[];
      for (let i = 0; i < inputs.length; i += 1) {
        if (inputs[i] instanceof HTMLInputElement) {
          inputs[i].value = filter[1][i].toString();
          const event = new Event('input');
          inputs[i].dispatchEvent(event);
        }
      }
    })
  }

  private static handleCheckboxesView(values: (string | number)[]): void {
    const checkboxInputs = [...document.querySelectorAll('.checkbox__input')] as HTMLInputElement[];
    checkboxInputs.forEach((input) => {
      input.checked = false;
      if (values.includes(input.id)) {
        input.checked = true;
      }
    })
  }

  private static filterProducts(
    filterArray: Array<[string, Array<string | number>]>,
    products: Product[]
  ): Product[] {
    let filteredProducts: Product[] = products;
    filterArray.forEach((filter) => {
      if (FiltersHandler.filterKeys.includes(filter[0])) {
        const newFilteredProducts: Product[] = [];
        const parameter = filter[0] as FilterKey;
        filteredProducts.forEach((product) => {
          if (FiltersHandler.checkboxFilters.includes(filter[0])) {
            if (filter[1].includes(product[parameter]))
              newFilteredProducts.push(product);
          } 
          if (FiltersHandler.rangeFilters.includes(filter[0])) { 
            if (
              product[parameter] >= filter[1][0] &&
              product[parameter] <= filter[1][1]
            ) {
              newFilteredProducts.push(product);
            }
          }
        });
        filteredProducts = newFilteredProducts;
      }
    });
    return filteredProducts; 
  }

  public static handleFilters(filters: FiltersObject, products: Product[]): Product[] {
    const filterArray: Array<[string, Array<string | number>]> = Object.entries(
      filters,
    );
    const checkboxValues: (string | number)[] = [];
    const rangeValues: [string, (string | number)[]][] = [];
    filterArray.forEach((filter) => {
      if (FiltersHandler.checkboxFilters.includes(filter[0])) {
        checkboxValues.push(...filter[1]);
      } else if (FiltersHandler.rangeFilters.includes(filter[0])) {
        rangeValues.push(filter);
      }
    })
    FiltersHandler.handleCheckboxesView(checkboxValues);
    FiltersHandler.handleRangeView(rangeValues);

    const filteredProducts: Product[] = FiltersHandler.filterProducts(filterArray, products);
    
    return filteredProducts;
  }
}

export default FiltersHandler;
