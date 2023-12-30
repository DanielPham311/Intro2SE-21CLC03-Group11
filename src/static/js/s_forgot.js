function resetPassword() {
    // Get the selected reset method (email or sms)
    var resetMethod = document.querySelector('input[name="resetMethod"]:checked').value;

    // Perform password reset based on the selected method
    if (resetMethod === 'email') {
        // Password reset via email logic (for demo purposes)
        console.log('Resetting password via email');
    } else if (resetMethod === 'sms') {
        // Password reset via SMS logic (for demo purposes)
        console.log('Resetting password via SMS');
    }
}
