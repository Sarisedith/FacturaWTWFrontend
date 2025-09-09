import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { TipoCliente } from 'src/app/models/tipocliente.model';

@Injectable({ providedIn: 'root' })
export class TipoClienteService {
  private base = `${environment.apiUrl}/api/TipoCliente`;
  
  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  getAll(): Observable<TipoCliente[]> { 
    return this.http.get<TipoCliente[]>(this.base, { 
      headers: this.getHeaders() 
    }); 
  }
}