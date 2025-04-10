const allFeedbacksc = async () => {
    try {
      const res = await axios({
        method: 'GET',
        url: 'http://localhost:4001/api/v1/users/getallfeedback',
      });
  
      const feedbacks = res.data;
      console.log(feedbacks);
      displayFeedback(feedbacks);
      
    } catch (err) {
      console.error('Error fetching feedback:', err);
      alert('Failed to fetch feedback');
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
        <div class="col-8">${feedback.feedback}</div>
        <div class="col-2"><i class="bi bi-trash delete-btn" style="color: red;font-size:18px;" data-index="${index}"></i></div>
      `;
      container.appendChild(item);
    });
  
    // Optional: Setup modal deletion after rendering
    setupDeleteModal();
  };
  
  const setupDeleteModal = () => {
    const deleteButtons = document.querySelectorAll('.delete-btn');
    const confirmDeleteModal = new bootstrap.Modal(document.getElementById('confirmDeleteModal'));
    let feedbackToDelete = null;
  
    deleteButtons.forEach(button => {
      button.addEventListener('click', function () {
        feedbackToDelete = this.closest('.movement-item');
        confirmDeleteModal.show();
      });
    });
  
    document.getElementById('confirmDeleteBtn').addEventListener('click', function () {
      if (feedbackToDelete) {
        feedbackToDelete.remove();
        confirmDeleteModal.hide();
        feedbackToDelete = null;
      }
    });
  };
  