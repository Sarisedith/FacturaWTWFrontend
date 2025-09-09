import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
export interface DetalleFactura { idProducto: number; cantidadDeProducto: number; precioUnitarioProducto: number; subtotalProducto: number; notas?: string }
export interface Factura { id: number; fechaEmisionFactura: string; idCliente: number; numeroFactura: number; numeroTotalArticulos: number; subTotalFacturas: number; totalImpuestos: number; totalFactura: number; detalles: DetalleFactura[] }
export interface FacturaCrear { idCliente: number; numeroFactura: number; detalles: DetalleFactura[] }
@Injectable({ providedIn: 'root' })
export class FacturaService {
  private base = environment.apiBaseUrl + '/factura';
  constructor(private http: HttpClient) {}
  obtenerTodos(): Observable<Factura[]> { return this.http.get<Factura[]>(this.base); }
  obtenerPorId(id: number) { return this.http.get<Factura>(`${this.base}/${id}`); }
  buscar(clienteId?: number, facturaId?: number) { let params = new HttpParams(); if (clienteId) params = params.set('clienteId', clienteId.toString()); if (facturaId) params = params.set('facturaId', facturaId.toString()); return this.http.get<Factura[]>(this.base + '/buscar', { params }); }
  crear(payload: FacturaCrear) { return this.http.post(this.base, payload); }
}
