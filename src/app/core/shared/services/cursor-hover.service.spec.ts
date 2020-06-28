import { TestBed } from '@angular/core/testing';

import { CursorHoverService } from './cursor-hover.service';

describe('CursorHoverService', () => {
  let service: CursorHoverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CursorHoverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
