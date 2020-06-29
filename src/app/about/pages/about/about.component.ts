import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CursorHoverService } from 'src/app/core/shared/services/cursor-hover.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements AfterViewInit {
  @ViewChild("container") containerRef: ElementRef;

  constructor(
    private readonly cursorService: CursorHoverService
  ) {}

  ngAfterViewInit(): void {
    const menu: HTMLElement = this.containerRef.nativeElement;
    const menuItems: NodeListOf<HTMLElement> = menu.querySelectorAll(".link");
    menuItems.forEach(item => {
      this.cursorService.addFocusableElement(item)
    });
  }

}
