import product from './interfaces/product';
import GridView from './view/grid-view';

type filterKey = 'category' | 'brand';

class FiltersHandler {
  products: product[];
  checkboxFilters: {[key: string]: Array<string | number>};

  constructor(products: product[]) {
    this.products = products;
    this.checkboxFilters = {};
  }

  handleCheckboxs(filters: {[key: string]: Array<string | number>}): product[] {
    let filteredProducts: product[] = this.products;
    let newFilteredProducts: product[] = [];
    const filterArray = Object.entries(filters);
    filterArray.forEach(filter => {
      if (filter[1].length > 0) {
        newFilteredProducts = [];
        const parameter = filter[0] as filterKey;
        for (let product of filteredProducts) {
          if (filter[1].includes(product[parameter])) newFilteredProducts.push(product);
        }
        filteredProducts = newFilteredProducts;
      }
    })
    return filteredProducts;
  }

  setHandlers():void {
    const filters = document.querySelector('.filters') as HTMLElement;
    filters.addEventListener('click', (event: Event) => {
      if (event.target instanceof HTMLInputElement) {
        const parameter = event.target.parentElement?.parentElement?.previousElementSibling?.textContent?.toLowerCase() as string;
        if (event.target.type === 'checkbox') {
          if (event.target.checked) {
            this.checkboxFilters.hasOwnProperty(parameter) 
            ? 
              this.checkboxFilters[parameter].push(event.target.id)
            :
              this.checkboxFilters[parameter] = [event.target.id];
          } else {
            const index: number = this.checkboxFilters[parameter].indexOf(event.target.id);
            this.checkboxFilters[parameter].splice(index, 1);
          }
        }
        const filteredProducts = this.handleCheckboxs(this.checkboxFilters);
        GridView.draw(filteredProducts);
      }
    })
  }
}

export default FiltersHandler;