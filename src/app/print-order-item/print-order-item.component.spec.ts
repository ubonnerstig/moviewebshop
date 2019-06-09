import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintOrderItemComponent } from './print-order-item.component';
import { Component } from '@angular/core';
import { ICartItem } from '../interfaces/ICartItem';
import { ICart } from '../interfaces/ICart';

describe('PrintOrderItemComponent', () => {
	let component: PrintOrderItemComponent;
	let fixture: ComponentFixture<PrintOrderItemComponent>;

	let testComponent: TestHostComponent;
	let testFixture: ComponentFixture<TestHostComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
		declarations: [ PrintOrderItemComponent, TestHostComponent ]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(PrintOrderItemComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();

		testFixture = TestBed.createComponent(TestHostComponent);
		testComponent = testFixture.componentInstance;
		testFixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should set value to input decorator', () => {
		testComponent.setInput({
				movie: { 
					id: 1, 
					name: 'Batcat the cat bat', 
					description: 'lol', 
					price: 122,
					imageUrl: 'https://fashionjitsudotcom.files.wordpress.com/2017/10/screen-shot-2017-09-25-at-2-52-46-pm.png',
					year: 1999,
					added: 'datum',
					productCategory:[{categoryId: 1}]
				},
				quantity: 1, 
				quantityPrice: 199
			});
			testFixture.detectChanges();
			expect(testFixture.nativeElement.querySelector('h3').innerText).toEqual('Batcat the cat bat');
	});
	
	@Component({
		selector: `host-component`,
		//template: `<app-print-order-item *ngFor="let cartItem of cartContent.cartItems" [cartItem]="{movie: { id: 1, name: 'Batcat the cat bat', description: 'lol', price: 122,imageUrl: 'https://fashionjitsudotcom.files.wordpress.com/2017/10/screen-shot-2017-09-25-at-2-52-46-pm.png',year: 1999,added: 'datum',productCategory:[{categoryId: 1}]}, quantity: 1, quantityPrice: 199}" (removeItem)="removeFromCart($event)" (changeItemQuantity)="changeQuantity($event)"></app-print-order-item>`	
		//(template: `<app-print-order-item *ngFor="let cartItem of cartContent.cartItems" [cartItem]="cartItem" (removeItem)="removeFromCart($event)" (changeItemQuantity)="changeQuantity($event)"></app-print-order-item>`	
		template: `<app-print-order-item [cartItem]="cartItem" ></app-print-order-item>`
	})
	class TestHostComponent {
		cartItem: ICartItem;

		setInput(item: ICartItem) {
			console.log(item);
			this.cartItem = item;
		}
	}
});
