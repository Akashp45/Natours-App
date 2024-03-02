import '@babel/polyfill';
import {login, logout} from './login';
import { updateSettings } from './updateSettings';
import {bookTour } from './stripe';
import {displayMap} from './mapBox';


// Elements
const loginForm = document.querySelector('.form--login');
const mapBox= document.getElementById('map');
const logOut= document.querySelector('.nav__el--logout');
const updateDataForm= document.querySelector('.form-user-data');
const updatePasswordForm= document.querySelector('.form-user-password');
const bookBtn = document.getElementById('book-tour');


//delegations
if (loginForm)
  {

    loginForm.addEventListener('submit', e =>{
  
      e.preventDefault();
      const email= document.getElementById('email').value;
      const password= document.getElementById('password').value;
      login(email, password);
    });
  }

  if(mapBox){
    const locations= JSON.parse(map.dataset.locations);
    displayMap(locations);
  }

  if(logOut){
    logOut.addEventListener('click', logout);
  }

  if(updateDataForm){
    
    updateDataForm.addEventListener('submit', e=>{
      //console.log('submit button clicked');
      e.preventDefault();

      const form= new FormData();

      form.append('name', document.getElementById('name').value )
      form.append('email', document.getElementById('email').value )
      form.append('photo', document.getElementById('photo').files[0] )

      
      updateSettings(form , 'data');
    });
  }

  if(updatePasswordForm){
    
    updatePasswordForm.addEventListener('submit', async e=>{
      //console.log('submit button clicked');
      //console.log(document.querySelector('.forpassword'));
      document.querySelector('.forpassword').textContent="Updating...";

      e.preventDefault();
      const currentPassword= document.getElementById('password-current').value;
      const password= document.getElementById('password').value;
      const passwordConfirm= document.getElementById('password-confirm').value;
      
      await updateSettings({currentPassword, password, passwordConfirm}, 'password');

      document.querySelector('.forpassword').textContent="Save Password";

      document.getElementById('password-current').value='';
      document.getElementById('password').value='';
      document.getElementById('password-confirm').value='';

    });
  }
  
  if (bookBtn)
  bookBtn.addEventListener('click', e => {
    e.target.textContent = 'Processing...';
    const { tourId } = e.target.dataset;
    bookTour(tourId);
  });
      

