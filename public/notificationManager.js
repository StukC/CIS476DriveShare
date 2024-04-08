class NotificationManager {
  constructor() {
      this.observers = [];
  }

  subscribe(observer) {
      this.observers.push(observer);
  }

  unsubscribe(observerToRemove) {
      this.observers = this.observers.filter(observer => observer !== observerToRemove);
  }

  notify(data) {
      this.observers.forEach(observer => observer.update(data));
  }
}

// Example Observer
class UserNotification {
  constructor(userId) {
      this.userId = userId;
  }

  update(data) {
      console.log(`User ${this.userId} notified:`, data.message);
      // This could be expanded to update the UI, send an email, etc., based on the application's needs.
  }
}

// Creating an instance of the NotificationManager
const notificationManager = new NotificationManager();

// Subscribing users to notifications
const user1Notifications = new UserNotification(1);
notificationManager.subscribe(user1Notifications);

// Example usage: Emitting a notification
// notificationManager.notify({message: "Your booking has been confirmed!"});
