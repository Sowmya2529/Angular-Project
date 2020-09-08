import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { SuccesspageComponent } from '../successpage/successpage.component';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { CreatePasswordService } from '../createpassword/createpassword.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { error } from 'protractor';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-createpassword',
  templateUrl: './createpassword.component.html',
  styleUrls: ['./createpassword.component.css'],
})
export class CreatepasswordComponent implements OnInit {
  id: any;
  private token_: string;
  passcheck: boolean;
  alreadyVerified: boolean;

  profileForm = new FormGroup({
    password: new FormControl('', Validators.required),
    confirmpassword: new FormControl('', Validators.required),
  });

  constructor(
    private router: Router,
    public dialog: MatDialog,
    public formBuilder: FormBuilder,
    private passwordservice: CreatePasswordService,
    private _route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) { }
  /*onSubmit() {
    // TODO: Use EventEmitter with form value
    console.log(this.profileForm.controls.password.value);
    console.log(this.profileForm.controls.confirmpassword.value);
  }*/
  ngOnInit(): void {
    localStorage.clear();
    /* this.passwordservice.getUsers(36).subscribe(
      (result) => {
        if (result.firstName) {
          if (result.lastName != null && result.lastName != '') {
            // //console.log(element.user.lastName);
            result.firstName += result.lastName ? ' ' + result.lastName : '';
          }
          this.name = result.firstName;
        }
        console.log(name);

        console.log('Get Users', result);
      },
      (error) => {
        console.log('Get Users', error);
      }
    );*/
    this._route.paramMap.subscribe((paraMap) => {
      this.id = paraMap.get('id');
      // this.token_=paraMap.get('token');
      console.log(this.id);
      //console.log(this.token_);
      this._route.queryParams.subscribe((params) => {
        this.token_ = params['token'];
        console.log(this.token_);
        //this.param2 = params['param2'];
      });
    });
    const helper = new JwtHelperService();
    let tid = helper.decodeToken(this.token_);
    if (tid.firstName) {
      if (tid.lastName != null && tid.lastName != '') {
        tid.firstName += tid.lastName ? ' ' + tid.lastName : '';
      }
      this.name = tid.firstName;
      console.log(this.name);
      localStorage.setItem('Name', this.name);
    }


    //localStorage.setItem('token', this.token_);
    //localStorage.setItem('token', token);
  }
  get f() {
    return this.profileForm.controls;
  }
  name: string;
  success() {

    let data = {
      password: this.profileForm.value.password,
      confirmPassword: this.profileForm.value.confirmpassword,
    };
    console.log(data);
    // const token =
    // 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInRlbmFudElkIjoxLCJpc0FkbWluIjp0cnVlLCJzdGF0dXMiOjEsImlhdCI6MTU5NjgxMDA0MiwiZXhwIjoxNjgzMjEwMDQyfQ.99NXFitJZlrqlSsURHqjPvm1GiZD_YtzpR-TBgrC900';
    this.passwordservice.verifyuser(data, this.token_).subscribe(
      (result) => {
       // this.alreadyVerified = false
        const passdecode = new JwtHelperService();
        let passdecoded = passdecode.decodeToken(this.token_);
        console.log('decoded result', passdecoded);
        console.log(result);
        localStorage.setItem('token', result);
        localStorage.setItem('userId', passdecoded.userId);
        localStorage.setItem('tenantId', passdecoded.tenantId);
        localStorage.setItem('companyName', passdecoded.companyName);
        console.log('Verify User', result);
        const dialogRef = this.dialog.open(SuccesspageComponent, {
          height: '330px',
          width: '440px',
        });
      
      },
      (error) => {
        
        console.log('Verify Users', JSON.parse(JSON.stringify(error)))
        this.snackBar.open('User has already been verified', 'Close', {
          duration: 2000,
          verticalPosition: 'top',
          panelClass: ['bg-danger']
        });
      }
    );
    /*if (
      this.profileForm.controls.password.value == '' ||
      this.profileForm.controls.confirmpassword.value == ''
    ) {
      this.passcheck = false;
    }*/

    console.log(this.profileForm.controls.password.value);
    console.log(this.profileForm.controls.confirmpassword.value);

    // if (
    //   this.profileForm.controls.password.value ===
    //   this.profileForm.controls.confirmpassword.value
    // ) {
    //   this.passcheck = false;
    //   console.log(this.passcheck);
    // } else {
    //   this.passcheck = true;
    //   console.log(this.passcheck);
    // }
  /*if (this.alreadyVerified == false) {
       setTimeout(() => {
         dialogRef.close();
       this.router.navigate(['/home/']);
       }, 2000);
      const dialogRef = this.dialog.open(SuccesspageComponent, {
        height: '330px',
        width: '440px',
      });
    }
    else {
      this.snackBar.open('User has already been verified', 'Close', {
        duration: 2000,
        verticalPosition: 'top',
        panelClass: ['bg-danger']
      });
    }
  }*/
}
}

// this.router.navigate(['/home']);
