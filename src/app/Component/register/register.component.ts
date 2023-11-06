import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  username: string = '';
  email:string='';
  password: string = '';

  constructor() { }

  ngOnInit(): void {
  }

  logValues() {
    console.log('Username:', this.username);
    console.log('Email:', this.email);
    console.log('Password:', this.password);
  }


  submitUser()
  {
    axios
    .post(`${environment.apiURL}/users/addUser`,{
      name: this.username,
      userEmail:this.email,
      password: this.password,
    })
    .then((response) => {
      console.log("response",response)
      // Assuming your backend returns a JWT token upon successful login

      console.log("User DATA Sussesfull")
     
    })
    .catch((error) => {
      console.error('Login failed:', error);
      // Handle login errors, show error messages, etc.
    });

}
  }


