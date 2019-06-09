import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintCartItemComponent } from './print-cart-item.component';
import { ICartItem } from '../interfaces/ICartItem';
import { Component } from '@angular/core';

describe('PrintCartItemComponent', () => {
	let component: PrintCartItemComponent;
	let fixture: ComponentFixture<PrintCartItemComponent>;

	let testComponent: TestHostComponent;
	let testFixture: ComponentFixture<TestHostComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
		declarations: [ PrintCartItemComponent, TestHostComponent ]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(PrintCartItemComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();

		testFixture = TestBed.createComponent(TestHostComponent);
		testComponent = testFixture.componentInstance;
		testFixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should create test host component', () => {
		expect(testComponent).toBeTruthy();
	});

	it('should set value to inputdecorator', () => {
		testComponent.setInput({movie: { id: 1, name: 'Batcat the cat bat', description: 'lol', price: 122,imageUrl: 'https://fashionjitsudotcom.files.wordpress.com/2017/10/screen-shot-2017-09-25-at-2-52-46-pm.png',year: 1999,added: 'datum',productCategory:[{categoryId: 8}]}, quantity: 1, quantityPrice: 199});
		expect(testComponent.cartItem.movie.name).toBe('Batcat the cat bat');
	});

	@Component({
		selector: `host-component`,
		template: `<app-print-cart-item class="flex_row" [cartItem]="{movie: { id: 1, name: 'Batcat the cat bat', description: 'lol', price: 122,imageUrl: 'https://fashionjitsudotcom.files.wordpress.com/2017/10/screen-shot-2017-09-25-at-2-52-46-pm.png',year: 1999,added: 'datum',productCategory:[{categoryId: 1}]}, quantity: 1, quantityPrice: 199}" (removeItem)="removeFromCart($event)" (changeItemQuantity)="changeQuantity($event)"></app-print-cart-item>`	
	})
	class TestHostComponent {
		cartItem: ICartItem;

		setInput(item: ICartItem) {
			this.cartItem = item;
		}
	}
});
