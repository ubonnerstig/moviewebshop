import { TestBed } from '@angular/core/testing';

import { OrderCompleteService } from './order-complete.service';

describe('OrderCompleteService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OrderCompleteService = TestBed.get(OrderCompleteService);
    expect(service).toBeTruthy();
  });
});
