class CarBuilder {
    constructor() {
      this.car = {};
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
  
    setAvailability(availabilityCalendar) {
      this.car.availabilityCalendar = availabilityCalendar;
      return this;
    }
  
    setLocation(pickUpLocation) {
      this.car.pickUpLocation = pickUpLocation;
      return this;
    }
  
    setPricing(rentalPricing) {
      this.car.rentalPricing = rentalPricing;
      return this;
    }
  
    // Any additional settings can be added here using the same pattern
  
    build() {
      // You could include validation logic here before returning the final car object
      return this.car;
    }
  }