import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../core/services/producto.service';
import { Producto } from '../../models/producto.model';

@Component({ selector: 'app-producto-list', templateUrl: './producto-list.component.html' })
export class ProductoListComponent implements OnInit {
  productos: Producto[] = [];
  constructor(private svc: ProductoService) {}
  ngOnInit() { this.svc.getAll().subscribe(p => this.productos = p); }
}