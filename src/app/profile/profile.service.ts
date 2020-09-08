import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/config/api.service';
import { ConfigService } from 'src/app/config/config.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import {
  HttpHeaders,
  HttpClientModule,
  HttpClient,
} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(
    private apiService: ApiService,
    private configService: ConfigService,
    private http: HttpClient
  ) {}

  getProfileDetails(userId){
    return this.apiService.get(this.configService.profileUrl + userId)
  }

  /*createProjects(data):Observable<any>{
     return this.http.post(this.configService.createProjectUrl,data)
  }

 
  getAllProjects(){
    return this.apiService.get(this.configService.getAllProjectsUrl);
  }

  getProjectById(projectId:any){
    return this.apiService.get(this.configService.getProjectById  + projectId)
  }*/
}
