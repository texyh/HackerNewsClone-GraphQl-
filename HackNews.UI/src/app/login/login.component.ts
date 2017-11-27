import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { AuthService } from '../services/auth.service';
import { GC_USER_ID, GC_AUTH_TOKEN } from '../constants/authConstants';
import { Router } from '@angular/router/';
import { Apollo } from 'apollo-angular/Apollo';
import { SIGNIN_USER_MUTATION, CREATE_USER_MUTATION, SigninUserMutationResponse } from '../queries/userQueries';
import { CreateLinkMutationResponse } from '../queries/linkQueries';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User;
  login: boolean = true;

  constructor(private authService: AuthService,
              private router: Router,
              private apollo: Apollo) {
              this.user = new User();
   }

  ngOnInit() {
  }

  confirm() {
    this.login ? this.signinUser() : this.signupUser();
  }

  signinUser() {
    this.apollo.mutate<SigninUserMutationResponse>({
      mutation: SIGNIN_USER_MUTATION,
      variables: {
        email: this.user.email,
        password: this.user.password
      }
    }).subscribe((result) => {
      const id = result.data.signinUser.user.id;
      const token = result.data.signinUser.token;
      this.saveUserData(id, token);

      this.router.navigate(['/']);

    }, (error) => {
      alert(error);
    });
  }

  signupUser() {
    this.apollo.mutate<CreateLinkMutationResponse>({
      mutation: CREATE_USER_MUTATION,
      variables: {
        name: this.user.name,
        email: this.user.email,
        password: this.user.password
      }
    }).subscribe((result) => {
      const id = result.data.signinUser.user.id;
      const token = result.data.signinUser.token;
      this.saveUserData(id, token);

      this.router.navigate(['/']);

    }, (error) => {
      alert(error)
    })
  }

  saveUserData(id, token) {
    localStorage.setItem(GC_USER_ID, id);
    localStorage.setItem(GC_AUTH_TOKEN, token);
    this.authService.setUserId(id);
  }

}
