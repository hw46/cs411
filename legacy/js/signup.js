document.getElementById('signUp').addEventListener('click', function() {
    window.open('account_management.html', '_blank', 'width=600,height=400');
  });

document.getElementById('registerForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    fetch('https://your-backend-url/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Registration successful!');
        } else {
            alert('Registration failed!');
        }
    })
    .catch(error => console.error('Error:', error));
});
