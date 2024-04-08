class CarListingBuilder {
    constructor() {
      this.listing = {};
    }
  
    setModel(model) {
      this.listing.model = model;
      return this;
    }
  
    setMake(make) {
      this.listing.make = make;
      return this;
    }
  
    setYear(year) {
      this.listing.year = year;
      return this;
    }
  
    setMileage(mileage) {
      this.listing.mileage = mileage;
      return this;
    }
  
    setLocation(location) {
      this.listing.location = location;
      return this;
    }
  
    setPricing(pricing) {
      this.listing.pricing = pricing;
      return this;
    }
  
    setAvailability(availability) {
      this.listing.availability = availability;
      return this;
    }
  
    build() {
      return this.listing;
    }
  }
  
 