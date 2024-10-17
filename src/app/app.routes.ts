import { Routes } from '@angular/router';
import { DataTableComponent } from '@shared/data-table/data-table.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'login',
    canActivate: [AuthGuard],
    component: LoginComponent,
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    component: DataTableComponent,
    pathMatch: 'full',
  },
  { path: '**', redirectTo: 'dashboard', pathMatch: 'full' },
];
