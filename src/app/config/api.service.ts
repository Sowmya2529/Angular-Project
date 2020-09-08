import {
  HttpClient,
  HttpClientModule,
  HttpHeaders,
  HttpRequest,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ApiService {
  csrfToken: string;
  token: string;

  constructor(private http: HttpClient) { }

  private formatErrors(httpresponse: any) {
    return throwError(httpresponse);
  }

  anonGet(
    path: string,
    params: HttpParams = new HttpParams()
  ): Observable<any> {
    return this.http
      .get(`${path}`, {
        params,
      })
      .pipe(catchError(this.formatErrors));
  }

  get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http
      .get(`${path}`, {
        params,
      })
      .pipe(catchError(this.formatErrors));
  }

  getFile(
    path: string,
    params: HttpParams = new HttpParams()
  ): Observable<any> {
    return this.http
      .get(`${path}`, {
        params,
        responseType: 'arraybuffer',
      })
      .pipe(catchError(this.formatErrors));
  }

  delete(path): Observable<any> {
    return this.http.delete(`${path}`).pipe(catchError(this.formatErrors));
  }

  // post(path: string, body: Object = {}): Observable<any> {
  //   const headers = new HttpHeaders().set('Content-Type', 'application/json');
  //   return this.http
  //     .post(`${path}`, JSON.stringify(body), { headers, responseType: 'json' })
  //     .pipe(catchError(this.formatErrors));
  // }
  post(path: string, body: Object = {}): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http
      .post(`${path}`, JSON.stringify(body))
      .pipe(catchError(this.formatErrors));
  }

  postLogin(path: string, body: Object = {}): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http
      .post(`${path}`, JSON.stringify(body), { headers, responseType: 'text' })
      .pipe(catchError(this.formatErrors));
  }

  postGetFile(path: string, body: Object = {}): Observable<any> {
    return this.http
      .post(`${path}`, JSON.stringify(body), {
        responseType: 'arraybuffer',
      })
      .pipe(catchError(this.formatErrors));
  }

  put(path: string, body: Object = {}): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http
      .put(`${path}`, JSON.stringify(body), { headers, responseType: 'json' })
      .pipe(catchError(this.formatErrors));
  }

  patch(path: string, body: Object = {}): Observable<any> {
    return this.http
      .patch(`${path}`, JSON.stringify(body))
      .pipe(catchError(this.formatErrors));
  }


  patchVerify(path: string, body: Object = {}): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http
      .patch(`${path}`, JSON.stringify(body), { headers, responseType: 'text' })
      .pipe(catchError(this.formatErrors));
  }

  post_text(path: string, body: Object = {}): Observable<any> {
    const headers = new HttpHeaders().set(
      'Content-Type',
      'text/plain; charset=utf-8'
    );
    return this.http
      .post(`${path}`, JSON.stringify(body), { headers, responseType: 'text' })
      .pipe(catchError(this.formatErrors));
  }
}
