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
export class LoginService {
  constructor(
    private apiService: ApiService,
    private configService: ConfigService,
    private http: HttpClient
  ) { }

  //login
  login(data) {
    return this.apiService.postLogin(this.configService.getlogin, data);
  }
  //GetUsers
  getUsers(id) {
    return this.apiService.get(this.configService.getUsers + '/' + id);
  }
  //verifyusers
  verifyuser(data: any, token) {
    return this.apiService.patch(
      this.configService.verifyUser + '?token=' + token,
      data
    );
  }
}
