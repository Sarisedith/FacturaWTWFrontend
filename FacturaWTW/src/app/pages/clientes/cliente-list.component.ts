import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../../core/services/cliente.service';
import { Cliente } from '../../models/cliente.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-cliente-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cliente-list.component.html'
})
export class ClienteListComponent implements OnInit {
  clientes: Cliente[] = [];

  constructor(private svc: ClienteService) {}

  ngOnInit() {
    this.loadClientes();
  }

  loadClientes() {
    this.svc.getAll().subscribe(c => this.clientes = c);
  }
}
