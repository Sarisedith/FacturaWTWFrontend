import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
export interface Cliente { id: number; razonSocial: string; idTipoCliente: number; fechaCreacion: string; rfc: string; }
@Injectable({ providedIn: 'root' })
export class ClienteService {
  private base = environment.apiBaseUrl + '/cliente';
  constructor(private http: HttpClient) {}
  obtenerTodos(): Observable<Cliente[]> { return this.http.get<Cliente[]>(this.base); }
  obtenerPorId(id: number) { return this.http.get<Cliente>(`${this.base}/${id}`); }
  buscar(razonSocial?: string, rfc?: string, idTipoCliente?: number) { let params = new HttpParams(); if (razonSocial) params = params.set('razonSocial', razonSocial); if (rfc) params = params.set('rfc', rfc); if (idTipoCliente) params = params.set('idTipoCliente', idTipoCliente.toString()); return this.http.get<Cliente[]>(this.base + '/buscar', { params }); }
  crear(payload: any) { return this.http.post(this.base, payload); }
  actualizar(payload: any) { return this.http.put(this.base, payload); }
  eliminar(id: number) { return this.http.delete(`${this.base}/${id}`); }
}
