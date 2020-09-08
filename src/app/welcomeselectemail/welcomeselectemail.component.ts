import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-welcomeselectemail',
  templateUrl: './welcomeselectemail.component.html',
  styleUrls: ['./welcomeselectemail.component.css'],
})
export class WelcomeselectemailComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}
  gotodiffemaipage() {
    this.router.navigate(['/differentemail']);
  }
}
