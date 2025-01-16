import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../Environment/Environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly _HttpClent = inject(HttpClient);
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
  getUserData(photo: FormData): Observable<any> {
    return this._HttpClent.get(`${environment.baseUrl}/users/profile-data`, {
      headers: {
        token: localStorage.getItem('userToken') || ''
      }
    })
  }
}
