import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

export interface IAuth {
  message: string;
  data: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public _isLoggedIn$ = new BehaviorSubject<boolean>(false);

  isLoggedIn$ = this._isLoggedIn$.asObservable();

  private url: string = 'http://localhost:3000/user/login';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<IAuth> {
    return this.http
      .post<IAuth>(this.url, {
        username: username,
        password: password,
      })
      .pipe(
        tap((response: any) => {
          this._isLoggedIn$.next(true);
          console.log('akki respo', response); //here response will hold just username, and not password
        })
      );
  }

  logout() {
    this._isLoggedIn$.next(false);
    localStorage.removeItem('authToken');
    localStorage.removeItem('_id');
  }
}
