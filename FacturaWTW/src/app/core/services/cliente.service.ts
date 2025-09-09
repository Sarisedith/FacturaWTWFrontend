import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cliente } from '../../models/cliente.model';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ClienteService {
  private base = `${environment.apiUrl}/api/Cliente`;
  constructor(private http: HttpClient) {}
  getAll(): Observable<Cliente[]> { return this.http.get<Cliente[]>(this.base); }
}