import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartComponent } from './cart.component';
import { PrintCartItemComponent } from '../print-cart-item/print-cart-item.component';

describe('CartComponent', () => {
	let component: CartComponent;
	let fixture: ComponentFixture<CartComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
		declarations: [ CartComponent, PrintCartItemComponent ]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(CartComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should toggle emptyCart depending on length', () => {
		component.checkContentLength(0);
		expect(component.emptyCart).toBeFalsy;
		component.checkContentLength(1);
		expect(component.emptyCart).toBeTruthy;
	});

});
