import { Component, OnInit } from '@angular/core';
import { TipoClienteService } from '../../core/services/tipo-cliente.service';
import { Router } from '@angular/router';
@Component({ selector: 'app-tipos-list', template: `
  <div><h2>Tipos Cliente</h2><button mat-raised-button color="primary" (click)="nuevo()">Nuevo</button>
  <ul><li *ngFor="let t of tipos">{{t.id}} - {{t.tipoCliente}} <button (click)="editar(t.id)">Editar</button></li></ul></div>` })
export class TiposListComponent implements OnInit { tipos: any[] = []; constructor(private svc: TipoClienteService, private router: Router) {} ngOnInit(){ this.svc.obtenerTodos().subscribe(r=>this.tipos=r); } nuevo(){ this.router.navigate(['/tipos/nuevo']); } editar(id:number){ this.router.navigate(['/tipos',id]); } }
