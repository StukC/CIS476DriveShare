document.addEventListener('DOMContentLoaded', function() {
    const carListingForm = document.getElementById('carListingForm');
    const carImageInput = document.getElementById('carImage');

    carListingForm.addEventListener('submit', function(event) {
        event.preventDefault();

        // Create a FormData object, which allows you to form key-value pairs
        const formData = new FormData(carListingForm);
        
        // If an image was selected, read it as Data URL (Base64)
        if (carImageInput.files.length > 0) {
            const file = carImageInput.files[0];
            const reader = new FileReader();

            reader.onloadend = function() {
                // After conversion, add the Base64 image to the form data
                formData.append('carImage', reader.result);

                // Send the form data with the Base64 image to the server
                submitCarListing(formData);
            };

            reader.readAsDataURL(file); // This will convert the image to Base64
        } else {
            // If no image, just send the form data
            submitCarListing(formData);
        }
    });

    function submitCarListing(formData) {
        // Here we handle the submission to the server
        // Assuming the server is expecting JSON, we'll convert FormData to a JSON object
        const jsonData = Object.fromEntries(formData.entries());

        fetch('/api/list-car', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(jsonData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json(); // Or 'response.text()' if your server responds with text
        })
        .then(data => {
            console.log(data); // Handle success
            alert('Car listed successfully!');
            // Optionally redirect or clear form here
            // window.location.href = '/some-where-else';
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
            alert('Error listing car. Please try again.');
        });
    }
});
