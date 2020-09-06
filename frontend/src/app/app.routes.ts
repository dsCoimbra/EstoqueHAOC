import { EditSectorComponent } from './pages/admin/sectors/edit-sector/edit-sector.component';
import {Routes} from '@angular/router';

import { ListEquipmentsComponent } from './pages/stock/equipments/list-equipments/list-equipments.component'
import { HomeComponent } from './pages/home/home.component';
import { MaintenancesComponent } from './pages/maintenances/maintenances.component';
import { RequestsComponent } from './pages/requests/requests.component';
import { StockComponent } from './pages/stock/stock.component';
import { CategoriesComponent } from './pages/admin/categories/categories.component';
import { InvoicesComponent } from './pages/admin/invoices/invoices.component';
import { SectorsComponent } from './pages/admin/sectors/sectors.component';
import { UsersComponent } from './pages/admin/users/users.component';
import { ProvidersComponent } from './pages/admin/providers/providers.component'
import { CreateRequestComponent } from './pages/requests/create-request/create-request.component'
import { CreateMaintenanceComponent } from './pages/maintenances/create-maintenance/create-maintenance.component'
import { CreateCategoryComponent } from './pages/admin/categories/create-category/create-category.component'
import { CreateInvoiceComponent } from './pages/admin/invoices/create-invoice/create-invoice.component'
import { CreateProviderComponent } from './pages/admin/providers/create-provider/create-provider.component'
import { CreateSectorComponent } from './pages/admin/sectors/create-sector/create-sector.component';
import { CreateUsersComponent } from './pages/admin/users/create-users/create-users.component'
import { EditCategoryComponent } from './pages/admin/categories/edit-category/edit-category.component'

export const ROUTES: Routes = [
    {path: '', component: HomeComponent},
    {path: 'stock', component: StockComponent, runGuardsAndResolvers: 'always'},
    {path: 'maintenances', component: MaintenancesComponent},
    {path: 'maintenance/new', component: CreateMaintenanceComponent},
    {path: 'requests', component: RequestsComponent},
    {path: 'request/new', component: CreateRequestComponent},
    {path: 'admin/categories', component: CategoriesComponent},
    {path: 'admin/category/new', component: CreateCategoryComponent},
    {path: 'admin/category/:id', component: EditCategoryComponent},
    {path: 'admin/invoices', component: InvoicesComponent},
    {path: 'admin/invoice/new', component: CreateInvoiceComponent},
    {path: 'admin/sectors', component: SectorsComponent},
    {path: 'admin/sector/new', component: CreateSectorComponent},
    {path: 'admin/sector/:id', component: EditSectorComponent},
    {path: 'admin/users', component: UsersComponent},
    {path: 'admin/user/new', component: CreateUsersComponent},
    {path: 'admin/providers', component: ProvidersComponent},
    {path: 'admin/provider/new', component: CreateProviderComponent},
]
