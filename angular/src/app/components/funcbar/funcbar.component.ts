import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AddmemoComponent } from '../addmemo/addmemo.component';

@Component({
  selector: 'app-funcbar',
  templateUrl: './funcbar.component.html',
  styleUrls: ['./funcbar.component.scss']
})
export class FuncbarComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  openMemoDialog(): void {
    let dialogRef = this.dialog.open(AddmemoComponent, {
      width: '529px'
    });
  }

  ngOnInit() {
  }

}
