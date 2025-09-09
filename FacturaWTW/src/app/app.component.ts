import { Component } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule],
  template: `
    <!-- Navbar -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm mb-4">
      <div class="container-fluid">
        <a class="navbar-brand fw-bold" routerLink="/">FacturaWTW</a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item">
              <a class="nav-link" routerLink="/login"><i class="bi bi-box-arrow-in-right"></i> Login</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" routerLink="/facturas"><i class="bi bi-receipt"></i> Facturas</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" routerLink="/clientes"><i class="bi bi-people"></i> Clientes</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" routerLink="/productos"><i class="bi bi-box-seam"></i> Productos</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <!-- Contenido principal -->
    <div class="container">
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [
    `
      .navbar-brand {
        font-size: 1.25rem;
        letter-spacing: 0.5px;
      }

      .nav-link {
        font-weight: 500;
        display: flex;
        align-items: center;
        gap: 4px;
      }

      .nav-link.active {
        font-weight: 600;
        text-decoration: underline;
      }
    `,
  ],
})
export class AppComponent {}
