import DataHandler from '../data-handler';
import product from '../interfaces/product';

class FiltersView {
  private static fillCheckboxGroup(group: Element, parameters: {[key: string]: number}): void {
    const filtersList = group.querySelector('.filters__list') as HTMLElement;
    const checkboxTemplate = document.getElementById('checkbox-template',) as HTMLTemplateElement;

    Object.keys(parameters).forEach((item) => {
      const checkbox = checkboxTemplate.content.cloneNode(true) as HTMLElement;
      const checkboxInput = checkbox.querySelector('.checkbox__input') as HTMLInputElement;
      const checkboxLabel = checkbox.querySelector('.checkbox__label') as HTMLLabelElement;
      checkboxInput.id = item;
      checkboxLabel.htmlFor = item;
      checkboxLabel.textContent = item;
      filtersList.append(checkbox);
    })
  }

  private static fillRange(
    block: Element, 
    min: number, 
    max: number, 
    isPrice: boolean,
  ): void {
    const rangeFrom = block.querySelector('.range__from') as HTMLElement;
    const rangeTo = block.querySelector('.range__to') as HTMLElement;
    const rangeInputs = [...block.querySelectorAll('.range__input')] as HTMLInputElement[];

    rangeFrom.textContent = isPrice ? `$${min}` : `${min}`;
    rangeTo.textContent = isPrice ? `$${max}` : `${max}`;
    rangeInputs.forEach((rangeInput, index) => {
      rangeInput.min = min.toString();
      rangeInput.max = max.toString();
      rangeInput.value = (index === 0) ? min.toString() : max.toString();
    })
  }

  static draw(
    items: product[],
  ): HTMLElement {
    const blockTemplate = document.getElementById(
      'filters-template',
    ) as HTMLTemplateElement;
    const filtersBlock = blockTemplate.content.cloneNode(true) as HTMLElement;
    const filtersGroups: Element[] = [...filtersBlock.querySelectorAll('.filters__group')];

    const categories: {[key: string]: number} = DataHandler.getCategories(items);
    const brands: {[key: string]: number} = DataHandler.getBrands(items);

    FiltersView.fillCheckboxGroup(filtersGroups[0], categories);
    FiltersView.fillCheckboxGroup(filtersGroups[1], brands);
    FiltersView.fillRange(filtersGroups[2], DataHandler.getMinPrice(items), DataHandler.getMaxPrice(items), true);
    FiltersView.fillRange(filtersGroups[3], DataHandler.getMinStock(items), DataHandler.getMaxStock(items), false);

    return filtersBlock;
  }
}

export default FiltersView;