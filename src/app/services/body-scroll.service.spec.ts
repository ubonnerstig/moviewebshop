import { TestBed } from '@angular/core/testing';

import { BodyScrollService } from './body-scroll.service';

describe('BodyScrollService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BodyScrollService = TestBed.get(BodyScrollService);
    expect(service).toBeTruthy();
  });
});
