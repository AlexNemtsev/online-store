const addOrderValidation = (): void => {
  const form = document.querySelector('#order-form') as HTMLFormElement;

  const nameField = document.querySelector('#name') as HTMLInputElement;
  const nameError = document.querySelector('.name-error') as HTMLInputElement;

  const validateName = () => {
    const nameStrArr = nameField.value.split(' ');

    if (nameStrArr.length < 2 || !nameStrArr.every((name) => name.length > 3)) {
      nameError.textContent = 'error';
      return false;
    }

    nameError.textContent = '';
    return true;
  };

  nameField.addEventListener('blur', () => {
    validateName();
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const validations = [validateName()];

    if (validations.every((val) => val)) console.log('confirmed');
  });
};

export default addOrderValidation;
