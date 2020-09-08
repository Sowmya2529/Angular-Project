import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  HostListener,
  ElementRef,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';
import { UploadService } from '../services/upload.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  @Input() metaData: any;
  @Input() ProfileImage:any;
  username: any;
  companyname: any;
  profileImage: any;
  firstName:any;
  lastName:any;
  userId = localStorage.getItem('userId')
  constructor(private router: Router,private _el:ElementRef,private upload: UploadService) {
    
   }
   @HostListener('document:click', ['$event.target'])
   public onClick(targetElement) {
       const clickedInside = this._el.nativeElement.contains(targetElement);
       if (!clickedInside) {
           this._el.nativeElement.querySelector('.navbar-collapse').classList.remove('show');
           
       }
   }
  ngOnInit(): void {
    //  console.log(this.metaData);
    this.getUserById();
   this.username = localStorage.getItem('Name');
    this.companyname = localStorage.getItem('companyName');
   // this.profileImage = '';
    console.log(this.username);
    
   /* window.onclick=function (event) {
    
         var clickover = event.target;
         var _opened = clickover.hasClass("show");
         if (_opened === true && !clickover.hasClass("navbar-toggler")) {
             clickover.click();
         }*/
     
 }

 getUserById(){
   this.upload.getUserById(this.userId).subscribe(
     result =>{
       console.log("Get UserId for Image",result);
       if(result.imageUrl){
       this.ProfileImage = result.imageUrl;
      }
      else{
        this.firstName = result.firstName
        this.lastName = result.lastName
      }
      error =>{
        console.log("Get User By Id for Image API error",error)
      }
     }
   )
 }
  

  sidenavvalue: string;

  isshowdiv = true;
  sidenavigationdisplay() {
    this.isshowdiv = !this.isshowdiv;
  }
  gotologin() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  /*
  selection(value: string) {
    console.log(value);
    this.sidenavvalue = value;
    console.log(this.sidenavvalue);
  }
   @HostListener('click', ['$event'])
  onClick(event: MouseEvent) {
    console.log(event.currentTarget);
  }
  
  $("a").on("click",function(e)
  {
    var current=$(this).attr("id");
  });
  
  
   check($event) {
    if ($event.target.tagName === 'A') {
      alert('Link clicked');
      console.log('clicked');
    } else {
    }
  }*/
}
