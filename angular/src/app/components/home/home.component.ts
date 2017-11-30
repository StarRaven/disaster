import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  disaster_date: FormGroup;
  constructor(
    private router: Router,
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
    this.router.navigate(['family']);
  }
}
