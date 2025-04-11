import { showAlert } from "./alert.js";


document.addEventListener('DOMContentLoaded', function () {
  const addEquipmentBtn = document.getElementById('addEquipmentBtn');
  const equipmentForm = document.getElementById('equipmentForm');
  const addEquipmentModal = new bootstrap.Modal(document.getElementById('addEquipmentModal'));
  const successModal = new bootstrap.Modal(document.getElementById('successModal'));
  const okBtn = document.getElementById('okbtn');

  addEquipmentBtn.addEventListener('click', async function () {
    const equipmentName = document.getElementById('equipmentName').value.trim();

    if (equipmentName === '') {
      showAlert('Please enter equipment name');
      return;
    }

    try {
      const res = await axios({
        method: 'POST',
        url: 'http://localhost:4001/api/v1/users/equipment', // Replace with your correct endpoint
        data: { name: equipmentName }
      });

      // Only show success modal if response is successful
      if (res.data.status === 'successful' && res.data.data && res.data.data.name === equipmentName) {
        // Close the add equipment modal
        addEquipmentModal.hide();

        // Reset form
        equipmentForm.reset();

        // Show success message
        successModal.show();

        setTimeout(function () {
          successModal.hide();
        }, 1000);

      } else {
        // Show error alert if there’s a failure
        showAlert(res.data.message || 'Failed to add equipment');
      }

    } catch (err) {
      // Handle error (such as duplicate key error)
      if (err.response && err.response.data.message.includes('E11000')) {
        showAlert(`Equipment "${equipmentName}" already exists.`);
      } else {
        showAlert('Error adding equipment. Please try again.');
      }
    }
  });
});
