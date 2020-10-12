import { Component, ViewChild, ElementRef, AfterViewInit, HostListener, OnInit } from '@angular/core';
import * as paper from "paper";
import { CursorPosition } from "src/app/core/shared/interfaces/cursor-position";
import { CursorHoverService } from "src/app/core/shared/services/cursor-hover.service";

// Inspired from: https://tympanus.net/codrops/2019/01/31/custom-cursor-effects/

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
export class CursorComponent implements AfterViewInit, OnInit {
  @ViewChild('smallCursor') smallCursorRef: ElementRef<HTMLDivElement>;

  position: CursorPosition = { x: -100, y: -100 };
  lastPosition: CursorPosition = { x: -100, y: -100 };
  stuckPosition: CursorPosition = { x: -100, y: -100 };

  circleConf: CursorCircleConf = {
    strokeColor: new paper.Color(1, 1, 1, 0.2),
    strokeColorHover: new paper.Color(0.176, 0.855, 0.722, 0.8),
    strokeWidth: 1,
    segments: 8,
    radius: 15
  };

  // Determines if the cursor should stick to an element.
  isStuck: boolean = false;
  isNoisy: boolean = false;

  // Paper object containing our circle.
  polygon: paper.Path.RegularPolygon;
  
  @HostListener('document:mousemove', ['$event'])
  updateCursorPosition(event: MouseEvent) {
    this.position = { x: event.clientX, y: event.clientY };
  }

  /**
   * @param cursorService To listen for stuck position.
   */
  constructor(
    private readonly cursorService: CursorHoverService
  ) {}

  ngOnInit() {
    // Listen for stuck position changes.
    this.cursorService.stuckPosition.subscribe(p => this.stuckPosition = p);
  }

  /**
   * Starts cursor animation when the dom is ready.
   */
  ngAfterViewInit(): void {
    new paper.Project("cursorCanvas");
    // The base shape for the noisy circle.
    this.polygon = this.buildCirclePolygon();
  
    // The draw loop of Paper.js.
    // (60fps with requestAnimationFrame under the hood).
    paper.view.onFrame = () => {
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
    if (!this.stuckPosition) {
      this.lastPosition.x = lerp(this.lastPosition.x, this.position.x, 0.2);
      this.lastPosition.y = lerp(this.lastPosition.y, this.position.y, 0.2);
      this.polygon.strokeColor = this.circleConf.strokeColor;
      if (this.isNoisy) {
        this.polygon.scale(0.5, 200);
        this.isNoisy = false;
      }
    } else {
      this.lastPosition.x = lerp(this.lastPosition.x, this.stuckPosition.x, 0.2);
      this.lastPosition.y = lerp(this.lastPosition.y, this.stuckPosition.y, 0.2);
      this.polygon.strokeColor = this.circleConf.strokeColorHover;
      if (!this.isNoisy) {
        this.polygon.scale(2, 0.005);
        this.isNoisy = true;
      }
    }
    this.polygon.position = new paper.Point(this.lastPosition.x, this.lastPosition.y);
  }

  /**
   * Computes the position of the small cursor.
   */
  renderSmallCursor(): void {
    const newPosition = `translate(${this.position.x}px, ${this.position.y}px)`;
    this.smallCursorRef.nativeElement.style.transform = newPosition;
  }

  /**
   * Builds the circle polygon that follow the cursor.
   * 
   * @returns The paper object Polygon.
   */
  private buildCirclePolygon(): paper.Path.RegularPolygon {
    const polygon = new paper.Path.RegularPolygon(
      new paper.Point(0, 0),
      this.circleConf.segments,
      this.circleConf.radius
    );
    polygon.strokeColor = this.circleConf.strokeColor;
    polygon.strokeWidth = this.circleConf.strokeWidth;
    polygon.smooth();
    return polygon;
  }

}
