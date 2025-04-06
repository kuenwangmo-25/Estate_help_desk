import { showAlert } from "./alert";
import axios from "axios";

const sendOTP = async (email) => {
    try {
        const res = await axios.post("http://localhost:4001/api/v1/users//register", { email });

        if (res.data.status === "success") {
            showAlert("success", "OTP sent to your email.");
            window.setTimeout(() => {
                location.assign("/otpform");
            }, 1500);
        }
    } catch (err) {
        showAlert("error", "Error sending OTP.");
    }
};

const verifyOTP = async (email, otp) => {
    try {
        const res = await axios.post("http://localhost:4001/api/v1/users//register", { email, otp });

        if (res.data.status === "success") {
            showAlert("success", "Login successful!");
            window.setTimeout(() => {
                location.assign("/loginform");
            }, 1500);
        }
    } catch (err) {
        showAlert("error", "Invalid OTP.");
    }
};

// 
document.getElementById(".form").addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;

    sendOTP(email); // Send OTP to email
});

// Event Listener for Verify OTP Button
document.getElementById(".form").addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const otp = document.getElementById("otp").value;

    verifyOTP(email, otp); // Verify OTP and login
});