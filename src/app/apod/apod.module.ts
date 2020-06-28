import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ApodRoutingModule } from './apod-routing.module';
import { PicturesComponent } from './pages/pictures/pictures.component';
import { PodComponent } from './pages/pod/pod.component';


@NgModule({
  declarations: [PicturesComponent, PodComponent],
  imports: [
    CommonModule,
    ApodRoutingModule  
  ]
})
export class ApodModule { }
