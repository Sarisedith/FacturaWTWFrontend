import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { ClienteListComponent } from './pages/clientes/cliente-list.component';
import { ProductoListComponent } from './pages/productos/producto-list.component';
import { FacturaCreateComponent } from './pages/factura/factura-create.component';
import { ClienteFormComponent } from './pages/cliente-form/cliente-form.component';
import { ProductoFormComponent } from './pages/producto-form.component/producto-form.component';
import { FacturaListComponent } from './pages/factura-list.component/factura-list.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'clientes', component: ClienteListComponent },
  { path: 'productos', component: ProductoListComponent },
  { path: 'facturas', component: FacturaListComponent },
  { path: 'facturas/nueva', component: FacturaCreateComponent },
  { path: 'facturas/editar/:id', component: FacturaCreateComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'clientes/nuevo', component: ClienteFormComponent },
  { path: 'clientes/:id/editar', component: ClienteFormComponent },
  { path: 'productos/nuevo', component: ProductoFormComponent },
  { path: 'productos/:id/editar', component: ProductoFormComponent }
];
