import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  metaData: any;
  public innerWidth: any;
  desktop: boolean = true;
  mobile: boolean = false;
  constructor() {}
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
  }

  ngOnInit(): void {
    this.metaData = 'Dashboard';
    this.innerWidth = window.innerWidth;
    console.log(this.innerWidth);
    if (this.innerWidth >= 1000) {
      this.desktop = true;
      this.mobile = false;
    }
    if (this.innerWidth < 1000) {
      this.mobile = true;
      this.desktop = false;
    }
  }
}
