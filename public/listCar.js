document.addEventListener('DOMContentLoaded', function() {
    const carListingForm = document.getElementById('carListingForm');
    const carImageInput = document.getElementById('carImage');
    const startDateInput = document.getElementById('startDate');
    const endDateInput = document.getElementById('endDate');

    carListingForm.addEventListener('submit', function(event) {
        event.preventDefault();

        if (!validateDates()) {
            alert('Please check the dates. The start date must be before the end date.');
            return;
        }

        const formData = new FormData(carListingForm);
        if (carImageInput.files.length > 0) {
            formData.append('carImage', carImageInput.files[0]);
        }

        const token = localStorage.getItem('token'); // Retrieving the stored token
        const headers = new Headers({
            'Authorization': 'Bearer ' + token, // Adding the Authorization header
        });

        fetch('/api/list-car', {
            method: 'POST',
            headers: headers, // Headers are passed here without 'Content-Type'
            body: formData // The FormData object is passed directly
        })        
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok: ' + response.statusText);
            }
            // We only parse the JSON response if the server actually sent JSON
            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                return response.json();
            }
            return response.text(); // If the server's response isn't JSON, handle it as text
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

    function validateDates() {
        const startDate = new Date(startDateInput.value);
        const endDate = new Date(endDateInput.value);
        return startDate < endDate;
    }
});
