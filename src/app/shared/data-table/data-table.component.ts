import {
  Component,
  inject,
  Input,
  OnInit,
  WritableSignal,
} from '@angular/core';
import { Rol } from '@domain/rol.enum';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { Publicacion } from '@domain/publicacion.class';
import { PublicacionService } from '@services/publicacion/publicacion.service';

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
  @Input() rol: Rol = Rol.USER;

  private publicacionService = inject(PublicacionService);
  public publicaciones: WritableSignal<Publicacion[]> =
    this.publicacionService.getPublicaciones();

  ngOnInit(): void {
    this.publicacionService.fetch();
  }

  public filtroEvento(event: any): string {
    if (event.target) return event.target.value;
    return '';
  }
}
