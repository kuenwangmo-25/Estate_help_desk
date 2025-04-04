import { showAlert } from "./alert";
import axios from "axios";

const adminlogin = async (email, password) => {
  try {
    const res = await axios.post("http://localhost:4001/api/v1/admin-login", { 
      email, 
      password 
    }, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    console.log("Login Response:", res.data); // Debugging

    if (res.status === 200) {
      showAlert("success", "Logged in successfully");

      // Store token properly
      localStorage.setItem("token", res.data.token);

      // Redirect after successful login
      setTimeout(() => {
        window.location.href = "/home";  // Use window.location.href
      }, 1500);
    }
  } catch (err) {
    console.error("Login Error:", err.response?.data || err.message); // Debugging

    let message = err.response?.data?.message || "Login failed!";
    showAlert("error", message);
  }
};

// Ensure correct event listener after DOM loads
document.addEventListener("DOMContentLoaded", () => {
  const submitButton = document.getElementById("submit");

  if (submitButton) {
    submitButton.addEventListener("click", (e) => {
      e.preventDefault();
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      if (email && password) {
        adminlogin(email, password);
      } else {
        showAlert("error", "Please enter email and password");
      }
    });
  } else {
    console.error("Submit button not found!");
  }
});
