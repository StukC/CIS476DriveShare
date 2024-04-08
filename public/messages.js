document.getElementById('sendMessageForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const messageText = document.getElementById('messageText').value;

    // Here you would normally send the message to your server
    console.log("Sending message:", messageText);

    // For demonstration, just add the message to the message list
    addMessageToDisplay(messageText);

    // Clear the input field
    document.getElementById('messageText').value = '';
});

function addMessageToDisplay(message) {
    const messageList = document.getElementById('messageList');
    const messageElement = document.createElement('div');
    messageElement.textContent = message;
    messageList.appendChild(messageElement);
}

// Simulate loading previous messages
window.onload = function() {
    // Here you would normally fetch messages from your server
    const sampleMessages = ['Welcome to DriveShare messaging!', 'Your booking request has been confirmed.'];

    sampleMessages.forEach(addMessageToDisplay);
}
