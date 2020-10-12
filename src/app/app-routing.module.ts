import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Load the routes and child routing modules there.
// It's the main entry for the router.
const routes: Routes = [
  {
    path: 'apod',
    // Load the module in a lazy-loading way. It means that the module 'apod'
    // will be load only if the user visits on of the module page.
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
