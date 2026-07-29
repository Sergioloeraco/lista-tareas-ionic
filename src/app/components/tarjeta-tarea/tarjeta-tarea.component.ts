import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IonCheckbox, IonIcon, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel } from '@ionic/angular/standalone';
import { TranslatePipe } from '@ngx-translate/core';
import { Tarea } from '../../models/tarea';

@Component({
  selector: 'app-tarjeta-tarea',
  templateUrl: './tarjeta-tarea.component.html',
  styleUrls: ['./tarjeta-tarea.component.scss'],
  standalone: true,
  imports: [IonCheckbox, IonIcon, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, TranslatePipe],
})
export class TarjetaTareaComponent {
  @Input({ required: true }) tarea!: Tarea;
  @Output() toggled = new EventEmitter<Tarea>();
  @Output() edit = new EventEmitter<string>();
  @Output() delete = new EventEmitter<string>();

  onToggleCompleted(checked: boolean) {
    this.toggled.emit({ ...this.tarea, completada: checked });
  }

  onEdit() {
    this.edit.emit(this.tarea.id);
  }

  onDelete() {
    this.delete.emit(this.tarea.id);
  }

}
