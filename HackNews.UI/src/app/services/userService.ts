import { Injectable } from '@angular/core';
import { GC_USER_ID } from '../constants/authConstants';

@Injectable()
export class USerService {

    private _userId: String;

    constructor() {
        this.fetchUserId();
    }

    get UserId (): String {
        if (this._userId) {
            return this._userId;
        }
    }

    fetchUserId() {
        let id = localStorage.getItem(GC_USER_ID);
        if (id) {
            this._userId = id;
        }
    }
}