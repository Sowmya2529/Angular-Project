import { Component, OnInit, Input } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navbardesktop',
  templateUrl: './navbardesktop.component.html',
  styleUrls: ['./navbardesktop.component.css'],
})
export class NavbardesktopComponent implements OnInit {
  @Input() metaData: any;
  deviceInfo = null;
  isMobile:boolean = false
  isDesktopDevice:boolean = false
 
  constructor(private deviceService: DeviceDetectorService,private router:Router) {
    
  }
  epicFunction() {
    console.log('hello `Home` component');
    this.deviceInfo = this.deviceService.getDeviceInfo();
    this.isMobile = this.deviceService.isMobile();
    // this.isTablet = this.deviceService.isTablet();
    this.isDesktopDevice = this.deviceService.isDesktop();
   
    console.log(this.deviceInfo);
    console.log(this.isMobile);  // returns if the device is a mobile device (android / iPhone / windows-phone etc)
    // console.log(isTablet);  // returns if the device us a tablet (iPad etc)
    console.log(this.isDesktopDevice); // returns if the app is running on a Desktop browser.
    if(this.isMobile){
      setTimeout( () => {
        this.router.navigate(['/welcome'])
    },1000);
    }
    
  }
  

  ngOnInit(): void {
    this.epicFunction();
  }
  isshowdiv = true;
  
  sidenavigationdisplay() {

    this.isshowdiv = !this.isshowdiv;
  }
}
