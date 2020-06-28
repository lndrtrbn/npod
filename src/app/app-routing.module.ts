import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'npod',
    loadChildren: () => import("./npod/npod.module").then(m => m.NpodModule)
  },
  {
    path: 'about',
    loadChildren: () => import("./about/about.module").then(m => m.AboutModule)
  },
  {
    path: '**',
    redirectTo: '/npod/all-pictures'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
