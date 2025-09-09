import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { FacturaService } from '../../core/services/factura.service';
import { ClienteService } from '../../core/services/cliente.service';
import { ProductoService } from '../../core/services/producto.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({ selector: 'app-factura-form', template: `
  <div style="max-width:900px;margin:16px auto"><h2>Crear Factura</h2>
  <form [formGroup]="form" (ngSubmit)="guardar()">
    <mat-form-field style="width:100%"><mat-label>Cliente Id</mat-label><input matInput formControlName="idCliente" type="number"></mat-form-field>
    <mat-form-field style="width:100%"><mat-label>Numero Factura</mat-label><input matInput formControlName="numeroFactura" type="number"></mat-form-field>
    <div formArrayName="detalles">
      <div *ngFor="let d of detalles.controls; let i=index" [formGroupName]="i" style="display:flex;gap:8px;margin-bottom:8px;">
        <input matInput placeholder="ProductoId" formControlName="idProducto" type="number" />
        <input matInput placeholder="Cantidad" formControlName="cantidadDeProducto" type="number" />
        <input matInput placeholder="Precio" formControlName="precioUnitarioProducto" type="number" />
        <button mat-button type="button" (click)="quitar(i)">Quitar</button>
      </div>
    </div>
    <button mat-button type="button" (click)="agregar()">Agregar detalle</button>
    <div style="margin-top:12px"><button mat-raised-button color="primary" type="submit">Crear</button></div>
  </form></div>` })
export class FacturaFormComponent implements OnInit { form: FormGroup; constructor(private fb: FormBuilder, private svc: FacturaService, private clienteSvc: ClienteService, private prodSvc: ProductoService, private router: Router, private snack: MatSnackBar){ this.form=this.fb.group({ idCliente:[0], numeroFactura:[1], detalles:this.fb.array([]) }); } ngOnInit(){ this.agregar(); } get detalles(){ return this.form.get('detalles') as FormArray; } agregar(){ this.detalles.push(this.fb.group({ idProducto:[0], cantidadDeProducto:[1], precioUnitarioProducto:[0], subtotalProducto:[0], notas:[''] })); } quitar(i:number){ this.detalles.removeAt(i); } guardar(){ const payload = { idCliente: this.form.value.idCliente, numeroFactura: this.form.value.numeroFactura, detalles: this.form.value.detalles }; this.svc.crear(payload).subscribe(()=>{ this.snack.open('Factura creada','Cerrar',{duration:2000}); this.router.navigate(['/facturas']); }, ()=> this.snack.open('Error','Cerrar',{duration:3000})); } }
