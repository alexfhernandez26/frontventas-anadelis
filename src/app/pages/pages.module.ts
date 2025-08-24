import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { VentasComponent } from './ventas/ventas.component';
import { ProductosComponent } from './productos/productos.component';
import { ClientesComponent } from './clientes/clientes.component';
import { FacturasComponent } from './facturas/facturas.component';
import { InventariosComponent } from './inventarios/inventarios.component';

// Import existing modules
import { DashboardModule } from './dashboard/dashboard.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { ThemeModule } from '../@theme/theme.module';

import {
  NbCardModule,
  NbButtonModule,
  NbInputModule,
  NbSelectModule,
  NbDatepickerModule,
  NbIconModule,
  NbTableModule,
  NbUserModule,
  NbDialogModule,
  NbProgressBarModule,
  NbMenuModule,
  NbLayoutModule,
  NbSidebarModule,
} from '@nebular/theme';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PagesRoutingModule,
    ThemeModule,
    DashboardModule,
    MiscellaneousModule,
    NbCardModule,
    NbButtonModule,
    NbInputModule,
    NbSelectModule,
    NbDatepickerModule,
    NbIconModule,
    NbTableModule,
    NbUserModule,
    NbDialogModule,
    NbProgressBarModule,
    NbMenuModule,
    NbLayoutModule,
    NbSidebarModule,
  ],
  declarations: [
    PagesComponent,
    VentasComponent,
    ProductosComponent,
    ClientesComponent,
    FacturasComponent,
    InventariosComponent,
  ],
})
export class PagesModule {
}
