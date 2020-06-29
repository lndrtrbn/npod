import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PicturesComponent } from "./pages/pictures/pictures.component";
import { PodComponent } from "./pages/pod/pod.component";

const routes: Routes = [
  {
    path: 'all-pictures',
    component: PicturesComponent
  },
  {
    path: 'today',
    component: PodComponent
  },
  {
    path: 'all-pictures/:date',
    component: PodComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApodRoutingModule { }
