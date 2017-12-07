import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GlobalService } from '../../global.service';

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
  ) {
    this.disaster_date = new FormGroup({
      disaster: new FormControl(null, [Validators.required]),
      startdate: new FormControl(null, [Validators.required]),
      enddate: new FormControl(null, [Validators.required])
    });
  }

  ngOnInit() {
  }

  DisasterDate() {
    this.start = this.disaster_date.get('startdate').value;
    this.end = this.disaster_date.get('enddate').value;
    let s = + this.start;
    let e = + this.end;
    this.global.days = (e - s) / 86400000;
    this.global.location = this.disaster_date.get('disaster').value;
    this.router.navigate(['family']);
  }
}
