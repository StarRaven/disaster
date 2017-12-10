import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GlobalService } from '../../global.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  disaster_date: FormGroup;
  start: Date;
  end: Date;

  constructor(
    private router: Router,
    private global: GlobalService,
    public snackBar: MatSnackBar,
  ) {
    this.disaster_date = new FormGroup({
      disaster: new FormControl(null, [Validators.required]),
      startdate: new FormControl(null, [Validators.required]),
      enddate: new FormControl(null, [Validators.required])
    });
  }

  ngOnInit() {
  }

  checkLogin(): boolean {
    if (!this.global.login) {
      this.snackBar.open('Please Log in first','x', {
        duration: 2000,
      });
      return false;
    }
    return true;
  }

  checkFill(): boolean {
    if ((!this.disaster_date.get('startdate').value) || (!this.disaster_date.get('enddate').value) || (!this.disaster_date.get('disaster').value)) {
      this.snackBar.open('Please fill out all the blanks','x', {
        duration: 2000,
      });
      return false;
    }
    return true;
  }

  DisasterDate() {
    if (!this.checkLogin())
      return;
    if (!this.checkFill())
      return;
    this.start = this.disaster_date.get('startdate').value;
    this.end = this.disaster_date.get('enddate').value;
    let s = + this.start;
    let e = + this.end;
    this.global.days = (e - s) / 86400000;
    this.global.location = this.disaster_date.get('disaster').value;
    this.router.navigate(['family']);
  }
}
