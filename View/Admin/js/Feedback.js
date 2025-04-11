import { showAlert } from "./alert.js";


const allFeedbacks = async () => {
    try {
      const res = await axios({
        method: 'GET',
        url: 'http://localhost:4001/api/v1/users/getallfeedback',
      });
  
      const feedbacks = res.data.data;
      console.log(feedbacks);
      displayFeedback(feedbacks.reverse());
      
    } catch (err) {
      console.error('Error fetching feedback:', err);
      alert('Failed to fetch feedback');
    }
  };

  const deleteFeedback = async (id) => {
    try {
      await axios.delete(`http://localhost:4001/api/v1/users/feedback/${id}`);
      showAlert('success','Feedback Deleted successfully')
      allFeedbacks(); // Refresh the list after deletion
    } catch (err) {
      console.error('Error deleting feedback:', err);
      showAlert('failed','Failed to delete feedback');
    }
  };

  
  

  const displayFeedback = (feedbacks) => {
    const container = document.getElementById('student-movement-log');
    container.innerHTML = '';
    let lastDate = '';
  
    feedbacks.forEach((feedback, index) => {
      const dateTime = feedback.date ? feedback.date : new Date().toISOString();
      const [date, time] = dateTime.split('T');
  
      if (date !== lastDate) {
        const dateSeparator = document.createElement('div');
        dateSeparator.className = 'date-separator';
        dateSeparator.innerHTML = `<span class="date-container">${date}</span>`;
        container.appendChild(dateSeparator);
        lastDate = date;
      }
  
      const item = document.createElement('div');
      item.className = 'movement-item row align-items-center my-2';
      item.innerHTML = `
        <div class="col-2 text-center"><i class="fas fa-user" style="color: rgb(227, 88, 33); font-size:18px;"></i></div>
        <div class="col-8">${feedback.Feedback}</div>
        <div class="col-2"><i class="bi bi-trash delete-btn" style="color: red;font-size:18px;" data-id="${feedback._id}"></i></div>
      `;
      container.appendChild(item);
    });
  
    // Optional: Setup modal deletion after rendering
    setupDeleteModal();
  };
  
  
const setupDeleteModal = () => {
  const deleteButtons = document.querySelectorAll('.delete-btn');
  const confirmDeleteModal = new bootstrap.Modal(document.getElementById('confirmDeleteModal'));
  let feedbackIdToDelete = null;

  deleteButtons.forEach(button => {
    button.addEventListener('click', function () {
      feedbackIdToDelete = this.getAttribute('data-id'); // Get the feedback ID
      confirmDeleteModal.show();
    });
  });

  document.getElementById('confirmDeleteBtn').addEventListener('click', async function () {
    if (feedbackIdToDelete) {
      await deleteFeedback(feedbackIdToDelete); // Call the delete function to delete from backend
      confirmDeleteModal.hide(); // Hide the modal
    }
  });
};



document.addEventListener('DOMContentLoaded', allFeedbacks);
