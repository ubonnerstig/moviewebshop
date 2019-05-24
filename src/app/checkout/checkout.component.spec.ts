import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutComponent } from './checkout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrintOrderItemComponent } from '../print-order-item/print-order-item.component';
import { DataService } from '../services/data.service';
import { MockDataService } from '../services/mock-data.service';
import { CartService } from '../services/cart.service';
import { ICartItem } from '../interfaces/ICartItem';
import { IOrder } from '../interfaces/IOrder';

describe('CheckoutComponent', () => {
	let component: CheckoutComponent;
	let fixture: ComponentFixture<CheckoutComponent>;
	let cartService: CartService;
	let backend: MockDataService;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
		declarations: [ CheckoutComponent, PrintOrderItemComponent ],
		imports: [FormsModule, ReactiveFormsModule]
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

	//HALP
	it('should map cartContent to become an IOrder', () => {
		let cartItem: ICartItem = {
			movie: backend.movies[2],
			quantity: 1
		}
		cartService.addToCart(cartItem);

		expect(component.cartContent).toBeTruthy();
		component.cartToOrder = component.mapCart();
		expect(component.cartToOrder).toBeTruthy();
	});

  	it('should change emptyCart form true to false depending on cart length', () => {
	  	component.checkContentLength(0);
		expect(component.emptyCart).toBeTruthy();
		component.checkContentLength(1);
    	expect(component.emptyCart).toBeFalsy();
	});
	 
	//HALP
	it('should place an order', () => {
		expect(backend.orders.length).toBe(4);
		component.order = {
			orderContent:component.cartToOrder,
			user: component.orderDetails.value,
			total: component.cartContent.totalPrice
		}
		component.placeOrder();
		backend.postOrder(component.order);
		
		expect(backend.orders.length).toBe(5);
   	});

});
