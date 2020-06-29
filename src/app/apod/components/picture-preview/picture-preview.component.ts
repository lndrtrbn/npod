import { Component, Input } from '@angular/core';
import { Picture } from 'src/app/core/domain/picture/picture';

@Component({
  selector: 'app-picture-preview',
  templateUrl: './picture-preview.component.html',
  styleUrls: ['./picture-preview.component.scss']
})
export class PicturePreviewComponent {

  @Input() picture: Picture;
  @Input() side: "left" | "right" = "left";

}
