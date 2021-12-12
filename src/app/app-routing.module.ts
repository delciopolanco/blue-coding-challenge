import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./features/public/public.module').then(m => m.PublicPageModule)
  },
  {
    path: 'public',
    loadChildren: () => import('./features/public/public.module').then(m => m.PublicPageModule)
  },
  {
    path: 'private',
    loadChildren: () => import('./features/private/private.module').then(m => m.PrivatePageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
