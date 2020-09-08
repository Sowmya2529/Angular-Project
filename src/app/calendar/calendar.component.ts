import { Component, OnInit, HostListener } from '@angular/core';
import { CalendarService } from './calendar.service';
import { ProjectDetailsService } from '../projectdetails/projectdetails.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
})
export class CalendarComponent implements OnInit {
    metaData: any;
    public innerWidth: any;
    desktop: boolean = true;
    mobile: boolean = false;
    userId: string;
    tasklist: any = [];
    listofTasks = [];
    iconvisiblearray: boolean[] = [false];

    constructor(private service: CalendarService, private router: Router, private projectService: ProjectDetailsService) {}

    @HostListener('window:resize', ['$event'])
    onResize(event) {
        this.innerWidth = window.innerWidth;
    }
    
    ngOnInit(): void {
        document.querySelector('body').classList.add('selector');
        this.metaData = 'Calendar';
        this.innerWidth = window.innerWidth;
        this.userId = localStorage.getItem('userId');

        if (this.innerWidth >= 1000) {
            this.desktop = true;
            this.mobile = false;
        }
        if (this.innerWidth < 1000) {
            this.mobile = true;
            this.desktop = false;
        }
        this.getUserDueTasks();
    }

    getUserDueTasks() {
        this.service.getTasksByUserId(this.userId).subscribe(
            (result: any) => {
                this.tasklist = Object.keys(result.tasks).length !== 0 ? result.tasks : [];
                if (Object.keys(result.tasks).length !== 0) {
                    for (let t in result.tasks) {
                        this.iconvisiblearray[t] = false;
                    }
                }
                this.listofTasks = Object.keys(result.futureTask).length !== 0 ? result.futureTask : [];
            }, (error: any) => {
                console.log('error');
            }
        );
    }

    mouseEnter(i) {
        this.iconvisiblearray[i] = true;
    }

    mouseLeave(i) {
        this.iconvisiblearray[i] = false;
    }

    gotoTaskDetails(taskList){
        this.router.navigate(['/project/'+  taskList.projectId + '/task/' +    taskList.id])
    }

    MarkAsComplete(task: any) {
        let data = { status: 'complete' };
        this.projectService.updateTask(task.projectId, task.id, data).subscribe(
            (result: any) => {
                this.getUserDueTasks();
            }, (error: any) => {
                console.log('Mark As Complete API error', error);
            }
        );
    }
}
