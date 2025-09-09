import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private base = environment.apiBaseUrl + '/auth';
  constructor(private http: HttpClient) {}
  login(user: string, password: string): Observable<any> {
    return this.http.post<any>(this.base + '/login', { user, password }).pipe(tap(res => { if (res && res.token) localStorage.setItem('jwt_token', res.token); }));
  }
  logout() { localStorage.removeItem('jwt_token'); }
  getToken(): string | null { return localStorage.getItem('jwt_token'); }
  isAuthenticated(): boolean { return !!this.getToken(); }
}
