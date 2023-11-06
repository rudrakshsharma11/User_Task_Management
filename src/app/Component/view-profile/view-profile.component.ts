import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
4;
import axios from 'axios';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

const Del_Icon = `<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg>`;

const Edit_Icon = `<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"/></svg>`;

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css'],
})
export class ViewProfileComponent implements OnInit {
  userData: any;
  cards: any[] = [];

  showEditModal: boolean = false; // Controls the display of the edit modal
  editName: string = ''; // Fields for editing name and email
  editEmail: string = '';
  UserDataById: any;
  field1Value: any;
  field2Value: any;
  editID: any;

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIconLiteral(
      'Del-up',
      sanitizer.bypassSecurityTrustHtml(Del_Icon)
    );
    iconRegistry.addSvgIconLiteral(
      'Edit-up',
      sanitizer.bypassSecurityTrustHtml(Edit_Icon)
    );
  }

  ngOnInit(): void {
    this.getUserList();
  }

  getUserList() {
    axios
      .get(`${environment.apiURL}/users/show/all`)
      .then((response) => {
        // Handle the successful response here
        console.log('Data:', response.data);
        this.userData = response.data;
        console.log('this.apiData', this.userData);
      })
      .catch((error) => {
        // Handle any errors here
        console.error('Error:', error);
      });
  }

  openEditModal(card: any) {
    // Set the editName and editEmail with the card data
    this.editName = card.name;
    this.editEmail = card.userEmail;
    this.showEditModal = true;
    console.log('hello');
  }

  saveChanges() {
    // Implement logic to save changes (e.g., send a request to update the user's data)
    // Then, close the modal
    this.showEditModal = false;

    axios
    .post(`${environment.apiURL}/users/update/${this.editID}`,{
      name: this.editName,
      userEmail:this.editEmail,
      
    })
    .then((response) => {
      console.log("response",response)
      // Assuming your backend returns a JWT token upon successful login
      this.getUserList();
      console.log("User DATA Sussesfull")
     
    })
    .catch((error) => {
      console.error('Login failed:', error);
      // Handle login errors, show error messages, etc.
    });
  

  }

  closeEditModal() {
    this.showEditModal = false;
  }

  GetDataById(id: number) {
    console.log();
    this.showEditModal = true;
    console.log('hello');

    axios
      .get(`${environment.apiURL}/users/show/${id}`)
      .then((response) => {
        // Handle the successful response here
        console.log('Dataffgdgv:', response.data);
        this.UserDataById = response.data;
        console.log('ApiDataByIdsddcsd', this.UserDataById);

        this.editName = this.UserDataById.name;
        this.editEmail = this.UserDataById.userEmail;
        this.editID=this.UserDataById.userId;

        console.log('this.field1Value', this.field1Value);
      })
      .catch((error) => {
        // Handle any errors here
        console.error('Error:', error);
      });
  }

  deleteItem(index: number) {
    Swal.fire({
      html: `
      <div>
        <h2>Delete Course</h2>
        <hr style="margin: 10px 0;>
        <p">Are you sure that you want to delete this Course?</p>
      </div>
    `,
      showCancelButton: true,
      confirmButtonColor: 'primary',
      cancelButtonColor: 'basic',
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        
        axios
          .post(`${environment.apiURL}/users/delete/${index}`)
          .then((response) => {
            console.log(response);
            Swal.fire('Deleted!', 'Your item has been deleted.', 'success');
            this. getUserList();
          })
          .catch((error) => {
            console.log('error', error);
          });
      }
    });
  }
}
