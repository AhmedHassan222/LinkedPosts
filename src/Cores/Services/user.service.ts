import { HttpClient } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../Environment/Environment';
import { isPlatformBrowser } from '@angular/common';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly _HttpClent = inject(HttpClient);
  private platform = inject(PLATFORM_ID)

  isLoggin: BehaviorSubject<any> = new BehaviorSubject(null);
  userData: BehaviorSubject<any> = new BehaviorSubject(null);
  constructor() {
    if (isPlatformBrowser(this.platform)) {
      if (localStorage.getItem('userToken')) {
        this.saveUserData();
      }
    }
  }
  saveUserData():void{
    const token = localStorage.getItem('userToken');
    if (token) {
      try {
        this.isLoggin.next(true);
        this.userData.next(jwtDecode(token))
      } catch (error) {
        this.isLoggin.next(false);
      }
    }
  };
  // signUp *
  signUp(model: object): Observable<any> {
    return this._HttpClent.post(`${environment.baseUrl}/users/signup`, model)
  }
  // signIn
  signIn(model: object): Observable<any> {
    return this._HttpClent.post(`${environment.baseUrl}/users/signin`, model)
  }
  // change password
  changePassword(model: object): Observable<any> {
    return this._HttpClent.patch(`${environment.baseUrl}/users/change-password`, model, {
      headers: {
        token: localStorage.getItem('userToken') || ''
      }
    })
  }
  // upload profile photo
  uploadProfilePhoto(photo: FormData): Observable<any> {
    return this._HttpClent.put(`${environment.baseUrl}/users/upload-photo`, photo, {
      headers: {
        token: localStorage.getItem('userToken') || ''
      }
    })
  }
  // get user data
  getUserData(): Observable<any> {
    return this._HttpClent.get(`${environment.baseUrl}/users/profile-data`, {
      headers: {
        token: localStorage.getItem('userToken') || ''
      }
    })
  }
}
