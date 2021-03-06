import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import 'rxjs/add/operator/distinctUntilChanged';
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  logged: boolean = false;

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    this.authService.isAuthenticated
    .distinctUntilChanged() // Only emit when the current value is different than the last
    .subscribe(isAuthenticated => {
      this.logged = isAuthenticated;
    });
  }

  logout() {
    this.authService.logout();
  }

}
