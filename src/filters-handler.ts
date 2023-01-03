import filtersObject from './interfaces/filters';
import product from './interfaces/product';
import Router from './router';
import GridView from './view/grid-view';

type filterKey = 'category' | 'brand' | 'price' | 'stock';

class FiltersHandler {
  products: product[];
  appliedFilters: filtersObject;
  checkboxFilters: string[];

  constructor(products: product[]) {
    this.products = products;
    this.appliedFilters = {};
    this.checkboxFilters = ['category', 'brand'];
    this.setHandlers();
  }

  private handleFilters(filters: filtersObject): product[] {
    let filteredProducts: product[] = this.products;
    const filterArray: Array<[string, Array<string | number>]> = Object.entries(
      filters,
    );
    filterArray.forEach((filter) => {
      let newFilteredProducts: product[] = [];
      const parameter = filter[0] as filterKey;
      for (let product of filteredProducts) {
        if (this.checkboxFilters.includes(filter[0])) {
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

  private setHandlers(): void {
    const filters = document.querySelector('.filters') as HTMLElement;
    filters.addEventListener('click', (event: Event) => {
      if (event.target instanceof HTMLInputElement) {
        const parameter = event.target.parentElement?.parentElement?.previousElementSibling?.textContent?.toLowerCase() as string;
        if (event.target.type === 'checkbox') {
          if (event.target.checked) {
            this.appliedFilters.hasOwnProperty(parameter)
              ? this.appliedFilters[parameter].push(event.target.id)
              : (this.appliedFilters[parameter] = [event.target.id]);
          } else {
            const index: number = this.appliedFilters[parameter].indexOf(
              event.target.id,
            );
            this.appliedFilters[parameter].splice(index, 1);
            if (this.appliedFilters[parameter].length === 0)
              delete this.appliedFilters[parameter];
          }
        } else if (event.target.type === 'range') {
          const rangeInputs = event.target.parentElement?.querySelectorAll(
            '.range__input',
          ) as NodeListOf<HTMLInputElement>;
          this.appliedFilters[parameter] = [
            rangeInputs[0].value,
            rangeInputs[1].value,
          ];
        }
        Router.setUrlParams(this.appliedFilters);

        const filteredProducts = this.handleFilters(this.appliedFilters);
        GridView.draw(filteredProducts);
      }
    });
  }
}

export default FiltersHandler;
