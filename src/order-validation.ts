const addOrderValidation = (): void => {
  const form = document.querySelector('#order-form') as HTMLFormElement;

  const nameField = document.querySelector('#name') as HTMLInputElement;
  const nameError = document.querySelector('.name-error') as HTMLInputElement;

  const phoneField = document.querySelector('#phone') as HTMLInputElement;
  const phoneError = document.querySelector('.phone-error') as HTMLInputElement;

  const validateName = (): boolean => {
    const regexTemplate = /^[A-z]{3,} [A-z]{3,}$/;

    if (!regexTemplate.test(nameField.value)) {
      nameError.textContent = 'error';
      return false;
    }

    nameError.textContent = '';
    return true;
  };

  nameField.addEventListener('blur', () => {
    validateName();
  });

  const validatePhone = (): boolean => {
    const regexTemplate = /^[+]{1,1}[0-9]{9,}$/;
    const phone = phoneField.value;

    if (!regexTemplate.test(phone)) {
      phoneError.textContent = 'error';
      return false;
    }

    phoneError.textContent = '';
    return true;
  };

  phoneField.addEventListener('blur', () => {
    validatePhone();
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const validations = [validateName()];

    if (validations.every((val) => val)) console.log('confirmed');
  });
};

export default addOrderValidation;
