import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import axios from 'axios';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import * as moment from 'moment';

const check_Icon = `<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/></svg>`;

const wrong_Icon = `<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License)
 Copyright 2023 Fonticons, Inc. --><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>`;

const Del_Icon = `<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg>`;

const Edit_Icon = `<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"/></svg>`;


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // title: string = '';
  // description: string = '';
  // priority: string = '';
  // deadline: Date | null = null;
  // status: string = '';
  // id:any;

  // constructor() {
  //   const userString = localStorage.getItem('User_data');
  //   if (userString) {
  //     const userData = JSON.parse(userString);
  //     this.id = userData.userId;
  //   }
  //  }

  // ngOnInit(): void {

  // }

  // onSubmit() {
  //   axios
  //   .post(`${environment.apiURL}/task/addTask/${this.id}`,{
  //     title: this.title,
  //     description:this.description,
  //     priority: this.priority,
  //     deadline:this.deadline,
  //     status:this.status
  //   })
  //   .then((response) => {
  //     console.log("response",response)
  //     // Assuming your backend returns a JWT token upon successful login

  //     console.log("Task DATA Sussesfull")
     
  //   })
  //   .catch((error) => {
  //     console.error('Login failed:', error);
  //     // Handle login errors, show error messages, etc.
  //   });
  // }



  ////=============================================================================================================////


  isFormVisible: boolean = false;
  isPopupVisible: boolean = false;
  isSecondPopupVisible: boolean = false;
  popupInput: string = '';
  secondPopupInput: string = '';

  fish:string='';

  // Input field values
  field1Value: string = '';
  field2Value: string = '';
  field3Value: string = '';
  field4Value: string = '';
  somya: string = '';
  rud: string = '';
  index: number = 0;
  isdata_deleted: boolean = false;

  // Array to store table data
  tableData: any[] = [];
  inputData: any = {
    input1: '',
    input2: '',
    input3: '',
    input4: '',
    firstpopupInput: '',
    secodepopupInput: '',
  };
  people: any[] = JSON.parse(
    localStorage.getItem('add_course_details') || '[]'
  );
  ApiData: any;
  ApiDataById: any;
  indexNumber: number = 0;
  data_length: string = localStorage.getItem('add_course_details')
    ? JSON.parse(localStorage.getItem('add_course_details') || '[]').length
    : 0;
  moment: any;
  id: any;
  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIconLiteral(
      'Check-up',
      sanitizer.bypassSecurityTrustHtml(check_Icon)
    );
    iconRegistry.addSvgIconLiteral(
      'Wrong-up',
      sanitizer.bypassSecurityTrustHtml(wrong_Icon)
    );
    iconRegistry.addSvgIconLiteral(
      'Del-up',
      sanitizer.bypassSecurityTrustHtml(Del_Icon)
    );
    iconRegistry.addSvgIconLiteral(
      'Edit-up',
      sanitizer.bypassSecurityTrustHtml(Edit_Icon)
    );

    const userString = localStorage.getItem('User_data');
      if (userString) {
        const userData = JSON.parse(userString);
        this.id = userData.userId;
      }
  }

  // Toggle form visibility
  toggleForm() {
    this.isFormVisible = !this.isFormVisible;
  }
  ngOnInit(): void {
    console.log('ydcbdsjchds');
    this.GetData();
  }

  GetData() {
    // const token = localStorage.getItem('jwtToken');
    axios
      .get(`${environment.apiURL}/task/show/all`, )
      .then((response) => {
        // Handle the successful response here
        console.log('Data:', response.data);
        this.ApiData = response.data;
        console.log('this.apiData', this.ApiData);
      })
      .catch((error) => {
        // Handle any errors here
        console.error('Error:', error);
      });
  }
  GetDataById(id: number) {
    console.log();
   
    axios
      .get(`${environment.apiURL}/task/show/${id}`,)
      .then((response) => {
        // Handle the successful response here
        console.log('Dataffgdgv:', response.data);
        this.ApiDataById = response.data;
        console.log('ApiDataByIdsddcsd', this.ApiDataById);
        this.isdata_deleted = true;
        this.field1Value = this.ApiDataById.title;
        this.field2Value = this.ApiDataById.status;
        this.field3Value = this.ApiDataById.priority;
        this.field4Value = this.ApiDataById.deadline;
        this.popupInput = this.ApiDataById.description;
        console.log('this.field1Value', this.field1Value);
      })
      .catch((error) => {
        // Handle any errors here
        console.error('Error:', error);
      });
  }

  // Open pop-up
  openPopup() {
    this.isPopupVisible = true;
  }

  // Open second pop-up
  openSecondPopup() {
    this.isSecondPopupVisible = true;
  }

  // Submit data from first pop-up
  submitPopup() {
    this.inputData.input1 = this.field1Value;
    this.inputData.input2 = this.field2Value;
    this.inputData.input3 = this.field3Value;
    this.inputData.input4 = this.field4Value;
   
    this.inputData.firstpopupInput = this.popupInput;
    this.somya = this.popupInput;
    this.rud = this.secondPopupInput;

    this.closePopup();
    // this.resetFields();
    console.log('result', this.inputData);
  }

  // Submit data from second pop-up
  submitSecondPopup() {
    this.inputData.secodepopupInput = this.secondPopupInput;
    this.rud = this.secondPopupInput;
    this.closeSecondPopup();

    console.log('result', this.inputData);
  }

  // Close pop-up
  closePopup() {
    this.isPopupVisible = false;
    this.popupInput = ''; // Reset the input field
  }

  // Close second pop-up
  closeSecondPopup() {
    this.isSecondPopupVisible = false;
    this.secondPopupInput = ''; // Reset the input field
  }

  // Reset input fields
  resetFields() {
    this.field1Value = '';
    this.field2Value = '';
    this.field3Value = '';
    this.field4Value = '';
    this.popupInput = '';
    this.secondPopupInput = '';
    this.somya = '';
    this.rud = '';
  }

  // Submit table data (combined from both pop-ups)
  submitTableData() {
    if (this.isdata_deleted) {
      const postData = {
        title: this.field1Value,
        status: this.field2Value,
        priority: this.field3Value,
        deadline: this.field4Value,
        description: this.somya,
      };
      
      axios
        .post(
          `${environment.apiURL}/task/update/${this.indexNumber}`,
          postData)
        
        .then((response) => {
          console.log('POST request successful');
          console.log('Response data:', response.data);
          this.GetData();
          this.resetFields();
        })
        .catch((error) => {
          console.error('Error making POST request:', error);
        });
    } else {
      const postData = {
        title: this.field1Value,
        status: this.field2Value,
        priority: this.field3Value,
        deadline: this.field4Value,
        description: this.somya,
      };
      
      axios
        .post(`${environment.apiURL}/task/addTask/${this.id}`, postData )
        .then((response) => {
          console.log('POST request successful');
          console.log('Response data:', response.data);
          this.GetData();
          this.resetFields();
        })
        .catch((error) => {
          console.error('Error making POST request:', error);
        });
    }

    // Do whatever you need with the table data
  }
  showList() {
    this.people = JSON.parse(
      localStorage.getItem('add_course_details') || '[]'
    );
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
        const token = localStorage.getItem('jwtToken');
        axios
          .post(`${environment.apiURL}/task/delete/${index}`,{
            headers: {
              Authorization: `Bearer ${token}`,
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Headers': '*',
            },
          })
          .then((response) => {
            console.log(response);
            Swal.fire('Deleted!', 'Your item has been deleted.', 'success');
            this.GetData();
          })
          .catch((error) => {
            console.log('error', error);
          });
      }
    });
  }

  editItem(index: number) {
    // this.isdata_deleted = true;
    // this.index = index;
    // this.people = JSON.parse(localStorage.getItem("add_course_details")||'[]');
    // const selectedPerson = this.people[index];
    // this.field1Value = selectedPerson.input1;
    // this.field2Value = selectedPerson.input2;
    // this.field3Value = selectedPerson.input3;
    // this.field4Value = selectedPerson.input4;
    // this.popupInput = selectedPerson.firstpopupInput;
    // this.secondPopupInput = selectedPerson.secodepopupInput;
    // console.log("this.field1Value", this.field1Value)
    // this.showList()
    this.GetDataById(index);
    this.indexNumber = index;
    console.log('this.ApiDataById', this.ApiDataById);
  }

}
