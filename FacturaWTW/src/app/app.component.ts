import { Component } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule],
  template: `
    <nav class="navbar navbar-expand-lg navbar-light bg-light mb-3">
      <a class="navbar-brand" routerLink="/">FacturaWTW</a>
      <ul class="navbar-nav">
        <li class="nav-item"><a class="nav-link" routerLink="/factura/crear">Crear Factura</a></li>
        <li class="nav-item"><a class="nav-link" routerLink="/clientes">Clientes</a></li>
        <li class="nav-item"><a class="nav-link" routerLink="/productos">Productos</a></li>
        <li class="nav-item"><a class="nav-link" routerLink="/login">Login</a></li>
      </ul>
    </nav>

    <div class="container">
      <router-outlet></router-outlet>
    </div>
  `
})
export class AppComponent {}
