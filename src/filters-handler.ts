import filters from './interfaces/filters';
import product from './interfaces/product';
import Router from './router';
import GridView from './view/grid-view';

type filterKey = 'category' | 'brand';

class FiltersHandler {
  products: product[];
  checkboxFilters: filters;

  constructor(products: product[]) {
    this.products = products;
    this.checkboxFilters = {};
    this.setHandlers();
  }

  handleCheckboxes(filters: filters): product[] {
    let filteredProducts: product[] = this.products;
    let newFilteredProducts: product[] = [];
    const filterArray = Object.entries(filters);
    filterArray.forEach((filter) => {
      if (filter[1].length > 0) {
        newFilteredProducts = [];
        const parameter = filter[0] as filterKey;
        for (let product of filteredProducts) {
          if (filter[1].includes(product[parameter]))
            newFilteredProducts.push(product);
        }
        filteredProducts = newFilteredProducts;
      }
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
            this.checkboxFilters.hasOwnProperty(parameter)
              ? this.checkboxFilters[parameter].push(event.target.id)
              : (this.checkboxFilters[parameter] = [event.target.id]);
          } else {
            const index: number = this.checkboxFilters[parameter].indexOf(
              event.target.id,
            );
            this.checkboxFilters[parameter].splice(index, 1);
          }
        }
        Router.setUrlParams(this.checkboxFilters);

        const filteredProducts: product[] = this.handleCheckboxes(
          this.checkboxFilters,
        );
        GridView.draw(filteredProducts);
      }
    });
  }
}

export default FiltersHandler;
