import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Factura, FacturaCreateDTO } from '../../models/factura.model';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FacturaService {
  private base = `${environment.apiUrl}/api/Factura`;
  
  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  crearFactura(payload: FacturaCreateDTO): Observable<any> { 
    return this.http.post(`${this.base}/crearfactura`, payload, { 
      headers: this.getHeaders() 
    }); 
  }
   getAll(): Observable<Factura[]> {
    return this.http.get<Factura[]>(`${this.base}/buscar`, { headers: this.getHeaders() });
  }

  getById(id: number): Observable<Factura> {
    return this.http.get<Factura>(`${this.base}/${id}`, { headers: this.getHeaders() });
  }

  update(dto: FacturaCreateDTO): Observable<void> {
    return this.http.put<void>(`${this.base}`, dto, { headers: this.getHeaders() });
  }
}