import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/config/api.service';
import { ConfigService } from 'src/app/config/config.service';
import { map, sample } from 'rxjs/operators';
import { Observable } from 'rxjs';
import {
  HttpHeaders,
  HttpClientModule,
  HttpClient,
} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProjectDetailsService {
  constructor(
    private apiService: ApiService,
    private configService: ConfigService,
    private http: HttpClient
  ) { }

  //GetTaskByProject
  getTaskByProject(projectId: any) {
    return this.apiService.get(
      this.configService.getTaskByProjecUrl + projectId + '/tasks?status=incomplete'
    );
  }

  getcompleteTask(projectId: any) {
    return this.apiService.get(this.configService.getTaskByProjecUrl + projectId + '/tasks?status=complete');
  }

  //create Task
  createTask(data: any, projectId: any): Observable<any> {
    return this.http.post(
      this.configService.createTaskUrl + projectId + '/tasks' + '/create',
      data
    );
  }

  //create users for team
  createTeamUsers(data: any, projectId: any): Observable<any> {
    return this.http.post(this.configService.usersteam +
      projectId + '/users' + '/add', data);

  }

  //Displaying team Users
  displayteam(projectId: any): Observable<any> {
    return this.http.get(this.configService.displayteam +
      projectId + '/users');

  }


  //Get all users for assign Task
  getAllUsers() {
    return this.apiService.get(this.configService.getAllUrls);
  }

  getSearchUser(searchValue: any) {
    return this.apiService.get(
      this.configService.getAllUrls + '?fullName=' + searchValue
    );
  }


  //{{todo_url}}/api/v1/projects/:projectId/tasks/:taskId/subTask?status=incomplete&offset=0&limit=10
  getTaskIdProjectId(projectId: any, taskId: any) {
    return this.apiService.get(
      this.configService.getTaskIdByProjectIdUrl +
      projectId +
      '/tasks/' +
      taskId

    );
  }

  getInCompletedTaskIdProjectId(projectId: any, taskId: any) {
    return this.apiService.get(
      this.configService.getTaskIdByProjectIdUrl +
      projectId +
      '/tasks/' +
      taskId + '/subTask?status=incomplete'
    );
  }
  getCompletedTaskIdProjectId(projectId: any, taskId: any) {
    return this.apiService.get(
      this.configService.getTaskIdByProjectIdUrl +
      projectId +
      '/tasks/' +
      taskId + '/subTask?status=complete'
    );
  }

  //update Project {{todo_url}}/api/v1/projects/:projectId
  updateProject(projectId: any, data) {
    return this.apiService.put(
      this.configService.updateProjectUrl + projectId,
      data
    );
  }

  updateTask(projectId: any, taskId: any, data) {
    return this.apiService.put(
      this.configService.updateTaskUrl + projectId + '/tasks/' + taskId,
      data
    );
  }

  getCountOfTasks(projectId:any){
    return this.apiService.get(this.configService.getCountOfTasksUrl + projectId + '/tasks/getCount')
  }

  updateProjectDesc(projectId: any, data: any) {
    return this.apiService.put(
      this.configService.updateProjectUrl + projectId + '/desc',
      data
    );
  }

}
