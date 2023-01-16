import FiltersObject from './interfaces/filters';

class FiltersListener {
  public static appliedFilters: FiltersObject = {};

  public static setListeners(queryHandler: (filters: FiltersObject) => void) {
    FiltersListener.addCheckboxListener(queryHandler);
    FiltersListener.addRangeListener(queryHandler);
    FiltersListener.addSortListener(queryHandler);
    FiltersListener.addSearchListener(queryHandler);
    FiltersListener.addGridListener(queryHandler);
  }

  private static addCheckboxListener(
    queryHandler: (filters: FiltersObject) => void,
  ): void {
    const checkboxFilters = document.querySelector(
      '.filters__checkboxes',
    ) as HTMLElement;
    checkboxFilters.addEventListener('click', (event: Event) => {
      event.preventDefault();
      if (event.target instanceof HTMLLabelElement) {
        const checkboxInput = event.target
          .previousElementSibling as HTMLInputElement;
        const parameter = checkboxInput.parentElement?.parentElement?.previousElementSibling?.textContent?.toLowerCase() as string;
        if (!checkboxInput.checked) {
          if (
            Object.prototype.hasOwnProperty.call(
              FiltersListener.appliedFilters,
              parameter,
            )
          ) {
            FiltersListener.appliedFilters[parameter].push(checkboxInput.id);
          } else {
            FiltersListener.appliedFilters[parameter] = [checkboxInput.id];
          }
        } else {
          const index: number = FiltersListener.appliedFilters[
            parameter
          ].indexOf(checkboxInput.id);
          FiltersListener.appliedFilters[parameter].splice(index, 1);
          if (FiltersListener.appliedFilters[parameter].length === 0)
            delete FiltersListener.appliedFilters[parameter];
        }
      }
      queryHandler(FiltersListener.appliedFilters);
    });
  }

  private static addRangeListener(
    queryHandler: (filters: FiltersObject) => void,
  ): void {
    const rangeFilters = document.querySelector(
      '.filters__ranges',
    ) as HTMLElement;
    rangeFilters.addEventListener('click', (event: Event) => {
      if (event.target instanceof HTMLInputElement) {
        const parameter = event.target.parentElement?.parentElement?.previousElementSibling?.textContent?.toLowerCase() as string;
        const rangeInputs = event.target.parentElement?.querySelectorAll(
          '.range__input',
        ) as NodeListOf<HTMLInputElement>;
        FiltersListener.appliedFilters[parameter] = [
          rangeInputs[0].value,
          rangeInputs[1].value,
        ];
        queryHandler(FiltersListener.appliedFilters);
      }
    });
  }

  private static addSortListener(
    queryHandler: (filters: FiltersObject) => void,
  ): void {
    const sortSelect = document.querySelector('.sort') as HTMLSelectElement;
    sortSelect.addEventListener('change', () => {
      const selectedOption = sortSelect.options[sortSelect.selectedIndex].value;
      sortSelect.selectedIndex = 0;
      FiltersListener.appliedFilters.sort = [selectedOption];
      queryHandler(FiltersListener.appliedFilters);
    });
  }

  private static addSearchListener(
    queryHandler: (filters: FiltersObject) => void,
  ): void {
    const searchInput = document.querySelector('.search') as HTMLInputElement;
    searchInput.addEventListener('input', () => {
      const searchQuery = searchInput.value;
      if (searchQuery.length > 0) {
        FiltersListener.appliedFilters.search = [searchQuery];
      } else {
        delete FiltersListener.appliedFilters.search; 
      }
      queryHandler(FiltersListener.appliedFilters);
    });
  }

  private static addGridListener(
    queryHandler: (filters: FiltersObject) => void,
  ): void {
    const gridButtons = document.querySelector('.products__grid-buttons') as HTMLElement;
    gridButtons.addEventListener('click', (event) => {
      if (event.target instanceof HTMLButtonElement) {
        if (event.target.classList.contains('products__grid-button--matrix')) {
          FiltersListener.appliedFilters.grid = ['matrix'];
        }
        if (event.target.classList.contains('products__grid-button--column')) {
          FiltersListener.appliedFilters.grid = ['column'];
        }
      }
      queryHandler(FiltersListener.appliedFilters);
    });
  }
}

export default FiltersListener;
