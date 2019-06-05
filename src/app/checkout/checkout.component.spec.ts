import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutComponent } from './checkout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrintOrderItemComponent } from '../print-order-item/print-order-item.component';
import { DataService } from '../services/data.service';
import { MockDataService } from '../services/mock-data.service';
import { CartService } from '../services/cart.service';
import { ICartItem } from '../interfaces/ICartItem';
import { IOrder } from '../interfaces/IOrder';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

describe('CheckoutComponent', () => {
	let component: CheckoutComponent;
	let fixture: ComponentFixture<CheckoutComponent>;
	let cartService: CartService;
	let backend: MockDataService;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
		declarations: [ CheckoutComponent, PrintOrderItemComponent ],
		imports: [FormsModule, ReactiveFormsModule, HttpClientModule, RouterTestingModule]
		})
		.overrideComponent(CheckoutComponent, {set: { providers: 
			[
				{ provide: DataService, useClass: MockDataService}
			]}})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(CheckoutComponent);
		component = fixture.componentInstance;
		cartService =  TestBed.get(CartService);
		backend = TestBed.get(MockDataService);
		fixture.detectChanges();
		localStorage.clear();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
	
  	it('should change emptyCart form true to false depending on cart length', () => {
	  	component.checkContentLength(0);
		expect(component.emptyCart).toBeTruthy();
		component.checkContentLength(1);
    	expect(component.emptyCart).toBeFalsy();
	});
	 
	it('should place an order', () => {
		expect(backend.orders.length).toBe(4);

		cartService.addToCart(backend.movies[1], 1);
		component.cartToOrder = component.mapCart();

		component.order = {
				id: 5,
				companyId: 8,
				created: component.date,
				createdBy: "hej",
				paymentMethod: "Bitcoin",
				totalPrice: component.cartContent.totalPrice,
				status: 0,
				orderRows: component.cartToOrder
		}
		backend.postOrder(component.order);
		expect(backend.orders.length).toBe(5);
	   });
	   
	   it('should place an order', () => {
		//component.removeFromCart(component.cartContent[0]);
   	});

});
