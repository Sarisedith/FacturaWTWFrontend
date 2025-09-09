import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { ClientesListComponent } from './pages/clientes-list/clientes-list.component';
import { ClienteFormComponent } from './pages/cliente-form/cliente-form.component';
import { ProductosListComponent } from './pages/productos-list/productos-list.component';
import { ProductoFormComponent } from './pages/producto-form/producto-form.component';
import { TiposListComponent } from './pages/tipos-list/tipos-list.component';
import { TipoFormComponent } from './pages/tipo-form/tipo-form.component';
import { FacturasListComponent } from './pages/facturas-list/facturas-list.component';
import { FacturaFormComponent } from './pages/factura-form/factura-form.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'clientes', component: ClientesListComponent },
  { path: 'clientes/nuevo', component: ClienteFormComponent },
  { path: 'clientes/:id', component: ClienteFormComponent },
  { path: 'productos', component: ProductosListComponent },
  { path: 'productos/nuevo', component: ProductoFormComponent },
  { path: 'productos/:id', component: ProductoFormComponent },
  { path: 'tipos', component: TiposListComponent },
  { path: 'tipos/nuevo', component: TipoFormComponent },
  { path: 'tipos/:id', component: TipoFormComponent },
  { path: 'facturas', component: FacturasListComponent },
  { path: 'facturas/nuevo', component: FacturaFormComponent },
  { path: 'facturas/:id', component: FacturaFormComponent },
  { path: '', redirectTo: 'clientes', pathMatch: 'full' }
];

@NgModule({ imports: [RouterModule.forRoot(routes)], exports: [RouterModule] })
export class AppRoutingModule { }
