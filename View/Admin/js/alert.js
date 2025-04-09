// Inject alert CSS if not already present
const injectAlertStyles = () => {
    if (!document.getElementById('alert-styles')) {
      const style = document.createElement('style');
      style.id = 'alert-styles';
      style.textContent = `
        .alert {
          position: fixed;
          top: 20%;
          left: 50%;
          transform: translateX(-50%);
          z-index: 1055;
          padding: 1.2rem 2rem;
          border-radius: 10px;
          font-size: 1.1rem;
          font-weight: 500;
          text-align: center;
          box-shadow: 0 0 15px rgba(0,0,0,0.2);
          animation: fadeIn 0.3s ease-out;
        }
  
        .alert--success {
          background-color: #d1e7dd;
          color: #0f5132;
          border: 1px solid #badbcc;
        }
  
        .alert--error {
          background-color: #f8d7da;
          color: #842029;
          border: 1px solid #f5c2c7;
        }
  
        @keyframes fadeIn {
          from { opacity: 0; transform: translate(-50%, -30%); }
          to { opacity: 1; transform: translate(-50%, 0); }
        }
      `;
      document.head.appendChild(style);
    }
  };
  
  export const hideAlert = () => {
    const el = document.querySelector('.alert');
    if (el) el.parentElement.removeChild(el);
  };
  
  export const showAlert = (type, msg) => {
    injectAlertStyles(); // Inject styles if not already injected
    hideAlert();
    const markup = `<div class="alert alert--${type}">${msg}</div>`;
    document.querySelector('body').insertAdjacentHTML('afterbegin', markup);
    window.setTimeout(hideAlert, 5000);
  };
  