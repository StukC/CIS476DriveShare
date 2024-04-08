class CarBuilder {
    constructor() {
        this.car = {};
    }

    setMake(make) {
        this.car.make = make;
        return this; // Return the instance to allow for chaining
    }

    setModel(model) {
        this.car.model = model;
        return this;
    }

    setYear(year) {
        this.car.year = year;
        return this;
    }

    setMileage(mileage) {
        this.car.mileage = mileage;
        return this;
    }

    setLocation(location) {
        this.car.location = location;
        return this;
    }

    setPricePerDay(pricePerDay) {
        this.car.pricePerDay = pricePerDay;
        return this;
    }

    setStartDate(startDate) {
        this.car.startDate = startDate;
        return this;
    }

    setEndDate(endDate) {
        this.car.endDate = endDate;
        return this;
    }

    // Method to return the final car object
    build() {
        return this.car;
    }
}
document.getElementById('carListingForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const car = new CarBuilder()
        .setMake(document.getElementById('make').value)
        .setModel(document.getElementById('model').value)
        .setYear(document.getElementById('year').value)
        .setMileage(document.getElementById('mileage').value)
        .setLocation(document.getElementById('location').value)
        .setPricePerDay(document.getElementById('pricePerDay').value)
        .setStartDate(document.getElementById('startDate').value)
        .setEndDate(document.getElementById('endDate').value)
        .build();

    // Retrieve existing cars array or initialize a new one
    const cars = JSON.parse(localStorage.getItem('carsData')) || [];
    cars.push(car); // Add the new car to the array
    localStorage.setItem('carsData', JSON.stringify(cars)); // Save back to localStorage
    
    alert('Car listed successfully!');
    window.location.href = 'home.html'; // Redirect or show a message
});

