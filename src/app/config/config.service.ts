import { Injectable } from '@angular/core';
import { SharedService } from '../shared/shared.service';

@Injectable()
export class ConfigService {
  //profileapi
  /* private profileURL = this.restapi.baseUrl + '/users' + 'upload';
  get getprofile(): string {
    return this.getprofile;
  }*/

  //login
  private loginURL = this.restapi.baseUrl + '/users' + '/login';
  get getlogin(): string {
    return this.loginURL;
  }

  //getusers
  constructor(private restapi: SharedService) {}

  //gettaskforspecificuser
  private gettaskusers = this.restapi.baseUrl;
  get getTaskUsers(): string {
    return this.gettaskusers;
  }

  //Create project
  private createProjectURL = this.restapi.baseUrl + '/projects' + '/create';
  get createProjectUrl(): string {
    return this.createProjectURL;
  }

  //Get All projects
  private getAllProjectsURL = this.restapi.baseUrl + '/projects';
  get getAllProjectsUrl(): string {
    return this.getAllProjectsURL;
  }

  ///GetProjectById
  private getProjectByIdURL = this.restapi.baseUrl + '/projects/';
  get getProjectById(): string {
    return this.getProjectByIdURL;
  }

  //getTaskByProjectId
  private getTaskByProjecURL = this.restapi.baseUrl + '/projects/';
  get getTaskByProjecUrl(): string {
    return this.getTaskByProjecURL;
  }

  //create Task
  private createTaskURL = this.restapi.baseUrl + '/projects/';
  get createTaskUrl(): string {
    return this.createTaskURL;
  }

  // Get All Users
  private getAllUsersURLS = this.restapi.baseUrl + '/users';
  get getAllUrls(): string {
    return this.getAllUsersURLS;
  }

  //getTaskIdProjectId {{todo_url}}/api/v1/projects/:projectId/tasks/:taskId
  private getTaskIdByProjectIdURL = this.restapi.baseUrl + '/projects/';
  get getTaskIdByProjectIdUrl(): string {
    return this.getTaskIdByProjectIdURL;
  }

  //getusers
  private getUsersByIDURL = this.restapi.baseUrl + '/users';
  get getUsers(): string {
    return this.getUsersByIDURL;
  }

  //confirmpassword
  private getverifyuserURL =
    this.restapi.baseUrl + '/users' + '/verification' + '/verify';
  get verifyUser(): string {
    return this.getverifyuserURL;
  }

  //update project {{todo_url}}/api/v1/projects/:projectId
  private updateProjectURL = this.restapi.baseUrl + '/projects/';
  get updateProjectUrl(): string {
    return this.updateProjectURL;
  }

  //update task {{todo_url}}/api/v1/projects/:projectId/tasks/:taskId
  private updateTaskURL = this.restapi.baseUrl + '/projects/';
  get updateTaskUrl(): string {
    return this.updateTaskURL;
  }

  //Insert team users
  private createteamusers = this.restapi.baseUrl + '/projects/';
  get usersteam(): string {
    return this.createteamusers;
  }

  //Get team Users
  private displayteamusers = this.restapi.baseUrl + '/projects/';
  get displayteam(): string {
    return this.displayteamusers;
  }

  //{{todo_url}}/api/v1/projects/:projectId/tasks/getCount
  private getCountOfTasksURL = this.restapi.baseUrl + '/projects/';
  get getCountOfTasksUrl(): string {
    return this.getCountOfTasksURL;
  }

  //URL to upload user profile
  private userProfileUpload = this.restapi.baseUrl + '/users/upload';
  get userProfileUploadUrl(): string {
    return this.userProfileUpload;
  }

  //getUserDetails for profile /api/v1/users/:userId
  private profileURL = this.restapi.baseUrl + '/users/';
  get profileUrl():string { return this.profileURL}
  
  private getTasksByUser = this.restapi.baseUrl + '/users/allCalendarTasks/';
  get getTasksByUserUrl(): string {
    return this.getTasksByUser;
  }

  //{{todo_url}}/api/v1/users/:userId
  private UpdateUserURL = this.restapi.baseUrl + '/users/';
  get updateUserUrl():string {return this.UpdateUserURL}

  //{{todo_url}}/api/v1/users/:userId 
  private getUserByIdURL = this.restapi.baseUrl + '/users/';
  get getUserByIdUrl():string {return this.getUserByIdURL}

}
