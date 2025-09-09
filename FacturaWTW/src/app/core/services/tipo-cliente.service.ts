import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
export interface TipoCliente { id: number; tipoCliente: string }
@Injectable({ providedIn: 'root' })
export class TipoClienteService {
  private base = environment.apiBaseUrl + '/catTipoCliente';
  constructor(private http: HttpClient) {}
  obtenerTodos(): Observable<TipoCliente[]> { return this.http.get<TipoCliente[]>(this.base); }
  obtenerPorId(id: number) { return this.http.get<TipoCliente>(`${this.base}/${id}`); }
  crear(payload: any) { return this.http.post(this.base, payload); }
  actualizar(payload: any) { return this.http.put(this.base, payload); }
  eliminar(id: number) { return this.http.delete(`${this.base}/${id}`); }
}
