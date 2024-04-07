// Mediator object
const carListingMediator = (function() {
    const channels = {};

    const subscribe = function(channel, fn) {
        if (!channels[channel]) channels[channel] = [];
        channels[channel].push({ context: this, callback: fn });
        return this;
    };

    const publish = function(channel, ...args) {
        if (!channels[channel]) return false;
        channels[channel].forEach(subscription => {
            subscription.callback.apply(subscription.context, args);
        });
        return this;
    };

    return {
        subscribe,
        publish
    };
})();

// Helper function to convert image to Base64
function convertToBase64(file, callback) {
    const reader = new FileReader();
    reader.onload = function(e) {
        const base64 = btoa(e.target.result);
        callback(base64);
    };
    reader.readAsBinaryString(file);
}

// Subscription for listCar event
carListingMediator.subscribe('listCar', formData => {
    const listCarButton = document.querySelector('button[type="submit"]');
    listCarButton.disabled = true;

    fetch('/list-car', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP status ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        alert('Car listed successfully!');
        window.location.href = '/your-listings.html'; // Redirect to the listings page
    })
    .catch(error => {
        alert('Listing failed. Please try again.');
        console.error('Listing failed:', error);
    })
    .finally(() => {
        listCarButton.disabled = false;
    });
});

// List car form event listener using mediator
document.getElementById('carListingForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const formData = {
        make: document.getElementById('make').value,
        model: document.getElementById('model').value,
        year: document.getElementById('year').value,
        mileage: document.getElementById('mileage').value,
        // Include other form fields here
        image: document.getElementById('base64Image').value // The Base64 image string
    };

    // Check if a file was selected
    const fileInput = document.getElementById('carImage');
    if (fileInput.files && fileInput.files[0]) {
        convertToBase64(fileInput.files[0], function(base64Image) {
            formData.image = base64Image;
            carListingMediator.publish('listCar', formData);
        });
    } else {
        // If no image was selected, proceed without the image
        carListingMediator.publish('listCar', formData);
    }
});
