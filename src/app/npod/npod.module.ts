import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NpodRoutingModule } from './npod-routing.module';
import { PicturesComponent } from './pages/pictures/pictures.component';
import { PodComponent } from './pages/pod/pod.component';


@NgModule({
  declarations: [PicturesComponent, PodComponent],
  imports: [
    CommonModule,
    NpodRoutingModule
  ]
})
export class NpodModule { }
