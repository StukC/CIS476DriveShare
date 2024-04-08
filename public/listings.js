document.addEventListener('DOMContentLoaded', function() {
    loadCarListings();
});

function loadCarListings() {
    const listingsContainer = document.getElementById('carListings');
    listingsContainer.innerHTML = ''; // Clear existing listings
    
    const carsData = JSON.parse(localStorage.getItem('carsData')) || [];
    
    carsData.forEach((car, index) => {
        const carElement = document.createElement('div');
        carElement.classList.add('listing');
        carElement.innerHTML = `
            <h3>${car.make} ${car.model}</h3>
            <p>Year: ${car.year}</p>
            <p>Mileage: ${car.mileage} miles</p>
            <p>Location: ${car.location}</p>
            <p>Price per Day: $${car.pricePerDay}</p>
            <p>Availability: ${car.startDate} to ${car.endDate}</p>
            <button class="edit-btn" onclick="editListing(${index})">Edit</button>
        `;
        listingsContainer.appendChild(carElement);
    });
}

function editListing(index) {
    const carsData = JSON.parse(localStorage.getItem('carsData')) || [];
    const car = carsData[index];
    
    // For simplicity, prompt for new values. A modal or separate form would be a better user experience.
    const newPrice = prompt("Enter new price per day:", car.pricePerDay);
    const newStartDate = prompt("Enter new start date (YYYY-MM-DD):", car.startDate);
    const newEndDate = prompt("Enter new end date (YYYY-MM-DD):", car.endDate);

    // Update car data
    car.pricePerDay = newPrice;
    car.startDate = newStartDate;
    car.endDate = newEndDate;

    // Save back to localStorage
    localStorage.setItem('carsData', JSON.stringify(carsData));

    // Reload listings
    loadCarListings();
}
