import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/config/api.service';
import { ConfigService } from 'src/app/config/config.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpHeaders,HttpClientModule,HttpClient } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
   
  constructor(private apiService: ApiService, private configService: ConfigService,private http: HttpClient) { }

  //Add Projects
  createProjects(data):Observable<any>{
     return this.http.post(this.configService.createProjectUrl,data)
  }

  //Get All projects
  getAllProjects(){
    return this.apiService.get(this.configService.getAllProjectsUrl);
  }

  //GetProjectById
  getProjectById(projectId:any){
    return this.apiService.get(this.configService.getProjectById  + projectId)
  }
}
