import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Headers, Http } from '@angular/http';
import { GlobalService } from '../../global.service';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {
  login_username: string;
  login_password: string;
  register_username: string;
  register_password: string;
  hide1: string;
  hide2: string;

  constructor(
    public dialogRef: MatDialogRef<LoginComponent>,
    private http: Http,
    private global: GlobalService
  ) { }

  Login(): void {
    let body = JSON.stringify({ username: this.login_username, password: this.login_password });
    let headers = new Headers({ 'Content-Type': 'application/json' });
    this.http.post('/api/login', body, { headers: headers }).subscribe(
      (jsonData) => {
        let jsonDataBody = jsonData.json();
        if (jsonDataBody.status) {
          this.global.login = true;
          this.global.id = jsonDataBody.id;
          this.global.username = jsonDataBody.username;
          console.log(this.global);
          this.dialogRef.close();
        }
      },
      // The 2nd callback handles errors.
      (err) => console.error(err),
      // The 3rd callback handles the "complete" event.
      () => console.log("observable complete")
    );
  }

  Register(): void {
    let body = JSON.stringify({ username: this.register_username, password: this.register_password });
    let headers = new Headers({ 'Content-Type': 'application/json' });
    this.http.post('/api/register', body, { headers: headers }).subscribe(
      (jsonData) => {
        let jsonDataBody = jsonData.json();
        if (jsonDataBody.status) {
          this.global.login = true;
          this.global.id = jsonDataBody.id;
          this.global.username = jsonDataBody.username;
          console.log(this.global);
          this.dialogRef.close();
        }
      },
      // The 2nd callback handles errors.
      (err) => console.error(err),
      // The 3rd callback handles the "complete" event.
      () => console.log("observable complete")
    );
  }

  ngOnInit(): void {
    //this.hide1 = 'visibility_off';
    //this.hide2 = 'visibility_off';
  }

}
