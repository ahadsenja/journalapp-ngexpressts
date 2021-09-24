import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/core/auth/token-storage.service';

import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string = '';
  password: string = '';

  isLoggedIn = false;
  userInfo: string[] = [];

  constructor(
    private authService: AuthService,
    private token: TokenStorageService,
    private location: Location
  ) { }

  ngOnInit(): void {
    if (this.token.getToken() !== null) {
      this.isLoggedIn = true;
    }
  }

  onSubmit() {
    const { username, password } = this;

    if (username !== '' && password !== '') {
      this.authService.login(username, password).subscribe(data => {
        this.isLoggedIn = true;
        this.token.saveToken(data.token);
        console.log(data);
        this.location.replaceState('/');
        window.location.reload();
      })
    }
  }
}
