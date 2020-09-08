import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { SharedService } from './shared/shared.service';

@Injectable()
export class AppInterceptor implements HttpInterceptor {
  constructor(private router: Router, private sharedservice: SharedService) { }
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let token = localStorage.getItem('token');
    // const token  = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsInRlbmFudElkIjoxLCJsYXN0VXBkYXRlZEJ5IjoxLCJpc0FkbWluIjpmYWxzZSwic3RhdHVzIjowLCJpYXQiOjE1OTcxNDgwNDQsImV4cCI6MTY4MzU0ODA0NH0.om3u6CtCMxKiSQH99Obd_71tG1NkxQOGrvZHdVLJFko'
    let a = localStorage.getItem('formdata');
    if (!token) {
      token = null;
    }
    if (req.body instanceof FormData) {
      console.log('formdata',req);
      req = req.clone({
        setHeaders: {
          // 'Content-Type': 'multipart/form-data',
          // 'Accept': 'application/json',
          'Authorization': token
        },
      });
    } else {
      //console.log('hi', req);
      //console.log((this.sharedservice.baseUrl + '/users/login'));
      if (req.url.startsWith(this.sharedservice.baseUrl + '/users/login')) {
        req = req.clone({
          setHeaders: {
            //'Accept': 'application/json',
            'Content-Type': 'application/json',
            //'Authorization': token
          },
        });
      }
      else if (req.url.startsWith(this.sharedservice.baseUrl + '/users/verification')) {
        req = req.clone({
          setHeaders: {
            //'Accept': 'application/json',
            'Content-Type': 'application/json',
            //'Authorization': token
          },
        });
      }
      else {
        req = req.clone({
          setHeaders: {
            //'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': token
          },
        });
      }
    }

    return next.handle(req).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401) {
          //  localStorage.clear();
          //  this.router.navigate(['/login']);
        } else if (err.status === 403) {
          console.log(err);
        }
        return throwError(err);
      })
    );
  }
}
