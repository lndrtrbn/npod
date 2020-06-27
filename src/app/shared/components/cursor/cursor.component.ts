import { Component, ViewChild, ElementRef, AfterViewInit, HostListener } from '@angular/core';
import { Path, Color, view, Point, Project, Group } from "paper";

// Inspired from: https://tympanus.net/codrops/2019/01/31/custom-cursor-effects/

interface CursorPosition {
  x: number;
  y: number;
}

interface CursorCircleConf {
  strokeColor: paper.Color;
  strokeColorHover: paper.Color;
  strokeWidth: number;
  segments: number;
  radius: number;
}

@Component({
  selector: 'app-cursor',
  templateUrl: './cursor.component.html',
  styleUrls: ['./cursor.component.scss']
})
export class CursorComponent implements AfterViewInit {
  @ViewChild('smallCursor') smallCursorRef: ElementRef<HTMLDivElement>;

  position: CursorPosition = { x: -100, y: -100 };
  lastPosition: CursorPosition = { x: -100, y: -100 };

  circleConf: CursorCircleConf = {
    strokeColor: new Color(255, 255, 255, 0.5),
    strokeColorHover: new Color(255, 0, 0, 0.5),
    strokeWidth: 1,
    segments: 8,
    radius: 15
  };

  // Paper object containing our circle.
  group: paper.Group;
  
  @HostListener('document:mousemove', ['$event'])
  updateCursorPosition(event: MouseEvent) {
    this.position = { x: event.clientX, y: event.clientY };
  }

  /**
   * Starts cursor animation when the dom is ready.
   */
  ngAfterViewInit(): void {
    new Project("cursorCanvas");
    // The base shape for the noisy circle.
    const polygon = new Path.RegularPolygon(
      new Point(0, 0),
      this.circleConf.segments,
      this.circleConf.radius
    );
    polygon.strokeColor = this.circleConf.strokeColor;
    polygon.strokeWidth = this.circleConf.strokeWidth;
    polygon.smooth();
    this.group = new Group([polygon]);
    this.group.applyMatrix = false;
  
    // The draw loop of Paper.js.
    // (60fps with requestAnimationFrame under the hood).
    view.onFrame = () => {
      this.renderCircleCursor();
      this.renderSmallCursor();
    };
  }

  /**
   * Computes the position of the circle of the cursor.
   */
  renderCircleCursor(): void {
    // function for linear interpolation of values
    const lerp = (a: number, b: number, n: number) => (1 - n) * a + n * b;
    // Using linear interpolation, the circle will move 0.2 (20%)
    // of the distance between its current position and the mouse
    // coordinates per Frame.
    this.lastPosition.x = lerp(this.lastPosition.x, this.position.x, 0.2);
    this.lastPosition.y = lerp(this.lastPosition.y, this.position.y, 0.2);
    this.group.position = new Point(this.lastPosition.x, this.lastPosition.y);
  }

  /**
   * Computes the position of the small cursor.
   */
  renderSmallCursor(): void {
    const newPosition = `translate(${this.position.x}px, ${this.position.y}px)`;
    this.smallCursorRef.nativeElement.style.transform = newPosition;
  }

}
