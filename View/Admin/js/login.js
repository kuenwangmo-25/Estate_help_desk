// const {default: axios} =require ("axios") 
import { showAlert } from "./alert.js";

const login= async (email, password ) => {
  try {
    const res= await axios ({
      method: 'POST',
      url: 'http://localhost:4001/api/v1/users/admin-login',
      data:{
        email,
        password
      }
    })
    if(res.data.status === 'success') {
      showAlert('success','Logged in successfully')
      window.setTimeout(() =>{
        location.assign('/home')
      },1500)
    }


  }catch(err){
    let message =
    typeof err.response !== 'undefined'
    ? err.response.data.message
    : err.message;
    showAlert('error', 'Error: Incorrect email or password',message)

  }
}


document.querySelector('.form').addEventListener('click', (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value
  const password = document.getElementById('password').value
  login(email, password)
})