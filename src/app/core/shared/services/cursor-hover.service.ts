import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CursorPosition } from '../interfaces/cursor-position';

@Injectable({
  providedIn: 'root'
})
export class CursorHoverService {
  private readonly _stuckPosition = new BehaviorSubject<CursorPosition>(null);
  readonly stuckPosition = this._stuckPosition.asObservable();

  /**
   * Makes an element react on hover.
   *
   * @param element The element that shoud be focusable.
   */
  addFocusableElement(element: HTMLElement): void {
    element.addEventListener("mouseenter", (e) => this.handleEnterLink(e));
    element.addEventListener("mouseleave", () => this.handleLeaveLink());
  }

  /**
   * Called when the cursor hovers a focusable element.
   * 
   * Computes the center of the focusable element and emits
   * an event with this position.
   * 
   * @param event The mouse event.
   */
  private handleEnterLink(event: MouseEvent): void {
    const navItem = event.currentTarget as HTMLElement;
    const navItemBox = navItem.getBoundingClientRect();
    this._stuckPosition.next({
      x: Math.round(navItemBox.left + navItemBox.width / 2),
      y: Math.round(navItemBox.top + navItemBox.height + 2)
    });
  }

  /**
   * Called when the cursor leaves a focusable element.
   * 
   * Emits an event with a null position.
   */
  private handleLeaveLink(): void {
    this._stuckPosition.next(null);
  }
}
