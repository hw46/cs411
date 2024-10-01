document.getElementById('updatePasswordForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const oldPassword = document.getElementById('oldPassword').value;
    const newPassword = document.getElementById('newPassword').value;

    fetch('https://your-backend-url/update-password', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ oldPassword, newPassword })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Password updated successfully!');
        } else {
            alert('Password update failed!');
        }
    })
    .catch(error => console.error('Error:', error));
});
