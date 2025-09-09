import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ProductoService } from 'src/app/core/services/producto.service';
import { Producto } from 'src/app/models/producto.model';

@Component({
  selector: 'app-producto-list',
  templateUrl: './producto-list.component.html',
  standalone: true,
  imports: [CommonModule] 
})
export class ProductoListComponent implements OnInit {
  productos: Producto[] = [];

  constructor(private svc: ProductoService, private router: Router) {}

  ngOnInit(): void {
    this.cargarProductos();
  }

  cargarProductos() {
    this.svc.getAll().subscribe({
      next: (res) => (this.productos = res),
      error: (err) => console.error('Error cargando productos', err),
    });
  }

  nuevo() {
    this.router.navigate(['/productos/nuevo']);
  }

  editar(id: number) {
    this.router.navigate(['/productos', id, 'editar']);
  }

  eliminar(id: number) {
    if (confirm('¿Seguro que deseas eliminar este producto?')) {
      this.svc.delete(id).subscribe({
        next: () => this.cargarProductos(),
        error: (err) => console.error('Error eliminando producto', err),
      });
    }
  }
}
