import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { ClienteService } from '../../core/services/cliente.service';
import { TipoClienteService } from '../../core/services/tipocliente.service';
import { Cliente } from '../../models/cliente.model';
import { TipoCliente } from '../../models/tipocliente.model';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-cliente-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './cliente-form.component.html',
})
export class ClienteFormComponent implements OnInit, OnDestroy {
  form = this.fb.group({
    Id: [0],
    RazonSocial: ['', [Validators.required, Validators.maxLength(200)]],
    IdTipoCliente: [0, Validators.required],
    RFC: ['', Validators.maxLength(50)]
  });

  tipoclientes: TipoCliente[] = [];
  isEdit = false;
  loading = false;
  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private svc: ClienteService,
    private tipoSvc: TipoClienteService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.tipoSvc.getAll()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (t) => this.tipoclientes = t,
        error: (err) => console.error('Error cargando tipos:', err)
      });

    this.route.paramMap
      .pipe(takeUntil(this.destroy$))
      .subscribe(params => {
        const idParam = params.get('id');
        if (idParam) {
          this.isEdit = true;
          this.loadCliente(+idParam);
        } else {
          this.isEdit = false;
        }
      });
  }

 private loadCliente(id: number) {
  this.loading = true;
  this.svc.getById(id)
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (cliente: Cliente) => {
        this.form.patchValue(cliente);
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al cargar cliente', err);
        alert('No se pudo cargar el cliente. Revisa la consola.');
        this.loading = false;
      }
    });
}

  save() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;
    const cliente = this.form.value as Cliente;
    debugger;
    if (this.isEdit && cliente.Id) {
      this.svc.update(cliente)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => {
            this.loading = false;
            alert('Cliente actualizado.');
            this.router.navigate(['/clientes']);
          },
          error: (err) => {
            console.error('Error actualizando', err);
            alert('Error al actualizar cliente.');
            this.loading = false;
          }
        });
    } else {
      if (cliente.Id === 0) delete cliente.Id;
      this.svc.create(cliente)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => {
            this.loading = false;
            alert('Cliente creado.');
            this.router.navigate(['/clientes']);
          },
          error: (err) => {
            console.error('Error creando', err);
            alert('Error al crear cliente.');
            this.loading = false;
          }
        });
    }
  }

  cancelar() {
    this.router.navigate(['/clientes']);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  campo(controlName: string) {
    return this.form.get(controlName);
  }
}
