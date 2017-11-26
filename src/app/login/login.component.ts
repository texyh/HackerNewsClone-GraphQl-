import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { AuthService } from '../services/auth.service';
import { GC_USER_ID, GC_AUTH_TOKEN } from '../constants/authConstants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User;
  login: boolean = true;

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  confirm() {
    // ... you'll implement this in a bit
  }

  saveUserData(id, token) {
    localStorage.setItem(GC_USER_ID, id);
    localStorage.setItem(GC_AUTH_TOKEN, token);
    this.authService.setUserId(id);
  }

}
