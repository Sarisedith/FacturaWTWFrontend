import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../../models/producto.model';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProductoService {
  private base = `${environment.apiUrl}/api/Producto`;
  constructor(private http: HttpClient) {}
  getAll(): Observable<Producto[]> { return this.http.get<Producto[]>(this.base); }
}