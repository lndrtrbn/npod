import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { CursorHoverService } from 'src/app/core/shared/services/cursor-hover.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements AfterViewInit {
  // Get the DOM reference to allow DOM manipulation on it.
  @ViewChild("menu") menuRef: ElementRef;

  /**
   * @param cursorService To manage the cursor animation on the menu.
   */
  constructor(
    private readonly cursorService: CursorHoverService
  ) {}

  ngAfterViewInit(): void {
    // Fetch each item of the menu and mark them for the menu animation
    // that is managed in the cursorService.
    const menu: HTMLElement = this.menuRef.nativeElement;
    const menuItems: NodeListOf<HTMLElement> = menu.querySelectorAll(".link");
    menuItems.forEach(item => {
      this.cursorService.addFocusableElement(item)
    });
  }

}
