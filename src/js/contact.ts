const form: HTMLFormElement = document.getElementById('contact-form') as HTMLFormElement;
const inputElements: NodeListOf<HTMLInputElement | HTMLTextAreaElement> = form.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>('input, textarea');

const errors: { add: (message: string) => void; listElement: HTMLUListElement; clear: () => void } = {
  listElement: document.getElementById('errors') as HTMLUListElement,
  add: (message: string) => {
    const listItemElement = document.createElement('li');
    listItemElement.textContent = message;

    errors.listElement.appendChild(listItemElement);
  },
  clear: () => errors.listElement.replaceChildren()
};


form.addEventListener('submit', (e: SubmitEvent) => {
  e.preventDefault();
  let isErr = false;
  errors.clear();

  inputElements.forEach((inputElement: HTMLInputElement | HTMLTextAreaElement) => {
    if (!inputElement.value || inputElement.value.length === 0) {
      errors.add(`${inputElement.name} can not be empty`);
      return isErr = true;
    }

    if (inputElement.type === 'tel' && !/^\+\d{8,17}$/.test(inputElement.value)) {
      errors.add(`${inputElement.name} has to be a valid telephone number`);
      return isErr = true;
    }
  });

  if (!isErr)
    form.submit();
});
