import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductoService } from 'src/app/core/services/producto.service';
import { Producto } from 'src/app/models/producto.model';

@Component({
  selector: 'app-producto-form',
  templateUrl: './producto-form.component.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
})
export class ProductoFormComponent implements OnInit {
  isEdit = false;
  productoId?: number;
  loading = false; 

  form = this.fb.group({
    Id: [0],
    NombreProducto: ['', [Validators.required, Validators.maxLength(200)]],
    PrecioUnitario: [0, [Validators.required, Validators.min(0)]],
    Ext: ['', [Validators.maxLength(100)]],
  });

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private svc: ProductoService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.isEdit = true;
        this.productoId = +id;
        this.cargarProducto(this.productoId);
      }
    });
  }

  cargarProducto(id: number) {
    this.loading = true;
    this.svc.getById(id).subscribe({
      next: (prod) => {
        if (prod) {
          this.form.patchValue(prod);
        }
        this.loading = false;
      },
      error: (err) => {
        console.error('Error cargando producto', err);
        this.loading = false;
      },
    });
  }

  save() {
    if (this.form.invalid) return;

    this.loading = true;
    const producto: Producto = this.form.value as Producto;

    const request = this.isEdit
      ? this.svc.update(producto)
      : this.svc.create(producto);

    request.subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/productos']);
      },
      error: (err) => {
        console.error('Error guardando producto', err);
        this.loading = false;
      },
    });
  }

  cancelar() {
    this.router.navigate(['/productos']);
  }

  campo(nombre: string) {
    return this.form.get(nombre);
  }
}
