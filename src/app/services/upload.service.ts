import { Injectable } from '@angular/core';
import { ApiService } from '../config/api.service';
import { ConfigService } from '../config/config.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  constructor(
    private apiService: ApiService,
    private configService: ConfigService,
    private http: HttpClient
  ) {}

  uploadImage(data: any) {
    console.log(data);
    return this.http.patch(this.configService.userProfileUploadUrl, data)
  }
  UpdateUser(userId,data){
    return this.apiService.put(this.configService.updateUserUrl + userId,data)
  }

  //{{todo_url}}/api/v1/users/:userId 
  getUserById(userId:any){
    return this.apiService.get(this.configService.getUserByIdUrl + userId)
  }

  
}
