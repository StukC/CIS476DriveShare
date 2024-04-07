document.getElementById('emailForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('email').value;

    fetch('/auth/get-security-questions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
    })
    .then(response => {
        if (!response.ok) throw new Error(`HTTP status ${response.status}`);
        return response.json();
    })
    .then(data => {
        if (data && data.questions) {
            displaySecurityQuestions(data.questions);
            document.getElementById('emailForm').style.display = 'none';
        } else {
            throw new Error('Security questions not received.');
        }
    })
    .catch(error => {
        console.error('Error fetching security questions:', error);
        alert('Failed to fetch security questions. Please try again.');
    });
});

function displaySecurityQuestions(questions) {
    const container = document.getElementById('securityQuestionsContainer');
    container.innerHTML = '';

    questions.forEach((question, index) => {
        const div = document.createElement('div');
        div.className = 'form-group';

        const label = document.createElement('label');
        label.htmlFor = `answer${index}`;
        label.textContent = question;
        div.appendChild(label);

        const input = document.createElement('input');
        input.type = 'text';
        input.id = `answer${index}`;
        input.name = `answer${index}`;
        input.required = true;
        div.appendChild(input);

        container.appendChild(div);
    });

    const submitButton = document.createElement('button');
    submitButton.textContent = 'Verify Answers';
    submitButton.onclick = submitSecurityAnswers;
    container.appendChild(submitButton);

    container.style.display = 'block'; // Show the security questions
}

function submitSecurityAnswers() {
    const answers = Array.from(document.querySelectorAll('#securityQuestionsContainer input'))
                         .map(input => input.value);

    const email = document.getElementById('email').value;

    fetch('/auth/verify-security-answers', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, answers }),
    })
    .then(response => {
        if (!response.ok) throw new Error(`HTTP status ${response.status}`);
        return response.json();
    })
    .then(() => {
        document.getElementById('securityQuestionsContainer').style.display = 'none';
        document.getElementById('resetPasswordForm').style.display = 'block';
    })
    .catch(error => {
        console.error('Error verifying security questions:', error);
        alert('Failed to verify security answers. Please try again.');
    });
}

document.getElementById('resetPasswordForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const newPassword = document.getElementById('newPassword').value;
    const email = document.getElementById('email').value;

    fetch('/auth/reset-password', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, newPassword }),
    })
    .then(response => {
        if (!response.ok) throw new Error(`HTTP status ${response.status}`);
        return response.json();
    })
    .then(() => {
        alert('Your password has been reset successfully.');
        window.location.href = 'login.html';
    })
    .catch(error => {
        console.error('Error resetting password:', error);
        alert('Failed to reset password. Please try again.');
    });
});
