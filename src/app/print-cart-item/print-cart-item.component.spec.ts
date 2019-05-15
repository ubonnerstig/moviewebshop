import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintCartItemComponent } from './print-cart-item.component';

describe('PrintCartItemComponent', () => {
  let component: PrintCartItemComponent;
  let fixture: ComponentFixture<PrintCartItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrintCartItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintCartItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
