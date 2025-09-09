import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../../core/services/cliente.service';
import { Cliente } from '../../models/cliente.model';

@Component({ selector: 'app-cliente-list', templateUrl: './cliente-list.component.html' })
export class ClienteListComponent implements OnInit {
  clientes: Cliente[] = [];
  constructor(private svc: ClienteService) {}
  ngOnInit() { this.svc.getAll().subscribe(c => this.clientes = c); }
}