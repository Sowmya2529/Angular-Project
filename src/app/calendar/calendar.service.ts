import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/config/api.service';
import { ConfigService } from 'src/app/config/config.service';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  constructor(private apiService: ApiService, private configService: ConfigService,private http: HttpClient) { }

  getTasksByUserId(userId: any){
    return this.apiService.get(this.configService.getTasksByUserUrl  + userId)
  }

}
