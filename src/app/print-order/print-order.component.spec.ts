import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintOrderComponent } from './print-order.component';
import { Component } from '@angular/core';
import { IOrder } from '../interfaces/IOrder';

describe('PrintOrderComponent', () => {
	let testComponent: TestHostComponent;
	let testFixture: ComponentFixture<TestHostComponent>;
//   let component: PrintOrderComponent;
//   let fixture: ComponentFixture<PrintOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrintOrderComponent, TestHostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
	testFixture = TestBed.createComponent(TestHostComponent);
	testComponent = testFixture.componentInstance;
	testFixture.detectChanges();
    // fixture = TestBed.createComponent(PrintOrderComponent);
    // component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
	expect(testComponent).toBeTruthy();
    // expect(component).toBeTruthy();
  });

  @Component({
	selector: `host-component`,
	template: `<app-print-order *ngFor="let order of orders" [order]="{ id: 1, companyId: 8, created: '2019-04-01T00:00:00', createdBy: 'hej', paymentMethod: 'bitcoin', totalPrice: 1021, status: 0, orderRows: []}" (click)="removeOrder()"></app-print-order>`
	//template: `<app-movie-details [modalMovie]="movie"></app-movie-details>`
})
class TestHostComponent {
	order: IOrder;

	setInput(order: IOrder) {
		this.order = order;

	}
}
});
