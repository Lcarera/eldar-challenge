import { Routes } from '@angular/router';
import { DataTableComponent } from '@shared/data-table/data-table.component';

export const routes: Routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: DataTableComponent, pathMatch: 'full' },
];
