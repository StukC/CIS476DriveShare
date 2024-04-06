document.getElementById('registerForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Fetch form data
    const formData = {
        email: document.getElementById('email').value,
        password: document.getElementById('password').value,
        securityQuestion1: "Your first pet's name?", // The actual security question text
        securityAnswer1: document.getElementById('securityAnswer1').value,
        securityQuestion2: "The city you were born in?", // The actual security question text
        securityAnswer2: document.getElementById('securityAnswer2').value,
        securityQuestion3: "Your favorite book?", // The actual security question text
        securityAnswer3: document.getElementById('securityAnswer3').value
    };

    // Add console.log here to ensure formData is correct
    console.log(formData);

    // Disable the register button to prevent multiple submissions
    const registerButton = document.querySelector('button[type="submit"]');
    registerButton.disabled = true;

    // Send the POST request to the server
    fetch('/auth/register', { // Adjust this if your route is different
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
        return response.text();
    })
    .then(data => {
        // Log the success response from the server
        console.log(data);
        alert('Registration successful!');
        window.location.href = '/login.html'; // Redirect after register
    })
    .catch((error) => {
        console.error('Registration failed:', error);
        alert('Registration failed. Please try again.');
        
    })
    .finally(() => {
        registerButton.disabled = false; // Re-enable the register button
    });
});
