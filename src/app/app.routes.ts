import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'app',
  },
    {
      path: 'app',
      title: 'Главная',
      loadComponent: () =>
        import('./pages/main-page/main-page.component').then((m) => m.MainPageComponent),
    }
]
