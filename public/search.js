document.getElementById('searchForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const location = document.getElementById('searchLocation').value.toLowerCase();
    const startDate = new Date(document.getElementById('searchStartDate').value);
    const endDate = new Date(document.getElementById('searchEndDate').value);
    const carsData = JSON.parse(localStorage.getItem('carsData')) || [];
    
    document.getElementById('searchResults').innerHTML = ''; // Clear previous results
    
    const availableCars = carsData.filter(car => {
        const carStartDate = new Date(car.startDate);
        const carEndDate = new Date(car.endDate);
        // Filter cars based on the location and availability within the date range.
        return car.location.toLowerCase() === location &&
               endDate >= carStartDate && startDate <= carEndDate;
    });

    if (availableCars.length > 0) {
        availableCars.forEach(car => {
            const carElement = document.createElement('div');
            carElement.innerHTML = `
                <h3>${car.make} ${car.model}</h3>
                <p>Location: ${car.location}</p>
                <form onsubmit="bookCar(event, ${car.id})">
                    <input type="date" name="bookingStartDate" required>
                    <input type="date" name="bookingEndDate" required>
                    <button type="submit">Book Now</button>
                </form>
            `;
            document.getElementById('searchResults').appendChild(carElement);
        });
    } else {
        document.getElementById('searchResults').innerHTML = '<p>No cars found matching your criteria.</p>';
    }
});

function bookCar(event, carId) {
    event.preventDefault();

    const form = event.target;
    const startDate = new Date(form.bookingStartDate.value);
    const endDate = new Date(form.bookingEndDate.value);
    const carsData = JSON.parse(localStorage.getItem('carsData')) || [];

    const carIndex = carsData.findIndex(car => car.id === carId);
    if (carIndex === -1) {
        alert("Car not found.");
        return;
    }

    const car = carsData[carIndex];
    
    // Check if dates are valid
    if (startDate >= endDate) {
        alert("Start date must be before end date.");
        return;
    }

    // Check if the car is already booked for the selected period
    const isAvailable = !(car.bookings && car.bookings.some(booking => {
        const bookingStart = new Date(booking.startDate);
        const bookingEnd = new Date(booking.endDate);
        return (startDate < bookingEnd && endDate > bookingStart);
    }));

    if (!isAvailable) {
        alert("This car is already booked for the selected period.");
        return;
    }

    // Add booking to the car
    if (!car.bookings) car.bookings = [];
    car.bookings.push({ startDate: form.bookingStartDate.value, endDate: form.bookingEndDate.value });

    // Save updated cars data
    localStorage.setItem('carsData', JSON.stringify(carsData));
    
    alert("Car booked successfully!");
}
