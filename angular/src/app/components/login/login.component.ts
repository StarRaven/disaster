import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Headers, Http } from '@angular/http';
import { GlobalService } from '../../global.service';
import { MatIconModule } from '@angular/material/icon';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {
  login_form: FormGroup;
  register_form: FormGroup;
  hide1: string;
  hide2: string;

  constructor(
    public dialogRef: MatDialogRef<LoginComponent>,
    private http: Http,
    public fb: FormBuilder,
    private global: GlobalService
  ) {
    this.login_form = new FormGroup({
      username: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
    });

    this.register_form = new FormGroup({
      username: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
      confirm: new FormControl(null, [Validators.required]),
    });
  }

  Login(): void {
    let body = JSON.stringify({ username: this.login_form.get('username').value, password: this.login_form.get('password').value });
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
    let body = JSON.stringify({ username: this.register_form.get('username').value, password: this.register_form.get('password').value });
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
    this.hide1 = 'visibility_off';
    this.hide2 = 'visibility_off';
  }

}
