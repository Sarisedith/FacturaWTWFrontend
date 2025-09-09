import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cliente } from '../../models/cliente.model';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ClienteService {
  private base = `${environment.apiUrl}/api/Cliente`;
  
  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  getAll(): Observable<Cliente[]> { 
    return this.http.get<Cliente[]>(this.base, { 
      headers: this.getHeaders() 
    }); 
  }
  getById(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.base}/${id}`, {
      headers: this.getHeaders()
    });
  }
  create(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(this.base, cliente, {
      headers: this.getHeaders()
    });
  }

  update(cliente: Cliente): Observable<void> {
    return this.http.put<void>(`${this.base}`, cliente, {
      headers: this.getHeaders()
    });
  }
}