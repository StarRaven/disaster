import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { LoginComponent } from '../login/login.component';
import { AddmemoComponent } from '../addmemo/addmemo.component';
import { GlobalService } from '../../global.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    private global: GlobalService,
    private router: Router,
    public snackBar: MatSnackBar,
  ) { }

  Logout() {
    this.global.days = 0;
    this.global.username = '';
    this.global.id = 0;
    this.global.login = false;
    this.global.location = '';
    this.router.navigate(['home']);
  }

  openMemoDialog(): void {
    if (!this.global.login) {
      this.snackBar.open('Please Log in first','x', {
        duration: 2000,
      });
      return;
    }
    let dialogRef = this.dialog.open(AddmemoComponent, {
      width: '529px'
    });
  }

  openLoginDialog() {
    let dialogRef = this.dialog.open(LoginComponent, {
      width: '368px'
    });
  }


  ngOnInit() {
  }

}
