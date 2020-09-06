import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';

import { ROUTES } from './app.routes';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ListEquipmentsComponent } from './pages/stock/equipments/list-equipments/list-equipments.component';
import { HomeComponent } from './pages/home/home.component';
import { MaintenancesComponent } from './pages/maintenances/maintenances.component';
import { RequestsComponent } from './pages/requests/requests.component';
import { CreateEquipmentComponent } from './pages/stock/equipments/create-equipment/create-equipment.component';
import { EditEquipmentComponent } from './pages/stock/equipments/edit-equipment/edit-equipment.component';
import { CreateRequestComponent } from './pages/requests/create-request/create-request.component';
import { EditRequestComponent } from './pages/requests/edit-request/edit-request.component';
import { EditMaintenanceComponent } from './pages/maintenances/edit-maintenance/edit-maintenance.component';
import { CreateMaintenanceComponent } from './pages/maintenances/create-maintenance/create-maintenance.component';
import { SectorsComponent } from './pages/admin/sectors/sectors.component';
import { CategoriesComponent } from './pages/admin/categories/categories.component';
import { UsersComponent } from './pages/admin/users/users.component';
import { CreateUsersComponent } from './pages/admin/users/create-users/create-users.component';
import { EditUsersComponent } from './pages/admin/users/edit-users/edit-users.component';
import { CreateCategoryComponent } from './pages/admin/categories/create-category/create-category.component';
import { EditCategoryComponent } from './pages/admin/categories/edit-category/edit-category.component';
import { CreateSectorComponent } from './pages/admin/sectors/create-sector/create-sector.component';
import { EditSectorComponent } from './pages/admin/sectors/edit-sector/edit-sector.component';
import { StockComponent } from './pages/stock/stock.component';
import { InvoicesComponent } from './pages/admin/invoices/invoices.component';
import { CreateInvoiceComponent } from './pages/admin/invoices/create-invoice/create-invoice.component';
import { EditInvoiceComponent } from './pages/admin/invoices/edit-invoice/edit-invoice.component';
import { ProvidersComponent } from './pages/admin/providers/providers.component';
import { CreateProviderComponent } from './pages/admin/providers/create-provider/create-provider.component';
import { EditProviderComponent } from './pages/admin/providers/edit-provider/edit-provider.component';
import { InputComponent } from './shared/input/input.component';
import { CategoriesService } from './pages/admin/categories/categories.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedModule } from './shared/shared.module';
import { SectorsService } from './pages/admin/sectors/sectors.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ListEquipmentsComponent,
    HomeComponent,
    MaintenancesComponent,
    RequestsComponent,
    CreateEquipmentComponent,
    EditEquipmentComponent,
    EditRequestComponent,
    CreateRequestComponent,
    EditMaintenanceComponent,
    CreateMaintenanceComponent,
    SectorsComponent,
    CategoriesComponent,
    UsersComponent,
    CreateUsersComponent,
    EditUsersComponent,
    CreateCategoryComponent,
    EditCategoryComponent,
    CreateSectorComponent,
    EditSectorComponent,
    StockComponent,
    InvoicesComponent,
    CreateInvoiceComponent,
    EditInvoiceComponent,
    ProvidersComponent,
    CreateProviderComponent,
    EditProviderComponent,
    InputComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    RouterModule.forRoot(ROUTES, {onSameUrlNavigation: 'reload'}),
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    ModalModule.forRoot(),
    SharedModule
  ],
  providers: [
    CategoriesService,
    SectorsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
