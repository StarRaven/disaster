import { Component, OnInit, Inject } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-family',
  templateUrl: './family.component.html',
  styleUrls: ['./family.component.scss']
})
export class FamilyComponent implements OnInit {
  add_family_member : FormGroup;
  constructor(

  ) {
    this.add_family_member = new FormGroup({
      firstname: new FormControl(null, [Validators.required]),
      lastname: new FormControl(null, [Validators.required]),
      gender: new FormControl(null, [Validators.required]),
      birthdate: new FormControl(null, [Validators.required]),
      phone: new FormControl(null, [Validators.required]),
      health: new FormControl(null, [Validators.required]),
    });
  }

  FamilyMemberAdd(){
    console.log(1);
  }
  ngOnInit() {
  }

}
