import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectsService } from './projects.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
})
export class ProjectsComponent implements OnInit {
  createdOn: any;
  metaData: any;
  public innerWidth: any;
  desktop: boolean = true;
  mobile: boolean = false;
  clicked: boolean = false;
  projectName: any;
  isLoaded: boolean = false;
  getALLProjects: any;
  length: any;
  errMsg: boolean =false;
  constructor(private router: Router, private projectsService: ProjectsService) {

  }
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
  }
  @HostListener('window:popstate', ['$event'])
  onPopState(event) {
    document.querySelector('body').classList.remove('selector');
    console.log('Back button pressed');
  }
  onClickedOutside(e: Event) {
    this.clicked = false;
  }
  ngOnInit(): void {

    document.querySelector('body').classList.add('selector');
    // document.body.classList.add('selector');
    this.metaData = 'Projects';
    console.log(this.metaData);
    this.innerWidth = window.innerWidth;
    // console.log(this.innerWidth);
    if (window.innerWidth >= 1000) {
      this.desktop = true;
      this.mobile = false;
    }
    if (window.innerWidth < 1000) {
      this.mobile = true;
      this.desktop = false;
    }
    this.getAllProjects();
  }


  gotoProjectDetails(i: any) {
    console.log(this.getALLProjects[i].id);
    let projectId = this.getALLProjects[i].id
    console.log(projectId)
    this.projectsService.getProjectById(projectId).subscribe(
      result => {
        console.log("GetProjectById API", result);
        this.createdOn = result.createdOn;
        console.log(this.createdOn);
        this.router.navigate(['/project/' + result.id])
      },
      error => {
        console.log("GetProjectById error API", error)
      }
    )

  }


  AddProject(event: any) {
    let currDate = new Date();
    localStorage.setItem("formdata", 'true');
  
    let projectCreatedon = this.formatDate(currDate)
    if (event.keyCode == 13) {
      console.log(this.projectName)
      let data = {
        name: this.projectName,
        status: 'active',
        createdOn: projectCreatedon
      }
      if(this.projectName){
        console.log("Project Name is present")
        this.errMsg = false;
        this.projectsService.createProjects(data).subscribe(
          result => {
            console.log("Create Project API", result);
            this.clicked = false
            this.getAllProjects();
            this.projectName = ""
            localStorage.setItem("formdata", 'false');
          },
          error => {
            console.log("Create Projects API error", error)
          }
        )
      }
      else{
        console.log("Project Name is not present")
        this.errMsg = true;
      }
      
    }


  }
  formatDate(date) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;

    return [year, month, day].join('-');
  }

  getAllProjects() {
    this.projectsService.getAllProjects().subscribe(
      result => {
        console.log("Get All Projects API", result);
        this.getALLProjects = result.rows;
        this.length = this.getALLProjects.length;
        console.log(this.length)
        this.isLoaded = true;
      },
      error => {
        console.log("Get All Projects API error", error);
      }
    )
  }
}
