import { Component, OnInit, HostListener, Renderer2, ViewChild } from '@angular/core';
import { ProjectDetailsService } from '../projectdetails/projectdetails.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskDetailsService } from './taskdetails.service';
import { MatSnackBar } from '@angular/material/snack-bar';
declare var $: any;

@Component({
  selector: 'app-taskdetails',
  templateUrl: './taskdetails.component.html',
  styleUrls: ['./taskdetails.component.css'],
})
export class TaskdetailsComponent implements OnInit {
  @ViewChild('calendar')
  calendar: any;

  Userlength: any;
  searchValue: any;
  createdon: any;
  profileImage: any = '';
  username: any;
  metaData: any;
  public innerWidth: any;
  desktop: boolean = true;
  mobile: boolean = false;
  clicked: boolean = false;
  assignTaskUsers: any;
  taskId: any;
  isLoaded: boolean = false;
  subTasksDetails: any;
  projectId: any;
  subtaskName: any;
  length: any;
  selectedDate: any;
  dateSelected: any;
  taskName: any;
  errormsg: any;
  dueDate: any;
  mdlSampleIsOpen: boolean = false;
  substaskId: any;
  completedTasks: any = [];
  incompletedTasks: any = [];
  iconvisiblearray: boolean[] = [false];
  minimumDate: any;
  lengthCompletedTasks: any;
  errorMsg: boolean = false;
  createdUserName: any;
  onInitNotAlreadyFired = true;
  subtasksLen = 0;
  taskDesc: string = '';
  isEditDesc: boolean = false;
  clickcomp:boolean;
  clickhistory:boolean=false;
  t_assignedto:any;
  t_assigned_firstname:any;
  t_assigned_url:any;
  t_assigned_fullname:any;
  prior:any;
  imp:any;
  maintaskassign:boolean=false;
  constructor(
    private projectDetailsService: ProjectDetailsService,
    private _route: ActivatedRoute,
    private router: Router,
    private TaskDetailsservice: TaskDetailsService,
    private snackBar: MatSnackBar
  ) {
    this.minimumDate = new Date();
    _route.params.subscribe(
      (val) =>
        (this.projectId = this.recallTaskDetails(
          _route.snapshot.params['projectId'],
          _route.snapshot.params['taskId']
        ))
    );
  }

  getCustomcssInCompleted():string
  {
    if(this.completedTasks.length==0)
    {
      if(this.incompletedTasks.length>3)
        return 'incompletedScroll1';
      else 
       return '';
    }
    else
    {
      if(this.incompletedTasks.length<3)
      {
        return '';
      }
      else
      return 'incompletedScroll';
    }
  }
  getCustomcssCompleted():string
  {
   if(this.clickcomp==true)
   {
    if(this.incompletedTasks.length==0)
    {
      this.clickcomp=false;
      if(this.completedTasks.length>4)
        return 'completedScroll1';
      else 
       return '';
    }
    else
    {
      this.clickcomp=false;
      if(this.completedTasks.length==0)
      {
        return '';
      }
      else if(this.completedTasks.length<2)
      {
        return '';
      }
      else
      return 'completedScroll';
    }
  }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
  }

  ngOnInit(): void {
    this._route.paramMap.subscribe((paraMap) => {
      this.taskId = paraMap.get('taskId');
      this.projectId = paraMap.get('projectId');
    });
    this.onInitNotAlreadyFired = false;
    this.recallTaskDetails(this.projectId, this.taskId);
  }
  
  openCalendar(event: any) {
    this.calendar.showOverlay(this.calendar.inputfieldViewChild.nativeElement);
    event.stopPropagation();
  }

  recallTaskDetails(projectId, taskId) {
    this.taskId = taskId;
    this.projectId = projectId;
    this.username = localStorage.getItem('Name');
    document.querySelector('body').classList.add('selector');

    this.metaData = 'Task Details';
    this.innerWidth = window.innerWidth;

    if (this.innerWidth >= 1000) {
      this.desktop = true;
      this.mobile = false;
    }

    if (this.innerWidth < 1000) {
      this.mobile = true;
      this.desktop = false;
    }

    this.getAllUsers();
    this.getIncompleteSubTasks(taskId); //Incomplete Subtask
    this.getCompletedSubTask(taskId); //Completed Subtask
    this.getTaskDetails(projectId, taskId);
  }

  mouseEnter(i) {
    this.iconvisiblearray[i] = true;
    console.log('mouse enter');
  }

  mouseLeave(i) {
    this.iconvisiblearray[i] = false;
    console.log('mouse leave');
  }
//main task assign pop up modal
mtassign()
{
  this.maintaskassign=true;
  $('#assignTask').modal('show');

}
  //search function for Assign User task
  searchfunction() {
    console.log(this.searchValue);
    console.log('search reached');
    this.projectDetailsService.getSearchUser(this.searchValue).subscribe(
      (result) => {
        console.log('search function for Assign User task', result);

        this.assignTaskUsers = result.rows as String[];

        this.assignTaskUsers.forEach((element) => {
          if (element.firstName) {
            if (element.lastName != null && element.lastName != '') {
              // //console.log(element.user.lastName);
              element.firstName += element.lastName
                ? ' ' + element.lastName
                : '';
            }
          }
        });

        this.Userlength = this.assignTaskUsers.length;
        console.log(this.Userlength);
      },
      (error) => {
        console.log('search function for Assign User task error', error);
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

  //Add SubTasks
  AddSubTask(event: any) {
    let currDate = new Date();
    localStorage.setItem('formdata', 'true');
    let taskCreatedon = this.formatDate(currDate);

    if (event.keyCode == 13) {
      console.log(this.subtaskName);

      let data = {
        name: this.subtaskName,
        //dueDate: SelectedDate,
        description: '',
        importance: 'low',
        priority: 'later',
        status: 'incomplete',
        createdOn: taskCreatedon,
        parentTaskId: this.taskId,
      };
      if (this.subtaskName) {
        this.errorMsg = false;
        this.projectDetailsService.createTask(data, this.projectId).subscribe(
          (result) => {
            if (result.error) {
              this.snackBar.open(
                result.message,
                'Close',
                {
                  duration: 2000,
                  verticalPosition: 'top',
                  panelClass: ['bg-danger'],
                }
              );
            } else {
              localStorage.setItem('formdata', 'false');
              this.getIncompleteSubTasks(this.taskId);
              this.clicked = false;
              this.subtaskName = '';
            }
          },
          (error) => {
            console.log('Create Task API error', error);
          }
        );
      } else {
        console.log('Subtask Name is not  present');
        this.errorMsg = true;
      }
    }
  }

  //get All Users
  getAllUsers() {
    this.projectDetailsService.getAllUsers().subscribe(
      (result) => {
        this.assignTaskUsers = result.rows as String[];

        this.assignTaskUsers.forEach((element) => {
          if (element.firstName) {
            if (element.lastName != null && element.lastName != '') {
              // //console.log(element.user.lastName);
              element.firstName += element.lastName
                ? ' ' + element.lastName
                : '';
            }
          }
        });
      },
      (error) => {
        console.log('Get All Users for assign Task API error', error);
      }
    );
  }

  //task details with subtaskdetails for edit
  getTaskDetails(projectId, taskId) {
    this.projectDetailsService.getTaskIdProjectId(projectId, taskId).subscribe(
      (result) => {
        console.log("task details",result);
        this.taskDesc = result.description !== '' ? result.description : undefined;
        this.dueDate = result.dueDate;
        this.taskName = result.name;
        this.createdUserName =
          result.tenant_user.firstName + ' ' + result.tenant_user.lastName;
        this.createdon = result.createdOn;
        this.t_assignedto=result.assignedTo;
        this.prior=result.priority;
        this.imp=result.importance;
      //  console.log(this.t_assignedto);
        if(result.assignedTo)
        {
          this.t_assigned_firstname=result.assigned_user.firstName;
          this.t_assigned_fullname=result.assigned_user.firstName+' '+result.assigned_user.lastName;
          this.t_assigned_url=result.assigned_user.imageUrl;
        }
      },
      (error) => {
        console.log('task details with subtaskdetails API error', error);
      }
    );
  }

  //display All the subtasks as card  for incomplete substasks
  getIncompleteSubTasks(taskId) {
    this.projectDetailsService
      .getInCompletedTaskIdProjectId(this.projectId, taskId)
      .subscribe(
        (result) => {
          this.isLoaded = true;

          this.incompletedTasks = result.rows;
          this.length = this.incompletedTasks.length;
          console.log('InCompleted Tasks list', this.incompletedTasks);

          for (let i = 0; i < this.length; i++) {
            this.iconvisiblearray[i] = false;
            console.log(this.iconvisiblearray[i]);
          }

          // for (let i = 0; i < this.length; i++) {

          //   if (this.subTasksDetails[i].status == 'incomplete') {
          //     this.incompletedTasks.push(this.subTasksDetails[i]);
          //     console.log('InCompleted Tasks list', this.incompletedTasks);
          //   }
          // }
        },
        (error) => {
          console.log('InCompleted Tasks list API error', error);
        }
      );
  }

  //display All the subtasks as card  for complete substasks
  getCompletedSubTask(taskId) {
    this.projectDetailsService
      .getCompletedTaskIdProjectId(this.projectId, taskId)
      .subscribe(
        (result) => {
          this.isLoaded = true;

          this.completedTasks = result.rows;

          this.lengthCompletedTasks = this.completedTasks.length;
          console.log('Completed Tasks list', this.completedTasks);

          for (let i = 0; i < this.length; i++) {
            this.iconvisiblearray[i] = false;
            console.log(this.iconvisiblearray[i]);
          }
        },
        (error) => {
          console.log('Completed Tasks list API error', error);
        }
      );
  }

  //card click on subtask details
  gotoTaskDetails(i: any) {
    let taskId = this.incompletedTasks[i].id;
    this.router.navigate(['/project/' + this.projectId + '/task/' + taskId]);
    this.recallTaskDetails(this.projectId, taskId);
    // this.projectDetailsService
    //     .getTaskIdProjectId(this.projectId, taskId)
    //     .subscribe(
    //     (result) => {
    //         this.subtasksLen = result.subTasks.length;
    //     },
    //     (error) => {
    //         console.log('card click on subtask details API error', error);
    //     }
    //     );
  }

  // Mark as complete API
  MarkAsComplete(i: any) {
    if (this.incompletedTasks[i].assignedTo == null) {
      this.snackBar.open(
        'SubTask is unassigned! Please assign the SubTask to user',
        'Close',
        {
          duration: 2000,
          verticalPosition: 'top',
          panelClass: ['bg-danger'],
        }
      );
    } else {
      let taskId = this.incompletedTasks[i].id;
      let data = {
        status: 'complete',
      };
      this.projectDetailsService
        .updateTask(this.projectId, taskId, data)
        .subscribe(
          (result) => {
            this.getIncompleteSubTasks(this.taskId);
            this.getCompletedSubTask(this.taskId);
          },
          (error) => {
            console.log('Mark As Complete API error', error);
            if(this.incompletedTasks[i].subTasks.length>0)
            {
              if(this.incompletedTasks[i].subTasks.length==1)
              {
              this.snackBar.open(
                'This task cannot be completed at this point since we have an open subtask for this task.',
                'Close',
                {
                  duration: 2000,
                  verticalPosition: 'top',
                  panelClass: ['bg-danger'],
                }
              );
            }
            else
            {
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
          }
          }
        );
    }
  }


   //mark completed back to incomplete
   MarkAsIncomplete(i) {

    let taskId = this.completedTasks[i].id;
    let data = {
      status: 'incomplete',
    };
    this.projectDetailsService
      .updateTask(this.projectId, taskId, data)
      .subscribe(
        (result) => {
          this.getIncompleteSubTasks(this.taskId);
          this.getCompletedSubTask(this.taskId);
        },
        (error) => {
        console.log("Mark Sub task complete to incomplete error");
        });
   }
  GoPreviousPage() {
    this.router.navigate(['/project/' + this.projectId]);
  }

  //Edit Task By name
  EditTaskName(event: any) {
    if (event.keyCode == 13) {
      console.log(this.taskName);
      let data = {
        name: this.taskName,
      };
      this.TaskDetailsservice.updateTask(
        this.projectId,
        this.taskId,
        data
      ).subscribe(
        (result) => {
          console.log('Edit task API', result);
        },
        (error) => {
          console.log('Edit Task API error', error);
        }
      );
    }
  }
//Assign user on iMage click for main task
gotoAssignedUserMt(i:any)
{
  let data = {
    assignedTo: this.assignTaskUsers[i].id,
  };


  this.TaskDetailsservice.updateTask(
    this.projectId,
    this.taskId,
    data
  ).subscribe(
    (result) => {
      console.log('Get subTask assign Users API', result);
      console.log(result.assignedTo);
      $('#assignTask').modal('hide');
      this.getIncompleteSubTasks(this.taskId);
      this.getTaskDetails(this.projectId, this.taskId);
      this.createTeamUsers(result.assignedTo);
    },
    (error) => {
      console.log('Get subTask assign Users error', error);
    }
  );
}
  //Assign User On Image click
  gotAssignedUser(i: any) {
    let data = {
      assignedTo: this.assignTaskUsers[i].id,
    };
    console.log('Assigned Id', data);
    console.log('SubtaskId', this.substaskId);
    this.TaskDetailsservice.updateTask(
      this.projectId,
      this.substaskId,
      data
    ).subscribe(
      (result) => {
        console.log('Get subTask assign Users API', result);
        console.log(result.assignedTo);
        $('#assignTask').modal('hide');
        this.getIncompleteSubTasks(this.taskId);
        this.createTeamUsers(result.assignedTo);
      },
      (error) => {
        console.log('Get subTask assign Users error', error);
      }
    );
  }

  createTeamUsers(assignuser) {
    console.log('team fn reached');
    let data = { userId: assignuser };
    console.log(data);
    this.projectDetailsService.createTeamUsers(data, this.projectId).subscribe(
      (result) => {
        console.log('Create team Users', result);
      },
      (error) => {
        console.log('Create Team Users error', error);
      }
    );
  }

  //Set Due Date selection API
  OverDueSelectedDate(event: any) {
    console.log(this.selectedDate);
    this.dateSelected = new Date(this.selectedDate);
    let SelectedDate = this.formatDate(this.dateSelected);
    console.log('date Selected');
    console.log(SelectedDate);
    let data = {
      dueDate: SelectedDate,
    };
    this.TaskDetailsservice.updateTask(
      this.projectId,
      this.taskId,
      data
    ).subscribe(
      (result) => {
        console.log('Set Due Date in Edit task API', result);
        this.dueDate = result.dueDate;
      },
      (error) => {
        console.log('Set Due Date in Edit task API error', error);
      }
    );
  }

  //Modal popup for Task Modal
  gotoAssignTaskModal(i: any) {
    this.maintaskassign=false;
    this.substaskId = this.incompletedTasks[i].id;
    $('#assignTask').modal('show');
  }

  addProjectTaskDesc(event: any) {
    if (event.keyCode == 13) {
      const data = {
          // description: this.taskDesc.replace(/(\r\n|\n|\r)/gm, '')
          description: this.taskDesc
      };
      this.TaskDetailsservice.updateProjectTaskDesc(this.projectId, this.taskId, data).subscribe(
          (result) => {
              this.isEditDesc = false;
          },
          (error) => {
              console.log('Edit Project Task Description API error', error);
          }
      );
    }
  }
  
  //modal pop up for priority
  gotoPriorityModal()
  {
    $('#priorityModal').modal('show');
  }
  //modal pop up for importance
  gotoImpModal()
  {
    $('#impModal').modal('show');
  }
  //set importance of a task
  setImp(s:string)
  {
    console.log("set imp",s);
    const data={
      importance:s
    };
    this.TaskDetailsservice.updateTask(this.projectId, this.taskId, data).subscribe(
      (result) => {
        $('#impModal').modal('hide');
        console.log("importance set");
        this.getTaskDetails(this.projectId, this.taskId);
      },
      (error) => {
          console.log('Update Task Description API error', error);
      }
  );
  }
  //set priority for a task
  setPriority(s:string)
  {
    console.log("set priority",s);
    const data={
      priority:s
    };
    this.TaskDetailsservice.updateTask(this.projectId, this.taskId, data).subscribe(
      (result) => {
        $('#priorityModal').modal('hide');
        console.log("priority set");
        this.getTaskDetails(this.projectId, this.taskId);
      },
      (error) => {
          console.log('Update Task Description API error', error);
      }
  );
  }

  cancelDesc() {
    this.isEditDesc = false;
    this.getTaskDetails(this.projectId, this.taskId);
  }

}
