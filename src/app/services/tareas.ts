import { Injectable } from '@angular/core';
import { Tarea } from '../models/tarea';

@Injectable({
  providedIn: 'root'
})
export class TareasService {
  private readonly STORAGE_KEY = 'lista_tareas_app';

  constructor() { }

  // 1. Obtener todas las tareas guardadas
  getTareas(): Tarea[] {
    const tareasGuardadas = localStorage.getItem(this.STORAGE_KEY);
    return tareasGuardadas ? JSON.parse(tareasGuardadas) : [];
  }

  getTareaById(id: string): Tarea | undefined {
    return this.getTareas().find(tarea => tarea.id === id);
  }

  // Método privado para actualizar el LocalStorage
  private saveTareas(tareas: Tarea[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(tareas));
  }

  // 2. Agregar una nueva tarea
  addTarea(tarea: Tarea): void {
    const tareas = this.getTareas();
    // Generar un ID único rápido usando la fecha actual
    tarea.id = Date.now().toString(); 
    tareas.push(tarea);
    this.saveTareas(tareas);
  }

  // 3. Editar una tarea existente
  updateTarea(tareaActualizada: Tarea): void {
    const tareas = this.getTareas();
    const index = tareas.findIndex(t => t.id === tareaActualizada.id);
    if (index !== -1) {
      tareas[index] = tareaActualizada;
      this.saveTareas(tareas);
    }
  }

  // 4. Eliminar una tarea
  deleteTarea(id: string): void {
    const tareas = this.getTareas();
    const tareasRestantes = tareas.filter(t => t.id !== id);
    this.saveTareas(tareasRestantes);
  }
}