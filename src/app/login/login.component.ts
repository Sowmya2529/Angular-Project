import { Component, OnInit, HostListener } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LocationStrategy } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  /* emailinp: string;
  passinp: string;
  emptyinp: boolean = false;*/
  invalid: boolean = false;
  name: any;
  invalidCredentials: boolean = false;
  loginForm: FormGroup;
  password = new FormControl('', [Validators.required]);
  email = new FormControl('', [Validators.required]);

  @HostListener('window:popstate', ['$event'])
  onPopState(event) {
    window.sessionStorage.clear();
    localStorage.clear();
    // window.location.assign('/');
    console.log('Back button pressed');
    window.onbeforeunload = function () { return "Your work will be lost."; };
    this.router.navigate(['/login'])
  }

  constructor(

    public formBuilder: FormBuilder,
    private loginservice: LoginService,
    private router: Router,
    private location: LocationStrategy,
    private snackBar: MatSnackBar
  ) {
    history.pushState(null, null, window.location.href); this.location.onPopState(() => { history.pushState(null, null, window.location.href); });
  }

  ngOnInit(): void {

    localStorage.clear();
    document.querySelector('body').classList.remove('selector');
    this.invalidCredentials = false;
    this.loginForm = this.formBuilder.group({
      email: new FormControl('', [
        Validators.required,
        Validators.email,
        Validators.pattern(
          '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$'
        ),
      ]),
      password: new FormControl('', Validators.required),
    });
    this.loginForm.controls.email.setValue('');
    this.loginForm.controls.password.setValue('');
    this.onChanges()
  }
  onChanges() {
    this.loginForm.valueChanges.subscribe((val) => {
      this.invalid = false;
    }
    );
  }
  get f() {
    return this.loginForm.controls;
  }
  success() {
    /* if (!this.emailinp || !this.passinp) {
      this.emptyinp = true;
    } else {
      this.emptyinp = false;
    }*/

    let data = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    };

    this.loginservice.login(data).subscribe(
      (result) => {
        if (result) {
          const helper = new JwtHelperService();
          const tid = helper.decodeToken(result);
          console.log(tid);
          console.log(tid.isAdmin);
          console.log(tid.status);
          if (tid.isAdmin == true && tid.status==1) {
            this.snackBar.open('You are not verified.Please verify and try again', 'Close', {
              duration: 2000,
              verticalPosition: 'top',
              panelClass: ['bg-danger']
            });
          }
          else if (tid.status != 2) {
            this.snackBar.open('You are not verified.Please verify and try again', 'Close', {
              duration: 2000,
              verticalPosition: 'top',
              panelClass: ['bg-danger']
            });
          }
          else {
            localStorage.setItem('token', result);
            localStorage.setItem('companyName', tid.companyName);
            if (tid.firstName) {
              if (tid.lastName != null && tid.lastName != '') {
                tid.firstName += tid.lastName ? ' ' + tid.lastName : '';
              }
              this.name = tid.firstName;
              console.log(this.name);
              localStorage.setItem('Name', this.name);
              localStorage.setItem('userId', tid.userId);
              localStorage.setItem('tenantId', tid.tenantId);
            }

            console.log('Get Users', result);
            this.router.navigate(['/home']);
          }
        }
      },
      (error) => {
        this.invalid = true;
        console.log('Get Users', error);
        if (error.status === 401) {
          this.invalidCredentials = true;
        }
        if (
          error.status === 401 &&
          error.error.message === 'User doesnt exist'
        ) {
          this.invalidCredentials = true;
        }
        if (
          error.status === 401 &&
          error.error.message === 'Invalid Credentials'
        ) {
          this.invalidCredentials = true;
        }
        if (error.status === 400) {
          this.invalidCredentials = true;
        }
      }
    );
  }
}
