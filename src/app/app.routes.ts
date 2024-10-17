import { Routes } from '@angular/router';
import { DataTableComponent } from '@shared/data-table/data-table.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { PostFormComponent } from './admin/post-form/post-form.component';
import { AdminGuard } from './guards/admin.guard';

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
  {
    path: 'nueva-publicacion',
    canActivate: [AuthGuard, AdminGuard],
    component: PostFormComponent,
    pathMatch: 'full',
  },
  {
    path: 'edit-publicacion/:id',
    canActivate: [AuthGuard, AdminGuard],
    component: PostFormComponent,
    pathMatch: 'full',
  },
  { path: '**', redirectTo: 'dashboard', pathMatch: 'full' },
];
