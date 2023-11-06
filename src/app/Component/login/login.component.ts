import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router'; // Import the Router service

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string = '';
  password: string = '';
  showPassword: boolean = false;
  userdata: any;

 

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }



 
 
logValues() {
  console.log('Username:', this.username);
  console.log('Password:', this.password);
}



submitUser() {
  axios
    .post(`${environment.apiURL}/users/authenticate`, {
      userEmail: this.username,
      password: this.password,
    })
    .then((response) => {
      console.log("response", response);

      if (response.data) {
        console.log("User DATA Successful");

        this.userdata = response.data;
        console.log('this.programdata', this.userdata);

        localStorage.setItem("User_data", JSON.stringify(this.userdata));

        // Navigate to the home page (replace 'home' with your actual route)
        this.router.navigate(['/home']);
      } else {
        console.log("No user data received");
        // Handle the case when no data is received in the response
      }
    })
    .catch((error) => {
      console.error('Login failed:', error);
      // Handle login errors, show error messages, etc.
    });
  }

}
