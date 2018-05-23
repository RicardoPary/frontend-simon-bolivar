import { Component, OnInit } from '@angular/core';
import {LoginService} from '../../shared/auth';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss']
})
export class LoginModalComponent implements OnInit {

  constructor(private loginService: LoginService,
              public router: Router) { }

  ngOnInit() {
  }

  login (form) {
    console.log(form);
    this.loginService.login ({
      username: form.value.username,
      password: form.value.password,
      rememberMe: false
    }).then (() => {
      this.router.navigate (['/dashboard']);
    }).catch ((e) => console.log(e));
  }

}
