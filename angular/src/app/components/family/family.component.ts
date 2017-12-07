import { Component, OnInit, Inject } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { FuncbarComponent } from '../funcbar/funcbar.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Headers, Http } from '@angular/http';
import { GlobalService } from '../../global.service';
import { Human } from '../../human';
import { Pet } from '../../pet';

@Component({
  selector: 'app-family',
  templateUrl: './family.component.html',
  styleUrls: ['./family.component.scss']
})
export class FamilyComponent implements OnInit {
  add_family_member: FormGroup;
  humans: Human[] = [];
  pets: Pet[] = [];

  constructor(
    public global: GlobalService,
    private http: Http,
  ) {
    this.add_family_member = new FormGroup({
      kind: new FormControl(null, [Validators.required]),
      firstname: new FormControl(null, [Validators.required]),
      lastname: new FormControl(null, [Validators.required]),
      gender: new FormControl(null, [Validators.required]),
      birthdate: new FormControl(null, [Validators.required]),
      phone: new FormControl(null, [Validators.required]),
      health: new FormControl(null, [Validators.required]),
    });
  }

  check_valid(): boolean {
    if (this.add_family_member.get('kind').value == 'human') {
      if (!this.add_family_member.get('firstname').value)
        return true;
      if (!this.add_family_member.get('lastname').value)
        return true;
      if (!this.add_family_member.get('gender').value)
        return true;
      if (!this.add_family_member.get('birthdate').value)
        return true;
      if (!this.add_family_member.get('phone').value)
        return true;
      if (!this.add_family_member.get('health').value)
        return true;
    }
    else if (this.add_family_member.get('kind').value == 'pet') {

    }
    return false;
  }

  HumanAdd() {
    let registerHuman: any = {
      firstname: this.add_family_member.get('firstname').value,
      lastname: this.add_family_member.get('lastname').value,
      gender: this.add_family_member.get('gender').value,
      birthdate: this.add_family_member.get('birthdate').value,
      phone: this.add_family_member.get('phone').value,
      health: this.add_family_member.get('health').value,
    };

    let body = JSON.stringify({ userid: this.global.id, firstname: registerHuman.firstname, lastname: registerHuman.lastname, gender: registerHuman.gender, birthdate: registerHuman.birthdate, phone: registerHuman.phone, health: registerHuman.health });
    let headers = new Headers({ 'Content-Type': 'application/json' });
    this.http.post('/api/add/human' , body, { headers: headers }).subscribe(
      (jsonData) => {
        let jsonDataBody = jsonData.json();
        if (jsonDataBody.status) {
          this.getAllMembers();
          this.add_family_member.reset();
        }
      },
      // The 2nd callback handles errors.
      (err) => console.error(err),
      // The 3rd callback handles the "complete" event.
      () => console.log("observable complete")
    );

  }

  PetAdd() {

  }

  getAllMembers() {
    let headers = new Headers({ 'Content-Type': 'application/json' });

    this.http.get('/api/get/human', { headers: headers }).subscribe(
      (jsonData) => {
        this.humans = [];
        let jsonDataBody = jsonData.json();
        for (let entry of jsonDataBody) {
          let r: Human = {
            id: entry[0],
            firstname: entry[2],
            lastname: entry[3],
            gender: entry[4],
            birthdate: entry[5],
            phone: entry[6],
            health: entry[7],
          };
          this.humans.push(r);
        };
        console.log(this.humans);
      },
      // The 2nd callback handles errors.
      (err) => console.error(err),
      // The 3rd callback handles the "complete" event.
      () => console.log("observable complete")
    );
  }

  FamilyMemberAdd() {
    if (this.add_family_member.get('kind').value == 'human')
      this.HumanAdd();

  }

  ngOnInit() {

  }
}
