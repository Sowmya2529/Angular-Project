import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/config/api.service';
import { ConfigService } from 'src/app/config/config.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpHeaders,HttpClientModule,HttpClient } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class TaskDetailsService {
   
  constructor(private apiService: ApiService, private configService: ConfigService,private http: HttpClient) { }

 
  //update task {{todo_url}}/api/v1/projects/:projectId/tasks/:taskId
  updateTask(projectId:any,taskId:any,data){
    return this.apiService.put(this.configService.updateTaskUrl + projectId + '/tasks/' + taskId,data)
  }

  updateProjectTaskDesc(projectId: any, taskId: any, data: any) {
    return this.apiService.put(this.configService.updateTaskUrl + projectId + '/tasks/' + taskId + '/desc', data)
  }

}
