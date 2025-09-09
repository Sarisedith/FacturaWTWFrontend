import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TipoClienteService } from '../../core/services/tipo-cliente.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({ selector: 'app-tipo-form', template: `
  <div style="max-width:600px;margin:16px auto"><h2>Tipo Cliente</h2>
  <form [formGroup]="form" (ngSubmit)="guardar()">
    <mat-form-field style="width:100%"><mat-label>Tipo Cliente</mat-label><input matInput formControlName="tipoCliente"></mat-form-field>
    <div><button mat-raised-button color="primary">Guardar</button></div>
  </form></div>` })
export class TipoFormComponent implements OnInit { form: FormGroup; esEd=false; constructor(private fb: FormBuilder, private svc: TipoClienteService, private route: ActivatedRoute, private router: Router, private snack: MatSnackBar){ this.form=this.fb.group({ id:[0], tipoCliente:[''] }); } ngOnInit(){ const id=Number(this.route.snapshot.paramMap.get('id')); if(id){ this.esEd=true; this.svc.obtenerPorId(id).subscribe(p=>this.form.patchValue(p)); } } guardar(){ const val=this.form.value; if(this.esEd){ this.svc.actualizar(val).subscribe(()=>{ this.snack.open('Actualizado','Cerrar',{duration:2000}); this.router.navigate(['/tipos']); }); } else { this.svc.crear(val).subscribe(()=>{ this.snack.open('Creado','Cerrar',{duration:2000}); this.router.navigate(['/tipos']); }); } } }
