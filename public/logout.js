function logout() {
    // Remove the token from localStorage or sessionStorage
    localStorage.removeItem('token'); // Replace 'jwtToken' with the key you use to store the token

    // Redirect to the login page
    window.location.href = '/login.html'; // Adjust if your login route is different
}
