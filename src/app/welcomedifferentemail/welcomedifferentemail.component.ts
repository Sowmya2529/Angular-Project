import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { SuccesspageComponent } from '../successpage/successpage.component';

@Component({
  selector: 'app-welcomedifferentemail',
  templateUrl: './welcomedifferentemail.component.html',
  styleUrls: ['./welcomedifferentemail.component.css'],
})
export class WelcomedifferentemailComponent implements OnInit {
  constructor(public dialog: MatDialog, private router: Router) {}

  openDialog(): void {
    setTimeout(() => {
      dialogRef.close();
      this.router.navigate(['/home']);
    }, 2000);
    const dialogRef = this.dialog.open(SuccesspageComponent, {
      width: '300px',
    });
  }
  ngOnInit(): void {}
}
