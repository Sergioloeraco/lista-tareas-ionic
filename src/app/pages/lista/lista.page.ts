import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonList, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { TranslatePipe } from '@ngx-translate/core';
import { TarjetaTareaComponent } from '../../components/tarjeta-tarea/tarjeta-tarea.component';
import { TareasService } from '../../services/tareas';
import { Tarea } from '../../models/tarea';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.page.html',
  styleUrls: ['./lista.page.scss'],
  standalone: true,
  imports: [NgFor, NgIf, IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonList, IonTitle, IonToolbar, RouterLink, TranslatePipe, TarjetaTareaComponent]
})
export class ListaPage {
  tareas: Tarea[] = [];

  constructor(
    private tareasService: TareasService,
    private router: Router,
    private translateService: TranslateService
  ) {}

  // Se ejecuta cada vez que la vista va a entrar (útil para refrescar datos)
  ionViewWillEnter() {
    this.cargarTareas();
  }

  cargarTareas() {
    this.tareas = this.tareasService.getTareas();
  }

  actualizarEstado(tarea: Tarea) {
    this.tareasService.updateTarea(tarea);
    this.cargarTareas();
  }

  eliminarTarea(id: string) {
    this.tareasService.deleteTarea(id);
    this.cargarTareas();
  }

  editarTarea(id: string) {
    this.router.navigate(['/formulario'], { queryParams: { id: id } });
  }

  cambiarIdioma(idioma: 'es' | 'en') {
    this.translateService.use(idioma);
    localStorage.setItem('app_lang', idioma);
  }
}