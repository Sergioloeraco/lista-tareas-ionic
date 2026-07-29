import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full',
  },
  {
    path: 'inicio',
    loadComponent: () => import('./pages/inicio/inicio.page').then( m => m.InicioPage)
  },
  {
    path: 'lista',
    loadComponent: () => import('./pages/lista/lista.page').then( m => m.ListaPage)
  },
  {
    path: 'formulario',
    loadComponent: () => import('./pages/formulario/formulario.page').then( m => m.FormularioPage)
  },
];