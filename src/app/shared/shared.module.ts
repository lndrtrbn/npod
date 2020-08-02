import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CursorComponent } from './components/cursor/cursor.component';
import { HeaderComponent } from './components/header/header.component';
import { RouterModule } from '@angular/router';
import { OnViewportDirective } from './directives/on-viewport.directive';



@NgModule({
  declarations: [
    CursorComponent,
    HeaderComponent,
    OnViewportDirective
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    CursorComponent,
    HeaderComponent,
    OnViewportDirective
  ]
})
export class SharedModule { }
