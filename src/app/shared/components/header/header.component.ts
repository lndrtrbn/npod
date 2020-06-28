import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { CursorHoverService } from 'src/app/core/shared/services/cursor-hover.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements AfterViewInit {
  @ViewChild("menu") menuRef: ElementRef;

  constructor(
    private readonly cursorService: CursorHoverService
  ) {}

  ngAfterViewInit(): void {
    const menu: HTMLElement = this.menuRef.nativeElement;
    const menuItems: NodeListOf<HTMLElement> = menu.querySelectorAll(".link");
    menuItems.forEach(item => {
      this.cursorService.addFocusableElement(item)
    });
  }

}
