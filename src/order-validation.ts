import Cart from './cart';

const addOrderValidation = (): void => {
  const form = document.querySelector('#order-form') as HTMLFormElement;

  const nameField = document.querySelector('#name') as HTMLInputElement;
  const nameError = document.querySelector('.name-error') as HTMLInputElement;

  const phoneField = document.querySelector('#phone') as HTMLInputElement;
  const phoneError = document.querySelector('.phone-error') as HTMLInputElement;

  const addressField = document.querySelector('#address') as HTMLInputElement;
  const adressError = document.querySelector(
    '.address-error',
  ) as HTMLInputElement;

  const emailField = document.querySelector('#email') as HTMLInputElement;
  const emailError = document.querySelector('.email-error') as HTMLInputElement;

  const cardNumField = document.querySelector('#card-num') as HTMLInputElement;
  const cardNumError = document.querySelector(
    '.card-num-error',
  ) as HTMLInputElement;

  const cvvField = document.querySelector('#cvv') as HTMLInputElement;
  const cvvError = document.querySelector('.cvv-error') as HTMLInputElement;

  const validateName = (): boolean => {
    const regexTemplate = /^([a-zA-Z]{3,}\s*){2,}$/;

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

  const validateAddress = (): boolean => {
    const regexTemplate = /^([a-zA-Z]{5,}\s*){3,}$/;

    if (!regexTemplate.test(addressField.value)) {
      adressError.textContent = 'error';
      return false;
    }

    adressError.textContent = '';
    return true;
  };

  addressField.addEventListener('blur', () => {
    validateAddress();
  });

  const validateEmail = (): boolean => {
    const regexTemplate = /^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/;

    if (!regexTemplate.test(emailField.value)) {
      emailError.textContent = 'error';
      return false;
    }

    emailError.textContent = '';
    return true;
  };

  emailField.addEventListener('blur', () => {
    validateEmail();
  });

  const validateCardNum = (): boolean => {
    const regexTemplate = /^[0-9]{16,16}$/;

    if (!regexTemplate.test(cardNumField.value)) {
      cardNumError.textContent = 'error';
      return false;
    }

    cardNumError.textContent = '';
    return true;
  };

  cardNumField.addEventListener('blur', () => {
    validateCardNum();
  });

  const validateCVV = (): boolean => {
    const regexTemplate = /^[0-9]{3,3}$/;

    if (!regexTemplate.test(cvvField.value)) {
      cvvError.textContent = 'error';
      return false;
    }

    cvvError.textContent = '';
    return true;
  };

  cvvField.addEventListener('blur', () => {
    validateCVV();
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const validations = [
      validateName(),
      validatePhone(),
      validateAddress(),
      validateEmail(),
      validateCardNum(),
      validateCVV(),
    ];

    if (validations.every((val) => val)) {
      const hiddenText = document.querySelector('.on-submit-text');
      hiddenText?.classList.add('active-text');
      setTimeout(() => {
        Cart.dropCart();
        document.location.href = '/';
      }, 3000);
    }
  });
};

export default addOrderValidation;
