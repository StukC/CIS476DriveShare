document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.token) {
            // Save the token in localStorage and redirect or inform the user
            localStorage.setItem('token', data.token);
            alert('Login successful!');
            // Redirect to another page or update UI
        } else {
            alert('Login failed. Please check your credentials.');
        }
    })
    .catch((error) => {
        console.error('Error:', error);
        alert('Login failed. Please try again later.');
    });
});
