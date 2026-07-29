import { Component, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonNote, IonTextarea, IonText, IonTitle, IonToolbar, ToastController } from '@ionic/angular/standalone';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { firstValueFrom } from 'rxjs';
import { TareasService } from '../../services/tareas';
import { Tarea } from '../../models/tarea';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.page.html',
  styleUrls: ['./formulario.page.scss'],
  standalone: true,
  imports: [NgIf, ReactiveFormsModule, IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonNote, IonTextarea, IonText, IonTitle, IonToolbar, TranslatePipe]
})
export class FormularioPage implements OnInit {
  tareaForm: FormGroup;
  tareaIdEdicion: string | null = null;

  constructor(
    private fb: FormBuilder,
    private tareasService: TareasService,
    private router: Router,
    private route: ActivatedRoute,
    private toastController: ToastController,
    private translateService: TranslateService
  ) {
    this.tareaForm = this.fb.group({
      titulo: ['', [Validators.required, Validators.minLength(3)]],
      descripcion: [''],
      completada: [false]
    });
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['id']) {
        this.tareaIdEdicion = params['id'];
        this.cargarTareaParaEdicion(this.tareaIdEdicion!);
      }
    });
  }

  cargarTareaParaEdicion(id: string) {
    const tarea = this.tareasService.getTareaById(id);
    if (tarea) {
      this.tareaForm.patchValue({
        titulo: tarea.titulo,
        descripcion: tarea.descripcion,
        completada: tarea.completada
      });
    }
  }

  async guardarTarea() {
    if (this.tareaForm.valid) {
      const datosFormulario = this.tareaForm.value;

      if (this.tareaIdEdicion) {
        const tareaActualizada: Tarea = {
          id: this.tareaIdEdicion,
          ...datosFormulario
        };
        this.tareasService.updateTarea(tareaActualizada);
        await this.mostrarMensaje('FORM.UPDATED', 'success');
      } else {
        const nuevaTarea: Tarea = {
          id: '',
          ...datosFormulario
        };
        this.tareasService.addTarea(nuevaTarea);
        await this.mostrarMensaje('FORM.CREATED', 'success');
      }

      this.tareaForm.reset({ titulo: '', descripcion: '', completada: false });
      this.router.navigate(['/lista']);
    } else {
      await this.mostrarMensaje('FORM.INVALID', 'danger');
    }
  }

  private async mostrarMensaje(clave: string, color: 'success' | 'danger') {
    const mensaje = await firstValueFrom(this.translateService.get(clave));
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,
      color: color,
      position: 'bottom'
    });
    await toast.present();
  }

  cambiarIdioma(idioma: 'es' | 'en') {
    this.translateService.use(idioma);
    localStorage.setItem('app_lang', idioma);
  }
}