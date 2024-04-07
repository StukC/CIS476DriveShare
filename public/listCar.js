document.addEventListener('DOMContentLoaded', function() {
    const carListingForm = document.getElementById('carListingForm');
    const carImageInput = document.getElementById('carImage');
    const startDateInput = document.getElementById('startDate');
    const endDateInput = document.getElementById('endDate');

    carListingForm.addEventListener('submit', function(event) {
        event.preventDefault();

        // Validate dates
        if (!validateDates()) {
            alert('Please check the dates. The start date must be before the end date.');
            return;
        }

        // Create a FormData object, which allows you to form key-value pairs
        const formData = new FormData();
        formData.append('make', carListingForm.elements['make'].value);
        formData.append('model', carListingForm.elements['model'].value);
        formData.append('year', carListingForm.elements['year'].value);
        formData.append('mileage', carListingForm.elements['mileage'].value);
        formData.append('features', carListingForm.elements['features'].value); // Assuming this is a comma-separated list
        formData.append('location', carListingForm.elements['location'].value); // Assuming this is a stringified JSON of coordinates
        formData.append('pricing', JSON.stringify({ perDay: carListingForm.elements['pricePerDay'].value }));
        formData.append('availability', JSON.stringify([{ startDate: startDateInput.value, endDate: endDateInput.value }]));
        // Add the car image to formData if it exists
        if (carImageInput.files.length > 0) {
            formData.append('carImage', carImageInput.files[0]);
        }

        // Get the token from localStorage and prepare the headers
        const token = localStorage.getItem('token'); // Assuming you've stored the token under the key 'token'
        const headers = new Headers();
        headers.append('Authorization', 'Bearer ' + token);

        // Since we are including a file, we do not set Content-Type to application/json
        // The browser will set the Content-Type to multipart/form-data and include the boundary
        fetch('/api/list-car', {
            method: 'POST',
            headers: headers,
            body: formData
        })        
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            alert('Car listed successfully!');
            window.location.href = '/some-other-page'; // Redirect as needed
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
            alert('Error listing car. Please try again.');
        });
    });

    // Function to validate dates
    function validateDates() {
        const startDate = new Date(startDateInput.value);
        const endDate = new Date(endDateInput.value);
        return startDate < endDate;
    }
});
