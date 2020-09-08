import { Component, OnInit, HostListener } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProjectDetailsService } from './projectdetails.service';
import { ProjectsService } from '../projects/projects.service';
import { sample, findIndex } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
declare var $: any;
@Component({
  selector: 'app-projectdetails',
  templateUrl: './projectdetails.component.html',
  styleUrls: ['./projectdetails.component.css'],
})
export class ProjectdetailsComponent implements OnInit {
  //userassigncheck: any = [];
  assignedTo: any;
  profileImage: any = '';
  Userarray: any = [];
  userId: any;
  firstName: any;
  lastName: any;
  email: any;
  subtasks: any;
  createdOn: any;
  username: any;
  tasklength: any;
  Userlength: any;
  searchValue: any;
  metaData: any;
  public innerWidth: any;
  desktop: boolean = true;
  mobile: boolean = false;
  clicked: boolean = false;
  panelOpenState = false;
  projectId: any;
  taskByProject: any;
  taskName: any;
  isLoaded: boolean = false;
  assignTaskUsers: any;
  usersname: any;
  projectName: any;
  length: any;
  completedTasks: any = [];
  incompletedTasks: any = [];
  iconvisiblearray: boolean[] = [false];
  TaskId: any;
  samplecompletetest = [];
  insamplecompletetest = [];
  defaultimg;
  addimgicon;
  lengthIncompletedTasks: any =0;
  lengthCompletedTasks: any =0;
  lengthOfTotalTasks:any;
  errMsg:boolean = false
  IncompletedTaskslength:any;
  CompletedTaskslength:any;
  createdName:any;
  projectDesc: string = '';
  projectData: any;
  isEditDesc: boolean;
  clickcomp:boolean;
  incomp:any=[];
  comp:any=[];
  overdue:any=[];
  lengthofoverdue:any=0;
  overdueclicked:boolean=false;
  curdate:Date;
  td:string;
  duedateformatted:any;
  clickedcomp='all';
  overduecompleted:any=[];
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
  constructor(
    private router: Router,
    private _route: ActivatedRoute,
    private projectDetailsService: ProjectDetailsService,
    private projectsService: ProjectsService,
    private snackBar: MatSnackBar
  ) {
    this.defaultimg = 'assets/user-4.svg';
    this.addimgicon = 'assets/humansample/person.svg';
    this.curdate=new Date();
    console.log(this.addimgicon);
  }

  ngOnInit(): void {
    this.username = localStorage.getItem('Name');

    document.querySelector('body').classList.add('selector');
    this.metaData = 'Project Details';
    this.innerWidth = window.innerWidth;
	this.isEditDesc = false;

    if (this.innerWidth >= 1000) {
      this.desktop = true;
      this.mobile = false;
    }
    if (this.innerWidth < 1000) {
      this.mobile = true;
      this.desktop = false;
    }
    this._route.paramMap.subscribe((paraMap) => {
      this.projectId = paraMap.get('projectId');
      console.log(this.projectId);
    });

    this.projectsService.getProjectById(this.projectId).subscribe(
      result => {
        this.createdOn = result.createdOn;
        this.projectData = result;
        this.projectDesc = result.description;
        // this.router.navigate(['/project/' + result.id])
      },
      (error) => {
        console.log('GetProjectById error API', error);
      }
    );

    this.getInCompleteTaskByProjects(); //InCompleted Task API
    this.getCompleteTaskProjects(); //Completed Task API
    this.projectDetails();//To get the project name for edit project
    this.getAllUsers();//Get all Users for assign task
    this.displayteam();//Display team Members when task is assigned
    this.getCountOfTasks();//Count Of Tasks
   this.overdue=[];
  
  }

  getduedate(i)
  {
      this.duedateformatted=this.formatDate(i);
  }
  //add task button click
 setclicked()
 {
   this.clicked=true;
 //  document.getElementById("addbtn").focus();
 }

 //css for incomplete tasks scroll--not used now
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

  //css for complete tasks scroll--not used now
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
        return 'completedScroll2';
      }
      else
      return 'completedScroll';
      
    }
  }
  }
  

  //Count Of Complete and Incomplete Tasks
  getCountOfTasks() {
    this.projectDetailsService.getCountOfTasks(this.projectId).subscribe(
      (result) => {
        console.log('COunt Of Incomplete and complete Tasks', result);
        console.log(result.inComplete);
        this.lengthIncompletedTasks = result.inComplete;
        this.lengthCompletedTasks = result.complete;
        this.lengthOfTotalTasks =
          this.lengthCompletedTasks + this.lengthIncompletedTasks;
      },
      (error) => {
        console.log('Count Of Incomplete and Complete Tasks', error);
      }
    );
  }

  //For display at the top
  projectDetails() {
    console.log(this.projectId);
    this.projectsService.getProjectById(this.projectId).subscribe(
      (result) => {
        console.log('GetProjectById API', result);
        this.projectName = result.name;
        this.createdName =
          result.createdUser.firstName + ' ' + result.createdUser.lastName;
        console.log(this.projectName);
      },
      (error) => {
        console.log('GetProjectById error API', error);
      }
    );
  }

  //card click to view navigate to subtasks
  gotoTaskDetails(i: any) {
    let taskId = this.incompletedTasks[i].id;
    console.log('TaskId', taskId);
    this.projectDetailsService
      .getTaskIdProjectId(this.projectId, taskId)
      .subscribe(
        (result) => {
          console.log('Get Task and Subtask details API', result);
          this.subtasks = result.subTasks.length;
          console.log('subtasks count', result.subTasks.length);

          this.router.navigate([
            '/project/' + result.projectId + '/task/' + result.id,
          ]);
        },
        (error) => {
          console.log('Get Task and Subtask details API error', error);
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

  //create Task button call API
  AddTask(event: any) {
    let currDate = new Date();
    localStorage.setItem('formdata', 'true');
    let taskCreatedon = this.formatDate(currDate);
    if (event.keyCode == 13) {
      console.log(this.taskName);
      let data = {
        name: this.taskName,
        // dueDate:taskCreatedon,
        description: '',
        importance: 'low',
        priority: 'later',
        status: 'incomplete',
        createdOn: taskCreatedon
      };
      if (this.taskName) {
        console.log('TaskName is present');
        this.errMsg = false;
        console.log(data);
        this.projectDetailsService.createTask(data, this.projectId).subscribe(
          (result) => {
            console.log('Create Task API', result);
            localStorage.setItem('formdata', 'false');
            this.getInCompleteTaskByProjects();
            this.getCountOfTasks();
            this.clicked = false;
            this.taskName = '';
          },
          (error) => {
            console.log('Create Task API error', error);
          }
        );
      } else {
        console.log('Task name is not present');
        this.errMsg = true;
      }
    }
  }
isDue(i:any)
{
  let task=this.incompletedTasks[i];
  if(this.overdue.index(task)==1)
  {
    this.td=this.formatDate(this.incompletedTasks[i].dueDate);
    return true;
    
  }
  return false;
}
  //Show All the Incompleted tasks for the projects
  getInCompleteTaskByProjects() {

    this.projectDetailsService.getTaskByProject(this.projectId).subscribe(
      (result) => {
        // console.log('apiresult', result);
        // console.log('Total Completed and Incompleted Task API ', result);
        // this.taskByProject = result.rows;
        this.incompletedTasks = result.rows;
        this.IncompletedTaskslength = this.incompletedTasks.length;
        console.log('InCompleted Tasks ', this.incompletedTasks);
        // this.length = this.taskByProject.length;
        for (let i = 0; i < this.length; i++) {
          this.iconvisiblearray[i] = false;
          console.log(this.iconvisiblearray[i]);
        }

        // for (let i = 0; i < this.length; i++) {
        //   if (result.rows[i].status == 'incomplete') {
        //     this.incompletedTasks.push(result.rows[i]);
        //     this.lengthIncompletedTasks = this.incompletedTasks.length;
        //     console.log('InCompleted Tasks list', this.incompletedTasks);
        //   }
        // }

        this.isLoaded = true;
    
     //   this.incomp=this.incompletedTasks.reverse();
     let date=new Date();
    
  
    this.overdue=[];
      for(let i=0;i<this.incompletedTasks.length;i++)
      {
    
       if(this.incompletedTasks[i].dueDate)
         { 
          //let temp=this.incompletedTasks[i].dueDate
     
           let d2=this.formatDate(this.incompletedTasks[i].dueDate)
           let duedate=new Date(d2);
           
          if (date > duedate) 
            {  this.overdue.push(this.incompletedTasks[i])
        console.log(duedate);
             
            }
        }
        if(this.incompletedTasks[i].subTasks.length>0)
       {
         for(let j=0;j<this.incompletedTasks[i].subTasks.length;j++)
         {
         if( this.incompletedTasks[i].subTasks[j].dueDate)
         {
          let d2=this.formatDate( this.incompletedTasks[i].subTasks[j].dueDate);
          let duedate=new Date(d2);
          if (date > duedate) 
           { this.overdue.push(this.incompletedTasks[i].subTasks[j])
           console.log(d2);
         }}
        }
       }
      }
      console.log(this.overdue);
     this.lengthofoverdue=this.overdue.length;
    
      },
      (error) => {
        console.log(' Incompleted Task API error', error);
      }
    );
    }

  //Get Completed Task API
  getCompleteTaskProjects() {
    this.projectDetailsService.getcompleteTask(this.projectId).subscribe(
      (result) => {
        this.completedTasks = result.rows;
        this.CompletedTaskslength = this.completedTasks.length;
        console.log('Completed Tasks list', this.CompletedTaskslength);

        for (let i = 0; i < this.length; i++) {
          this.iconvisiblearray[i] = false;
          console.log(this.iconvisiblearray[i]);
        }

        this.isLoaded = true;
     //   this.comp=this.completedTasks.reverse();
       ;
      },
      (error) => {
        console.log('Completed Task  API error', error);
      }
    );
  }
  //Get all users for assign task
  getAllUsers() {
    this.projectDetailsService.getAllUsers().subscribe(
      (result) => {
        console.log('Get All Users for assign Task API', result);
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

  //edit project name API
  EditProject(event: any) {
    let currDate = new Date();
    let taskCreatedon = this.formatDate(currDate);
    if (event.keyCode == 13) {
      let data = {
        name: this.projectName,
      };
      this.projectDetailsService.updateProject(this.projectId, data).subscribe(
        (result) => {
          
        },
        (error) => {
          console.log('Edit Project API error', error);
        }
      );
    }
  }

  // Mark as complete API
  MarkAsComplete(i: any) {
    console.log('Check Icon clicked');

    let taskId = this.incompletedTasks[i].id;
    console.log(this.incompletedTasks[i].subTasks.length);
    console.log(taskId);
    if (this.incompletedTasks[i].assignedTo == null) {
      this.snackBar.open(
        'Task is unassigned! Please assign the task to user',
        'Close',
        {
          duration: 2000,
          verticalPosition: 'top',
          panelClass: ['bg-danger'],
        }
      );
    }

    
    // else if(this.incompletedTasks[i].subTasks.length > 0){
    //   this.snackBar.open('This task cannot be completed at this point since we have open subtasks for this task.', 'Close', {
    //     duration: 2000,
    //     verticalPosition: 'top',
    //     panelClass: ['bg-danger']
    //   });
    // }
    else {
      console.log(taskId);
      let data = {
        status: 'complete',
      };
      console.log(this.overdue);
      this.projectDetailsService
        .updateTask(this.projectId, taskId, data)
        .subscribe(
          (result) => {
            console.log('Mark As Complete API', result);
            this.getCompleteTaskProjects(); //Completed Task
            this.getInCompleteTaskByProjects(); //Incompleted Task
            this.getCountOfTasks(); //Count Of Tasks
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
   
  MarkAsIncomplete(i)
  {
    let taskId = this.completedTasks[i].id;
    let data = {
      status: 'incomplete',
    };
    this.projectDetailsService
    .updateTask(this.projectId, taskId, data)
    .subscribe(
      (result) => {
        console.log('Mark As Complete API', result);
        this.getCompleteTaskProjects(); //Completed Task
        this.getInCompleteTaskByProjects(); //Incompleted Task
        this.getCountOfTasks(); //Count Of Tasks
        //this.ngOnInit();
      },
      (error) => {
        console.log("Mark as incomplete error");

  });
}

  //Assign task to users API and function call from  goToTaskAssignModal() to get TaskId
  gotoAssignTask(i) {
    let data = {
      assignedTo: this.assignTaskUsers[i].id,
    };
    console.log(this.TaskId);
    this.projectDetailsService
      .updateTask(this.projectId, this.TaskId, data)
      .subscribe(
        (result) => {
          console.log(result.assignedTo);
          console.log('Assign task API', result);
          this.assignedTo = result.assignedTo;
          $('#assignTask').modal('hide');
          this.getInCompleteTaskByProjects();
          this.createTeamUsers(result.assignedTo);
        },
        (error) => {
          console.log('Assign Task error', error);
        }
      );
    console.log(data);
  }

  //Modal popup for taskId
  goToTaskAssignModal(i) {
    this.TaskId = this.incompletedTasks[i].id;
    console.log(this.TaskId);
    $('#assignTask').modal('show');
  }

  createTeamUsers(assignuser) {
    console.log('team fn reached');
    let data = { userId: assignuser };
    console.log(data);
    this.projectDetailsService.createTeamUsers(data, this.projectId).subscribe(
      (result) => {
        console.log('Create team Users', result);
        this.displayteam();
      },
      (error) => {
        console.log('Create Team Users error', error);
      }
    );
  }

  //display team members when assigning the task
  displayteam() {
    this.projectDetailsService.displayteam(this.projectId).subscribe(
      (result) => {
        console.log('Display Team Users', result);
        this.Userarray = result.rows;
        console.log('Diplay project team list', this.Userarray);
        /*for (let i = 0; i < this.Userarray.length; i++) {
          this.userassigncheck.push(result.rows[i].id);
          console.log(this.userassigncheck);
        }*/
      },
      (error) => {
        console.log('Display Team Users error', error);
      }
    );
  }

  //Search Function for Assign User API
  searchfunction() {
    console.log(this.searchValue);
    console.log('search reached');
    this.projectDetailsService.getSearchUser(this.searchValue).subscribe(
      (result) => {
        console.log('search result', result);

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
        console.log('Search error', error);
      }
    );
  }

    addProjectDesc(event: any) {
      if (event.keyCode == 13) {
        let data = {
            // description: this.projectDesc.replace(/(\r\n|\n|\r)/gm, '')
            description: this.projectDesc
        };
        this.projectDetailsService.updateProjectDesc(this.projectId, data).subscribe(
            (result) => {
                this.isEditDesc = false;
            },
            (error) => {
                console.log('Edit Project Description API error', error);
            }
        );
      }
    }

    cancelDesc() {
      this.isEditDesc = false;
      this.getProjectById();
    }

    getProjectById() {
      this.projectsService.getProjectById(this.projectId).subscribe(
        result => {
          this.projectDesc = result.description;
        }, err => {
          console.log(err);
        }
      );
    }
}
