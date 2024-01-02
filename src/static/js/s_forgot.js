var submitBtn = document.querySelector("#submitBtn");
submitBtn.addEventListener("click", async (event) => {
  event.preventDefault();
  var resetMethod = document.querySelector(
    'input[name="method"]:checked'
  ).value;
  var userInput = document.getElementById("user_input").value;
  console.log(userInput);

  // get detail spot
  let hostName = "";
  if (window.location.hostname.includes("localhost")) {
    hostName = "http://localhost:8080";
  } else {
    hostName = ""; // the link that it will be hosted
  }

  // Perform password reset based on the selected method
  if (resetMethod === "email") {
    // Password reset via email logic (for demo purposes)
    try {
      const response = await fetch(`${hostName}/resetPassword`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "email",
          data: userInput,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Assuming the response body is in JSON format
      const responseBody = await response.json();
      console.log(responseBody);

      // Use SweetAlert2 to show a notification
      Swal.fire({
        icon: "success", // or 'error', 'warning', 'info'
        title: "Success",
        text: responseBody.message, // Assuming there is a 'message' property in the response body
      }).then((result) => {
        // The result object contains information about the user's interaction
        if (result.isConfirmed) {
          // Perform your custom action here
          console.log('Custom action triggered!');
          window.location.href = '/login'; //redirect to login
        }
      });
      // Handle the result as needed
    } catch (error) {
      console.error("Error:", error);
      // Handle errors

      Swal.fire({
        icon: "error", // or 'error', 'warning', 'info'
        title: "Error",
        text: "Your reset request in not handled. Please try again", // Assuming there is a 'message' property in the response body
      });
    }
  } else if (resetMethod === "sms") {
    // Password reset via SMS logic (for demo purposes)
    console.log("Resetting password via SMS");
  }
});
