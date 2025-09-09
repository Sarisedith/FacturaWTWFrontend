import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormArray, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ClienteService } from '../../core/services/cliente.service';
import { ProductoService } from '../../core/services/producto.service';
import { FacturaService } from '../../core/services/factura.service';
import { FacturaCreacionDto } from 'src/app/models/factura.model';
import { CommonModule } from '@angular/common';

@Component({ selector: 'app-factura-create',standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule], templateUrl: './factura-create.component.html' })
export class FacturaCreateComponent implements OnInit {
  clientes: any[] = []; productos: any[] = [];
  facturaForm = this.fb.group({ numeroFactura: ['', Validators.required], clienteId: [null, Validators.required], detalles: this.fb.array([]) });
  get detalles() { return this.facturaForm.get('detalles') as FormArray; }
  constructor(private fb: FormBuilder, private clienteSvc: ClienteService, private productoSvc: ProductoService, private facturaSvc: FacturaService) {}
  ngOnInit() { this.clienteSvc.getAll().subscribe(c => this.clientes = c); this.productoSvc.getAll().subscribe(p => this.productos = p); this.addDetalle(); }
  addDetalle() { this.detalles.push(this.fb.group({ productoId:[null], cantidad:[1], precioUnitario:[0], total:[0] })); }
  guardar() {
    if (this.facturaForm.invalid) return;
    const payload = this.facturaForm.value as FacturaCreacionDto;
    this.facturaSvc.crearFactura(payload).subscribe(
      () => alert('Factura creada'),
      () => alert('Error')
    );
  }
}