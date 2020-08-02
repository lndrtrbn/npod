import { Directive, HostListener, ElementRef, AfterViewInit, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[appOnViewport]'
})
export class OnViewportDirective implements AfterViewInit {
  private currentVisibility = false;

  // Events emitted when the visibility of the element has changed.
  @Output() visible = new EventEmitter<void>();
  @Output() hidden = new EventEmitter<void>();

  @HostListener('window:scroll')
  scroll(): void {
    this.checkVisibility();
  }

  /**
   * @param element The element associated to the directive.
   */
  constructor(private readonly element: ElementRef) {}
  
  ngAfterViewInit(): void {
    this.checkVisibility();
  }

  /**
   * Emits an event if the visibility has changed.
   */
  checkVisibility(): void {
    const isVisible = this.isElementVisible();
    if (isVisible === !this.currentVisibility) {
      this.currentVisibility = isVisible;
      this.currentVisibility ? this.visible.emit() : this.hidden.emit();
    }
  }

  /**
   * Detects if the dom element owning the directive is visible
   * in the viewport or not.
   * 
   * @returns True if the element is visible, false otherwise.
   */
  isElementVisible(): boolean {
    const position = this.element.nativeElement.getBoundingClientRect();
    // Checking visibility.
    const fullyVisible = position.top >= 0 && position.bottom <= window.innerHeight;
    const partiallyVisible = position.top < window.innerHeight && position.bottom >= 0;
    return fullyVisible || partiallyVisible;
  }

}
