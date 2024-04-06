document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    fetch('/auth/login', { // Changed to match your routing prefix
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP status ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        if (data.token) {
            // Consider the security implications of using localStorage for tokens
            localStorage.setItem('token', data.token);
            alert('Login successful!');
            window.location.href = '/home.html'; // Redirect to the home or dashboard page
        } else {
            alert('Login failed. Please check your credentials.');
        }
    })
    .catch((error) => {
        console.error('Error:', error);
        alert('Login failed. Please try again later.');
    });
});
