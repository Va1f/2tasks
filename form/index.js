const form = document.getElementById('myForm');
const gosnomerInput = document.getElementById('gosnomer');
const passportSeriesInput = document.getElementById('passportSeries');
const passportNumberInput = document.getElementById('passportNumber');

loadFormData();

form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (form.checkValidity()) {
        saveFormData();
        console.log('Форма валидна. Отправка данных...');
    } else {
        console.log('Пожалуйста, заполните все поля корректно.');
    }
});

gosnomerInput.addEventListener('input', () => {
    const value = gosnomerInput.value.toUpperCase().replace(/[^А-Я0-9]/g, '');
    const formattedValue = formatGosnomer(value);
    gosnomerInput.value = formattedValue;
});

passportSeriesInput.addEventListener('input', () => {
    const value = passportSeriesInput.value.replace(/\D/g, '');
    passportSeriesInput.value = value.substring(0, 4);
});

passportNumberInput.addEventListener('input', () => {
    const value = passportNumberInput.value.replace(/\D/g, '');
    passportNumberInput.value = value.substring(0, 6);
});

function formatGosnomer(value) {
    const regionLength = value.length > 6 ? 3 : 2;
    const formattedValue = [];
    let index = 0;

    if (value.length > 0) {
        formattedValue.push(value.substring(index, index + 1));
        index++;
    }

    if (value.length > 1) {
        formattedValue.push(value.substring(index, index + 3));
        index += 3;
    }

    if (value.length > 4) {
        formattedValue.push(value.substring(index, index + 2));
        index += 2;
    }

    if (value.length > 6) {
        formattedValue.push(value.substring(index, index + regionLength));
    }

    return formattedValue.join(' ');
}

function saveFormData() {
    const formData = {
        gosnomer: gosnomerInput.value,
        vehicle: document.getElementById('vehicle').value,
        arrivalDate: document.getElementById('arrivalDate').value,
        fullName: document.getElementById('fullName').value,
        passportSeries: passportSeriesInput.value,
        passportNumber: passportNumberInput.value,
        issuedBy: document.getElementById('issuedBy').value,
        issuedDate: document.getElementById('issuedDate').value,
    };

    localStorage.setItem('formData', JSON.stringify(formData));
}

function loadFormData() {
    const savedData = localStorage.getItem('formData');
    if (savedData) {
        const formData = JSON.parse(savedData);
        gosnomerInput.value = formData.gosnomer;
        document.getElementById('vehicle').value = formData.vehicle;
        document.getElementById('arrivalDate').value = formData.arrivalDate;
        document.getElementById('fullName').value = formData.fullName;
        passportSeriesInput.value = formData.passportSeries;
        passportNumberInput.value = formData.passportNumber;
        document.getElementById('issuedBy').value = formData.issuedBy;
        document.getElementById('issuedDate').value = formData.issuedDate;
    }
}

function resetForm() {
    form.reset();
    localStorage.removeItem('formData');
}