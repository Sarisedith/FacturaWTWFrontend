import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FacturaCreacionDto } from '../../models/factura.model';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FacturaService {
  private base = `${environment.apiUrl}/api/Factura`;
  constructor(private http: HttpClient) {}
  crearFactura(payload: FacturaCreacionDto): Observable<any> { return this.http.post(`${this.base}/crearfactura`, payload); }
}