import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatPaginatorModule } from '@angular/material/paginator';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ProductosListComponent } from './pages/productos-list/productos-list.component';
import { ProductoFormComponent } from './pages/producto-form/producto-form.component';
import { TiposListComponent } from './pages/tipos-list/tipos-list.component';
import { TipoFormComponent } from './pages/tipo-form/tipo-form.component';
import { FacturasListComponent } from './pages/facturas-list/facturas-list.component';
import { FacturaFormComponent } from './pages/factura-form/factura-form.component';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';

@NgModule({
  declarations: [AppComponent, ProductosListComponent, ProductoFormComponent, TiposListComponent, TipoFormComponent, FacturasListComponent, FacturaFormComponent],
  imports: [BrowserModule, HttpClientModule, ReactiveFormsModule, BrowserAnimationsModule, MatToolbarModule, MatButtonModule, MatIconModule, MatTableModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatSnackBarModule, MatPaginatorModule, AppRoutingModule],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
