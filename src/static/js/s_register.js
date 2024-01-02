document
  .getElementById("formSubmit")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    // get detail spot
    let hostName = "";
    if (window.location.hostname.includes("localhost")) {
      hostName = "http://localhost:8080";
    } else {
      hostName = ""; // the link that it will be hosted
    }
    // Get the form element
    const formElement = document.getElementById("formSubmit");

    // Create an object to store form data
    const formData = {};

    // Iterate over form elements and add their values to the formData object
    for (const inputElement of formElement.elements) {
      if (
        inputElement.tagName.toLowerCase() === "input" ||
        inputElement.tagName.toLowerCase() === "select"
      ) {
        formData[inputElement.name] = inputElement.value;
      }
    }

    const requestBody = JSON.stringify(formData);

    // validate data
    if (formData["password"] != formData["confirmPassword"]) {
      Swal.fire({
        icon: "error", // or 'error', 'warning', 'info'
        title: "Error",
        text: "confirm password is not the same as password", // Assuming there is a 'message' property in the response body
      });
      return;
    }

    // calling api
    try {
      const response = await fetch(`${hostName}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: requestBody,
      });

      if (!response.ok) {
        let errorMessage = "An error occurred. Please try again.";

        try {
          // Attempt to parse the response body as JSON
          const errorBody = await response.json();
          if (errorBody.message) {
            errorMessage = errorBody.message.toUpperCase();
          }
        } catch (parseError) {
          console.error("Error parsing JSON:", parseError);
        }

        throw new Error(errorMessage);
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
          console.log("Custom action triggered!");
          window.location.href = "/login"; //redirect to login
        }
      });
      // Handle the result as needed
    } catch (error) {
      console.error("Error:", error);
      // Handle errors

      Swal.fire({
        icon: "error", // or 'error', 'warning', 'info'
        title: "Error",
        text: error.message, // Assuming there is a 'message' property in the response body
      });
    }
  });
