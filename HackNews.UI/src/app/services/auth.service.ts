import { Injectable } from '@angular/core';
import { GC_USER_ID, GC_AUTH_TOKEN } from '../constants/authConstants';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class AuthService {

    private userId: string = null;
    
      // 3
      private _isAuthenticated = new BehaviorSubject(false);
    
      constructor() {
      }

      // 4
      get isAuthenticated(): Observable<boolean> {
        return this._isAuthenticated.asObservable();
      }
      // 5
      saveUserData(id: string, token: string) {
    
        localStorage.setItem(GC_USER_ID, id);
        localStorage.setItem(GC_AUTH_TOKEN, token);
        this.setUserId(id);
      }
    
      // 6
      setUserId(id: string) {
        this.userId = id;
    
        this._isAuthenticated.next(true);
      }
      // 7
      logout() {
        localStorage.removeItem(GC_USER_ID);
        localStorage.removeItem(GC_AUTH_TOKEN);
        this.userId = null;
    
        this._isAuthenticated.next(false);
      }
    
      // 8
      autoLogin() {
        const id = localStorage.getItem(GC_USER_ID);
    
        if (id) {
          this.setUserId(id);
        }
      }

}