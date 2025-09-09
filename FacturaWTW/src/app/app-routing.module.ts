import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { ClienteListComponent } from './pages/clientes/cliente-list.component';
import { ProductoListComponent } from './pages/productos/producto-list.component';
import { FacturaCreateComponent } from './pages/factura/factura-create.component';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'clientes', component: ClienteListComponent, canActivate: [AuthGuard] },
  { path: 'productos', component: ProductoListComponent, canActivate: [AuthGuard] },
  { path: 'factura/crear', component: FacturaCreateComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: 'factura/crear', pathMatch: 'full' }
];

@NgModule({ imports: [RouterModule.forRoot(routes)], exports: [RouterModule] })
export class AppRoutingModule {}