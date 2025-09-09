import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
export interface Producto { id: number; nombreProducto: string; precioUnitario: number; ext?: string }
@Injectable({ providedIn: 'root' })
export class ProductoService {
  private base = environment.apiBaseUrl + '/producto';
  constructor(private http: HttpClient) {}
  obtenerTodos(): Observable<Producto[]> { return this.http.get<Producto[]>(this.base); }
  obtenerPorId(id: number) { return this.http.get<Producto>(`${this.base}/${id}`); }
  crear(payload: any) { return this.http.post(this.base, payload); }
  actualizar(payload: any) { return this.http.put(this.base, payload); }
  eliminar(id: number) { return this.http.delete(`${this.base}/${id}`); }
}
