import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../core/services/producto.service';
import { Router } from '@angular/router';
@Component({ selector: 'app-productos-list', template: `
  <div><h2>Productos</h2><button mat-raised-button color="primary" (click)="nuevo()">Nuevo</button>
  <table mat-table [dataSource]="productos" style="width:100%"><tr *ngFor="let p of productos"><td>{{p.id}}</td><td>{{p.nombreProducto}}</td><td>{{p.precioUnitario}}</td><td><button mat-button (click)="editar(p.id)">Editar</button></td></tr></table></div>` })
export class ProductosListComponent implements OnInit { productos: any[] = []; constructor(private svc: ProductoService, private router: Router) {} ngOnInit(){ this.svc.obtenerTodos().subscribe(r=>this.productos=r); } nuevo(){ this.router.navigate(['/productos/nuevo']); } editar(id:number){ this.router.navigate(['/productos',id]); } }
