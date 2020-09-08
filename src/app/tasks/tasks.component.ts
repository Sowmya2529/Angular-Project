import { Component, OnInit, HostListener } from '@angular/core';
import { NgStyle } from '@angular/common';
import { TaskDetailsService } from '../tasks/tasks.service';
import { error } from 'protractor';
import { Router } from '@angular/router';
import { ProjectDetailsService } from '../projectdetails/projectdetails.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent implements OnInit {
  metaData: any;
  public innerWidth: any;
  desktop: boolean = true;
  mobile: boolean = false;
  clicked: boolean = false;
  iconvisiblearray: boolean[] = [false];
  taskByProject: any;
  length: any;
  isLoaded: boolean = false;
  tasks: any;
  IncompleteMyTasks: any;
  IncompleteMyTaskslength: any;
  CompletedTasks: any;
  CompletedMyTaskslength: any;
  myTaskName: any;
  errMsg: any;
  profileImage: any = '';

  constructor(
    private taskService: TaskDetailsService,
    private router: Router,
    private projectDetailsService: ProjectDetailsService,
    private snackBar: MatSnackBar
  ) {}

  mouseEnter(i) {
    this.iconvisiblearray[i] = true;
    console.log('mouse enter');
  }

  mouseLeave(i) {
    this.iconvisiblearray[i] = false;
    console.log('mouse leave');
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
  }
  ngOnInit(): void {
    document.querySelector('body').classList.add('selector');
    this.metaData = 'My Tasks';
    this.innerWidth = window.innerWidth;
    console.log(this.innerWidth);
    if (this.innerWidth >= 1000) {
      this.desktop = true;
      this.mobile = false;
    }
    if (this.innerWidth < 1000) {
      this.mobile = true;
      this.desktop = false;
    }

    this.getMyTasks(); //getAllMytasks
    this.getAllIncompleteMyTasks(); //Incomplete My task
    this.getAllCompleteMyTasks(); //Completed My task
  }

  //Get All My Tasks
  getMyTasks() {
    this.taskService.getTasks().subscribe(
      (result) => {
        // console.log('apiresult', result);
        this.tasks = result.rows;
        this.length = this.tasks.length;
        console.log(this.tasks);
      },
      (error) => {
        console.log('GetTaskByProject API error', error);
      }
    );
  }

  //Get ALl Incompleted My tasks
  getAllIncompleteMyTasks() {
    this.taskService.getIncompleteMyTasks().subscribe(
      (result) => {
        this.IncompleteMyTasks = result.rows;
        this.IncompleteMyTaskslength = this.IncompleteMyTasks.length;
        this.isLoaded = true;
        console.log('Get Incompelete MyTasks', result);
        for (let i = 0; i < this.length; i++) {
          this.iconvisiblearray[i] = false;
          console.log(this.iconvisiblearray[i]);
        }
      },
      (error) => {
        console.log('Get Incompelete MyTasks error', error);
      }
    );
  }

  //Get ALL completed My tasks
  getAllCompleteMyTasks() {
    this.taskService.getCompleteMyTasks().subscribe(
      (result) => {
        this.CompletedTasks = result.rows;
        this.CompletedMyTaskslength = this.CompletedTasks.length;
        console.log('Completed MyTasks', result);
      },
      (error) => {
        console.log('Get Completed MyTasks error', error);
      }
    );
  }
  formatDate(date) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }

  AddMyTask(event: any) {
    let currDate = new Date();
    let taskCreatedon = this.formatDate(currDate);
    if (event.keyCode == 13) {
      let data = {
        name: this.myTaskName,
        // dueDate:taskCreatedon,
        // description: 'description',
        // importance: 'low',
        // priority: 'later',
        // status: 'incomplete',
        createdOn: taskCreatedon,
      };
      if (this.myTaskName) {
        console.log('My task Name is  present');
        console.log(this.myTaskName);
        this.errMsg = false;
        // this.projectDetailsService.createTask(data, this.projectId).subscribe(
        //   (result) => {
        //     console.log('Create My Task API', result);
        //     localStorage.setItem('formdata', 'false');
        //     this.getAllIncompleteMyTasks();
        //     this.clicked = false;
        //     this.myTaskName = '';

        //   },
        //   (error) => {
        //     console.log('Create My Task API error', error);
        //   }
        // );
      } else {
        console.log('My task Name is not present');
        this.errMsg = true;
      }
    }
  }

  //Mark as Complete My tasks API
  MarkAsComplete(i) {
    console.log('check icon clicked');

    let taskId = this.IncompleteMyTasks[i].id;
    let projectId = this.IncompleteMyTasks[i].projectId;
    console.log(taskId);
    console.log(projectId);
    console.log(taskId);
    let data = {
      status: 'complete',
    };
    this.projectDetailsService.updateTask(projectId, taskId, data).subscribe(
      (result) => {
        console.log('Mark As  Complete My task API', result);
        this.getAllCompleteMyTasks(); //Completed Task
        this.getAllIncompleteMyTasks(); //Incompleted Task
      },
      (error) => {
        console.log('Mark As Complete API My task error', error);
        this.snackBar.open(
          'This task cannot be completed at this point since we have open subtasks for this task.',
          'Close',
          {
            duration: 2000,
            verticalPosition: 'top',
            panelClass: ['bg-danger'],
          }
        );
      }
    );
  }

  MarkAsIncomplete(i) {
    console.log('check icon clicked');

    let taskId = this.CompletedTasks[i].id;
    let projectId = this.CompletedTasks[i].projectId;
    console.log(taskId);
    console.log(projectId);
    console.log(taskId);
    let data = {
      status: 'incomplete',
    };
    this.projectDetailsService.updateTask(projectId, taskId, data).subscribe(
      (result) => {
        console.log('Mark As  Complete To Incomplete My task API', result);
        this.getAllCompleteMyTasks(); //Completed Task
        this.getAllIncompleteMyTasks(); //Incompleted Task
      },
      (error) => {
        console.log('Mark As Complete API My task error', error);
        
      }
    );
  }
  //card click for particular taskID and projectID
  gotoTaskDetails(i) {
    let taskId = this.IncompleteMyTasks[i].id;
    let projectId = this.IncompleteMyTasks[i].projectId;
    this.router.navigate(['/project/' + projectId + '/task/' + taskId]);
  }
}
