// Assuming NotificationManager and its setup are available in your project
// If not, simply comment out or remove the notification parts

class PaymentProcessor {
    processPayment(amount) {
        console.log(`Processing payment of $${amount}`);
        // Simulate payment processing logic
        return true; // Return false to simulate a failed payment
    }
}

class PaymentProxy {
    constructor() {
        this.paymentProcessor = new PaymentProcessor();
        this.balance = 5000; // Initial balance for demonstration
    }

    makePayment(amount) {
        if (this.paymentProcessor.processPayment(amount)) {
            this.balance -= amount;
            console.log(`Payment successful. New balance: $${this.balance}`);
            // Uncomment or modify the next line if you have implemented a notification system
            // notificationManager.notify({ message: `Payment of $${amount} was successful. New balance: $${this.balance}.` });
            return this.balance;
        } else {
            console.log("Payment failed.");
            return null;
        }
    }
}

const paymentProxy = new PaymentProxy();

document.getElementById('paymentForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const amountInput = document.getElementById('paymentAmount');
    const amount = parseInt(amountInput.value, 10);

    if (isNaN(amount) || amount <= 0) {
        alert("Please enter a valid payment amount.");
        return;
    }
    
    const newBalance = paymentProxy.makePayment(amount);
    
    if (newBalance !== null) {
        document.getElementById('balance').textContent = `New Balance: $${newBalance}`;
        alert(`Payment of $${amount} processed successfully!`);
        amountInput.value = ''; // Reset the input value
    } else {
        alert("Payment failed. Please try again.");
    }
});
