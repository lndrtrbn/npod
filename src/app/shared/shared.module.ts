import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CursorComponent } from './components/cursor/cursor.component';
import { HeaderComponent } from './components/header/header.component';



@NgModule({
  declarations: [CursorComponent, HeaderComponent],
  imports: [CommonModule],
  exports: [CursorComponent, HeaderComponent]
})
export class SharedModule { }
