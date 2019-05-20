import { TestBed } from '@angular/core/testing';

import { CartService } from './cart.service';
import { MockDataService } from './mock-data.service';
import { ICartItem } from '../interfaces/ICartItem';

describe('CartService', () => {

	beforeEach(() => TestBed.configureTestingModule({}));

	it('should be created', () => {
		const service: CartService = TestBed.get(CartService);
		expect(service).toBeTruthy();
	});

	it('should add item to cart', () => {
		const service: CartService = TestBed.get(CartService);
		let backend: MockDataService = TestBed.get(MockDataService);
		let cart = null;

		localStorage.setItem("cart", JSON.stringify(cart));

		cart = service.getCart();
		expect(cart.cartItems.length).toBe(0);

		let cartItem: ICartItem = {
			movie: backend.movies[0],
			quantity: 1
		}
		service.addToCart(cartItem);

		cart = service.getCart();

		expect(cart.cartItems.length).toBe(1);
		expect(cart.cartItems[0].movie.name).toBe("One");
	});

	it('should remove item from cart', () => {
		const service: CartService = TestBed.get(CartService);
		let backend: MockDataService = TestBed.get(MockDataService);

		let cart = service.getCart();

		expect(cart.cartItems.length).toBe(1);

		let cartItem: ICartItem = {
			movie: backend.movies[0],
			quantity: 1
		}
		service.removeFromCart(cartItem);

		cart = service.getCart();

		expect(cart.cartItems.length).toBe(0);
	});

	it('should calculate total price of cart', () => {
		const service: CartService = TestBed.get(CartService);
		let backend: MockDataService = TestBed.get(MockDataService);
		let cart = null;

		localStorage.setItem("cart", JSON.stringify(cart));

		cart = service.getCart();
		expect(cart.totalPrice).toBe(0);

		let cartItem: ICartItem = {
			movie: backend.movies[0],
			quantity: 1
		}
		service.addToCart(cartItem);

		cart = service.getCart();

		expect(cart.totalPrice).toBe(backend.movies[0].price);
	});
});
