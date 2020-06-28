import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'apod',
    loadChildren: () => import("./apod/apod.module").then(m => m.ApodModule)
  },
  {
    path: 'about',
    loadChildren: () => import("./about/about.module").then(m => m.AboutModule)
  },
  {
    path: '**',
    redirectTo: '/apod/all-pictures'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
