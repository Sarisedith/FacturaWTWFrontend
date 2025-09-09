import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormArray,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteService } from '../../core/services/cliente.service';
import { ProductoService } from '../../core/services/producto.service';
import { FacturaService } from '../../core/services/factura.service';
import { Factura, FacturaCreateDTO } from 'src/app/models/factura.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-factura-create',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './factura-create.component.html',
})
export class FacturaCreateComponent implements OnInit {
  clientes: any[] = [];
  productos: any[] = [];
  totalFactura = 0;
  facturaId?: number;

  facturaForm = this.fb.group({
    NumeroFactura: [0, Validators.required],
    IdCliente: [0, Validators.required],
    Detalles: this.fb.array([]),
  });

  get detalles() {
    return this.facturaForm.get('Detalles') as FormArray;
  }

  constructor(
    private fb: FormBuilder,
    private clienteSvc: ClienteService,
    private productoSvc: ProductoService,
    private facturaSvc: FacturaService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.clienteSvc.getAll().subscribe((c) => (this.clientes = c));
    this.productoSvc.getAll().subscribe((p) => (this.productos = p));

    this.facturaId = Number(this.route.snapshot.paramMap.get('id'));

    if (this.facturaId) {
      this.cargarFactura(this.facturaId);
    } else {
      this.addDetalle(); 
    }
  }

  addDetalle(detalleData?: any) {
    const detalleGroup = this.fb.group({
      IdProducto: [detalleData?.IdProducto || 0, Validators.required],
      CantidadDeProducto: [detalleData?.CantidadDeProducto || 1, [Validators.required, Validators.min(1)]],
      PrecioUnitarioProducto: [detalleData?.PrecioUnitarioProducto || 0, [Validators.required, Validators.min(0)]],
      SubtotalProducto: [detalleData?.SubtotalProducto || 0],
    });

    detalleGroup.valueChanges.subscribe((val) => {
      const subtotal =
        (val.CantidadDeProducto || 0) * (val.PrecioUnitarioProducto || 0);
      detalleGroup.get('SubtotalProducto')?.setValue(subtotal, {
        emitEvent: false,
      });
      this.calcularTotal();
    });

    this.detalles.push(detalleGroup);
  }

  cargarFactura(id: number) {
    this.facturaSvc.getById(id).subscribe({
      next: (factura: Factura) => {
        this.facturaForm.patchValue({
          NumeroFactura: factura.NumeroFactura,
          IdCliente: factura.IdCliente,
        });

        this.detalles.clear();
        factura.Detalles.forEach((d) => this.addDetalle(d));

        this.calcularTotal();
      },
      error: (err) => console.error('Error cargando factura', err),
    });
  }

  calcularTotal() {
    this.totalFactura = this.detalles.controls
      .map((d) => d.get('SubtotalProducto')?.value || 0)
      .reduce((a, b) => a + b, 0);
  }
  cancelar() {
    this.router.navigate(['/facturas']);
  }

  guardar() {
    if (this.facturaForm.invalid) return;

    const payload = this.facturaForm.value as FacturaCreateDTO;

    if (this.facturaId) {
      this.facturaSvc.update(payload).subscribe({
        next: () => {
          alert('Factura actualizada');
          this.router.navigate(['/facturas']);
        },
        error: (err) => {
          console.error('Error al actualizar factura', err);
          alert('Error al actualizar factura');
        },
      });
    } else {
      this.facturaSvc.crearFactura(payload).subscribe({
        next: () => {
          alert('Factura creada');
          this.router.navigate(['/facturas']);
        },
        error: (err) => {
          console.error('Error al crear factura', err);
          alert('Error al crear factura');
        },
      });
    }
  }
}
