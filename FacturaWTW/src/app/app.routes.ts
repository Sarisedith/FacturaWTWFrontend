import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { ClienteListComponent } from './pages/clientes/cliente-list.component';
import { ProductoListComponent } from './pages/productos/producto-list.component';
import { FacturaCreateComponent } from './pages/factura/factura-create.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'clientes', component: ClienteListComponent },
  { path: 'productos', component: ProductoListComponent },
  { path: 'factura/crear', component: FacturaCreateComponent },
  { path: '', redirectTo: 'factura/crear', pathMatch: 'full' }
];
