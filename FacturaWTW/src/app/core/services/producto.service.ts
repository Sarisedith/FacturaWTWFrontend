import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Producto } from '../../models/producto.model';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProductoService {
  private base = `${environment.apiUrl}/api/Producto`;
  
  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  getAll(): Observable<Producto[]> { 
    return this.http.get<Producto[]>(this.base, { 
      headers: this.getHeaders() 
    }); 
  }

  getById(id: number): Observable<Producto> {
    return this.http.get<Producto>(`${this.base}/${id}`, { headers: this.getHeaders() });
  }

  create(prod: Producto): Observable<Producto> {
    return this.http.post<Producto>(this.base, prod, {
      headers: this.getHeaders()
    });
  }

  update(prod: Producto): Observable<Producto> {
    return this.http.put<Producto>(`${this.base}`, prod, {
      headers: this.getHeaders()
    });
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.base}/${id}`, { headers: this.getHeaders() });
  }
}