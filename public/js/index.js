document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.querySelector(".login-form");

  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    // Get form values
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const name = document.getElementById("name").value;
    const department = document.getElementById("department").value;
    const severity = document.getElementById("severity").value;

    // Validate form (you can add your validation logic here)

    // Create object with form data
    const formData = {
      username: username,
      password: password,
      name: name,
      department: department,
      severity: severity
    };

    // You can perform further actions here, such as sending the data to a server, etc.
    alert(formData);

    // For this example, let's just reset the form
    loginForm.reset();
  });
});
