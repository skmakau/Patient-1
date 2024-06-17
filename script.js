function toggleLegend(legendId) {
    const legend = document.getElementById(legendId);
    if (legend.style.display === 'none' || legend.style.display === '') {
        legend.style.display = 'block';
    } else {
        legend.style.display = 'none';
    }
}

document.getElementById('surveyForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Validate the form manually to ensure all required fields are filled
    const form = document.getElementById('surveyForm');
    const requiredFields = form.querySelectorAll('input[required]');
    let allFieldsFilled = true;

    // Check each group of radio buttons
    const radioGroups = [...new Set([...form.querySelectorAll('input[type="radio"]')].map(radio => radio.name))];

    radioGroups.forEach(group => {
        const radioButtons = form.querySelectorAll(`input[name="${group}"]`);
        const isChecked = Array.from(radioButtons).some(radio => radio.checked);
        if (!isChecked) {
            allFieldsFilled = false;
            // Set focus on the first radio button of the group
            form.querySelector(`input[name="${group}"]`).focus();
        }
    });

    // Check other required fields
    requiredFields.forEach(field => {
        if (!field.value) {
            allFieldsFilled = false;
            field.focus();
        }
    });

    if (!allFieldsFilled) {
        alert('Please fill out all ratings before submitting.');
        return;
    }

    const formData = new FormData(form);
    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });

    fetch('https://script.google.com/macros/s/AKfycbzIZ0gq2g3VAgHB0aah22l0-eWsWs8p7-tbRN6eg7nWE2uzOIN1lj05NyriOqBsZs5x/exec', {
        method: 'POST',
        headers: {
            'Content-Type': 'text/plain',
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
        alert('Thank you for your ratings!');
        window.close();
    })
    .catch((error) => {
        console.error('Submission error:', error);
        alert('Thank you for your ratings!');
        window.close();
    });
});


