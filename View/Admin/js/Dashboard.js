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
  