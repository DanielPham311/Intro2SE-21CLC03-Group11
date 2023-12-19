document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    // Add your logic to handle login here
    // For example, you can collect input values and perform validation or send data to a server
    // For this basic example, you can just console.log the input values
    const email = document.querySelector('input[type="email"]').value;
    const password = document.querySelector('input[type="password"]').value;
    console.log('Email:', email);
    console.log('Password:', password);
  });