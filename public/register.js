document.getElementById('registerForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const securityQuestion1 = document.getElementById('securityQuestion1').value;
    const securityAnswer1 = document.getElementById('securityAnswer1').value;
    const securityQuestion2 = document.getElementById('securityQuestion2').value;
    const securityAnswer2 = document.getElementById('securityAnswer2').value;
    const securityQuestion3 = document.getElementById('securityQuestion3').value;
    const securityAnswer3 = document.getElementById('securityAnswer3').value;

    fetch('/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email, 
          password, 
          securityQuestion1, 
          securityAnswer1, 
          securityQuestion2, 
          securityAnswer2, 
          securityQuestion3, 
          securityAnswer3 
        }),
    })
    .then(response => response.text())
    .then(data => {
        alert(data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
});
