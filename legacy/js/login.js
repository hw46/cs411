  document.getElementById('loginButton').addEventListener('click', function() {
    document.getElementById('loginPopup').style.display = 'block';
  });
  
  document.getElementById('closePopup').addEventListener('click', function() {
    document.getElementById('loginPopup').style.display = 'none';
  });
  
  window.addEventListener('click', function(event) {
    if (event.target == document.getElementById('loginPopup')) {
      document.getElementById('loginPopup').style.display = 'none';
    }
  });

  document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    fetch('https://your-backend-url/user?query=${query}', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        document.getElementById('loginPopup').style.display = 'none';
        document.getElementById('loginButton').style.display = 'none';
        document.getElementById('signupButton').style.display = 'none';
        
        const greeting = document.createElement('div');
        greeting.innerText = `Hello, ${username}!`;
        document.body.appendChild(greeting);
      } else {
        document.getElementById('errorMessage').innerText = 'Wrong username or password!';
      }
    })
    .catch(error => console.error('Error:', error));
  });