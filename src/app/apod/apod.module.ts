import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApodRoutingModule } from './apod-routing.module';
import { PicturesComponent } from './pages/pictures/pictures.component';
import { PodComponent } from './pages/pod/pod.component';
import { PicturePreviewComponent } from './components/picture-preview/picture-preview.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    PicturesComponent,
    PodComponent,
    PicturePreviewComponent
  ],
  imports: [
    CommonModule,
    ApodRoutingModule,
    SharedModule
  ]
})
export class ApodModule { }
