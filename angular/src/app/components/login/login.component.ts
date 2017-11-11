import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {
  test: string = 'just a test';
  login_success: boolean;
  constructor(private auth: AuthService) {}
  ngOnInit(): void {
    let sampleUser: any = {
      username: 'admin' as string,
      password: 'admin' as string
    };
    /*
    this.auth.register(sampleUser)
    .then((user) => {
      console.log(user.json());
    })
    .catch((err) => {
      console.log(err);
    });
    */
    /*
    this.auth.login(sampleUser).then((user) => {
      console.log(user.json());
    })
    .catch((err) => {
      console.log(err);
    });
    */
    this.login_success = this.auth.login(sampleUser);
    console.log(this.login_success);
    //this.auth.login();
  }

}
