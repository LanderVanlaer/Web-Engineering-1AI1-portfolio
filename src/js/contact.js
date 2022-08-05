const form = document.getElementById('contact-form');
const inputElements = form.querySelectorAll('input, textarea');
const errors = {
    listElement: document.getElementById('errors'),
    add: (message) => {
        const listItemElement = document.createElement('li');
        listItemElement.textContent = message;
        errors.listElement.appendChild(listItemElement);
    },
    clear: () => errors.listElement.replaceChildren()
};
form.addEventListener('submit', (e) => {
    e.preventDefault();
    let isErr = false;
    errors.clear();
    inputElements.forEach((inputElement) => {
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
//# sourceMappingURL=contact.js.map