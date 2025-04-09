import { showAlert } from "./alert.js";

// Fetch user count when the page loads
document.addEventListener('DOMContentLoaded', async () => {
    try {
      const response = await axios.get('http://localhost:4001/api/v1/users/getusercount', {
        // headers: {
        //   Authorization: `Bearer ${token}`  // Send the JWT token for authentication
        // }
      });
  
      const userCount = response.data.totalUsers;  
      // Update the user count in the HTML
      const userCountElement = document.getElementById('user-count');
      userCountElement.textContent = userCount;
  
    } catch (error) {
      console.error('Error fetching user count:', error);
      // alert('Failed to load user count');
    }
  });
  

const logout = async () => {
  try {
    const res = await axios ({
      method: 'Get',
      url: 'http://localhost:4001/api/v1/users/logout',


    })
    if (res.data.status === 'success'){
      showAlert('success',res.data.message)
      window.setTimeout(() =>{
        location.assign("/")
      },1000)
    }

  }catch(err){
    const message = err.response?.data?.message || "Error logging out!";
    showAlert('error', message);
  }

}

document.addEventListener('DOMContentLoaded', () => {
  const logoutBtn = document.getElementById('logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', (e) => {
      e.preventDefault();
      logout();
    });
  }
});