import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-task-info',
  templateUrl: './task-info.component.html',
  styleUrls: ['./task-info.component.css']
})
export class TaskInfoComponent implements OnInit {
  taskData: any;
  UserDataById: any;
  field1Value: any;
  field2Value: any;
  field3Value: any;
  field4Value: any;
  field5value: any;

  constructor() { }

  ngOnInit(): void {
    this.getTaskList();
  }


  getTaskList()
  {
    axios
    .get(`${environment.apiURL}/task/assignments`, )
    .then((response) => {
      // Handle the successful response here
      console.log('Data:', response.data);
      this.taskData = response.data;
      console.log('this.apiData', this.taskData);
    })
    .catch((error) => {
      // Handle any errors here
      console.error('Error:', error);
    });
  }

 
  updateTask(id: number) {
    // Use Axios or a similar method to send a PUT request to update the task data.
    // You can send the updated data from the input fields.
    // Handle the update and refresh the task list as needed.
  }

}
