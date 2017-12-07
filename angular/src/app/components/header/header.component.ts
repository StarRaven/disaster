import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { LoginComponent } from '../login/login.component';
import { GlobalService } from '../../global.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    private global: GlobalService,
  ) { }

  openLoginDialog() {
    let dialogRef = this.dialog.open(LoginComponent, {
      width: '529px'
    });
  }


  ngOnInit() {
  }

}
