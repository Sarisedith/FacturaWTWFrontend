import { Component, OnInit } from '@angular/core';
import { FacturaService } from '../../core/services/factura.service';
import { Router } from '@angular/router';
@Component({ selector: 'app-facturas-list', template: `
  <div><h2>Facturas</h2><button mat-raised-button color="primary" (click)="nuevo()">Nueva Factura</button>
  <ul><li *ngFor="let f of facturas">{{f.id}} - Cliente:{{f.idCliente}} - Total:{{f.totalFactura}} <button (click)="ver(f.id)">Ver</button></li></ul></div>` })
export class FacturasListComponent implements OnInit { facturas: any[] = []; constructor(private svc: FacturaService, private router: Router) {} ngOnInit(){ this.svc.obtenerTodos().subscribe(r=>this.facturas=r); } nuevo(){ this.router.navigate(['/facturas/nuevo']); } ver(id:number){ this.router.navigate(['/facturas',id]); } }
