import { showAlert } from "./alert.js";

// Function to send OTP (email as payload)
async function sendOTP(email) {
    try {
      const res = await axios.post("http://localhost:4001/api/v1/users/register", { email });
  
      if (res.data.status === "success") {
        showAlert("success", "OTP sent to your email.");
        setTimeout(() => {
          location.assign("verifyotp");
        }, 1000);
      }
    } catch (err) {
      showAlert("error", "Error sending OTP.");
    }
  }
  
  // Function to verify OTP (email and OTP as payload)
  async function verifyOTP(email, otp,button) {
    try {
      const res = await axios.post("http://localhost:4001/api/v1/users/register", { email, otp });
  
      if (res.data.status === "success") {
        showAlert("success", "OTP verified,it will be ur default password!");
        setTimeout(() => {
          location.assign("/");
        }, 1500);
      }
    } catch (err) {
      showAlert("error", "Invalid OTP.");
    }
  }
  

document.addEventListener("DOMContentLoaded", () => {
    const emailInput = document.getElementById("email"); // email input field
    const otpForm = document.getElementById("otp"); // otp form (on second page)
    const submitBtn = document.getElementById("submit"); // your <a> confirm button on email page
    const verifyBtn = document.getElementById("verify-otp"); // your <a> confirm button on otp page
  
    // === Email Page ===
    if (submitBtn && emailInput) {
      submitBtn.addEventListener("click", (e) => {
        e.preventDefault(); // Prevent anchor default action (page navigation)
        const email = emailInput.value.trim();
  
        if (!email) {
          showAlert("error", "Please enter a valid email.");
          return;
        }
  
        // Save email in sessionStorage
        sessionStorage.setItem("otpEmail", email);
  
        // Send OTP with email as payload
        sendOTP(email);
      });
    }
  
    // === OTP Page ===
    if (otpForm && verifyBtn) {
      const storedEmail = sessionStorage.getItem("otpEmail");
  
      if (!storedEmail) {
        location.assign("/"); // redirect back if email not found
        return;
      }
  
      const emailDisplay = document.getElementById("email-display");
      if (emailDisplay) {
        emailDisplay.textContent = storedEmail;
      }
  
      verifyBtn.addEventListener("click", (e) => {
        e.preventDefault();
        const otp = document.getElementById("otp").value;
  
        if (!otp) {
          showAlert("error", "Please enter the OTP.");
          return;
        }
  
        // Verify OTP with both email and OTP as payload
        verifyOTP(storedEmail, otp, verifyBtn);
      });
    }
  });
  
  