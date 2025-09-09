import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { LoginRequest, LoginResponse } from '../../models/auth.model';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private base = `${environment.apiUrl}/api/Auth`;
  constructor(private http: HttpClient) {}

  login(payload: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.base}/login`, payload).pipe(
      map(res => { 
        if (res && res.token) { 
          localStorage.setItem('token', res.token); 
        } else {
          throw new Error('No se recibió token en la respuesta');
        }
        return res; 
      })
    );
  }

  logout() { localStorage.removeItem('token'); }
  
  isAuthenticated() { 
    const token = localStorage.getItem('token');
    return !!token && token !== 'null' && token !== 'undefined';
  }

  getToken(): string | null {
    const token = localStorage.getItem('token');
    return token && token !== 'null' && token !== 'undefined' ? token : null;
  }
}