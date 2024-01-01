var submitBtn = document.querySelector('#submitBtn');
submitBtn.addEventListener('click', (event) => {
    event.preventDefault();
    var resetMethod = document.querySelector('input[name="method"]:checked').value;
    var userInput = document.getElementById('user_input').value;
    console.log(userInput);
    // Perform password reset based on the selected method
    if (resetMethod === 'email') {
        // Password reset via email logic (for demo purposes)
        console.log('Resetting password via email');
    } else if (resetMethod === 'sms') {
        // Password reset via SMS logic (for demo purposes)
        console.log('Resetting password via SMS');
    }
});
