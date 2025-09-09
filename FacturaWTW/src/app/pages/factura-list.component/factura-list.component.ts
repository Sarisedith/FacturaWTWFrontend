import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FacturaService } from '../../core/services/factura.service';
import { Factura } from '../../models/factura.model';

@Component({
  selector: 'app-factura-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './factura-list.component.html',
})
export class FacturaListComponent implements OnInit {
  facturas: Factura[] = [];

  constructor(private facturaSvc: FacturaService, private router: Router) {}

  ngOnInit() {
    this.cargarFacturas();
  }

  cargarFacturas() {
    this.facturaSvc.getAll().subscribe({
      next: (res) => (this.facturas = res),
      error: (err) => console.error('Error cargando facturas', err),
    });
  }

  nuevaFactura() {
    this.router.navigate(['/facturas/nueva']);
  }

  editar(id: number) {
    this.router.navigate(['/facturas/editar', id]);
  }
}
