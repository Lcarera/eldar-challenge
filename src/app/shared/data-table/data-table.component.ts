import {
  Component,
  inject,
  OnInit,
  WritableSignal,
} from '@angular/core';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { Publicacion } from '@domain/publicacion.class';
import { PublicacionService } from '@services/publicacion/publicacion.service';
import { AuthService } from '@services/auth/auth.service';

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [
    TableModule,
    ButtonModule,
    InputTextModule,
    InputIconModule,
    IconFieldModule,
  ],
  providers: [PublicacionService],
  templateUrl: './data-table.component.html',
  styleUrl: './data-table.component.scss',
})
export class DataTableComponent implements OnInit {
  constructor() {}

  private publicacionService = inject(PublicacionService);
  private authService = inject(AuthService);

  public publicaciones: WritableSignal<Publicacion[]> =
    this.publicacionService.getPublicaciones();
  public currentUserIsAdmin: boolean = false;

  ngOnInit(): void {
    this.publicacionService.fetch();
    this.currentUserIsAdmin = this.authService.checkIfUserIsAdmin();
  }

  public filtroEvento(event: any): string {
    if (event.target) return event.target.value;
    return '';
  }
}
