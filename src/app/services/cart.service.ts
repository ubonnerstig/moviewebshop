import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ICartItem } from '../interfaces/ICartItem';
import { ICart } from '../interfaces/ICart';
import { IMovie } from '../interfaces/IMovie';

@Injectable({
  providedIn: 'root'
})
export class CartService {

	private cart: ICart;
	private cartSource = new Subject<ICart>();

	thisMovie$ = this.cartSource.asObservable();

	addToCart(addedMovie:IMovie, quantity){
		let foundMovie = false;

		for(let i = 0; i < this.cart.cartItems.length; i++){
			if(this.cart.cartItems[i].movie.id === addedMovie.id){
				this.cart.cartItems[i].quantity += quantity;
				this.cart.cartItems[i].quantityPrice = this.cart.cartItems[i].quantity * addedMovie.price;
				foundMovie = true;
			}
		}

		if (!foundMovie) {
			this.cart.cartItems.push({movie: addedMovie, quantity: quantity, quantityPrice: addedMovie.price * quantity});
		}
		this.calculateTotalPriceAndQty();
	}

	removeFromCart(removedMovie:ICartItem){
		for(let i = 0; i < this.cart.cartItems.length; i++){
			if(this.cart.cartItems[i].movie.id === removedMovie.movie.id){
				this.cart.cartItems.splice(i, 1);
			}
		}
		this.calculateTotalPriceAndQty();
	}

	clearCart(){
		this.cart = {
			cartItems: [],
			totalQty: 0,
			totalPrice: 0
		};
		this.saveCart();
	}

	changeQuantity(changedMovie:ICartItem){
		for(let i = 0; i < this.cart.cartItems.length; i++){
			if(this.cart.cartItems[i].movie.id === changedMovie.movie.id){
				this.cart.cartItems[i].quantity = changedMovie.quantity;
				this.cart.cartItems[i].quantityPrice = this.cart.cartItems[i].quantity * this.cart.cartItems[i].movie.price;
			}
		}
		this.calculateTotalPriceAndQty();
	}

	calculateTotalPriceAndQty(){
		let sum = 0;
		let qty = 0;
		for(let i = 0; i < this.cart.cartItems.length; i++){
			sum += this.cart.cartItems[i].quantityPrice;
			qty += this.cart.cartItems[i].quantity;
		}
		this.cart.totalPrice = sum;
		this.cart.totalQty = qty;
		this.saveCart();
	}

	saveCart(){
		localStorage.setItem("cart", JSON.stringify(this.cart));
		this.cartSource.next(this.cart);
	}

	getCart(): ICart {
		this.cart = JSON.parse(localStorage.getItem("cart"));

		if(this.cart == null){
			this.cart = {
				cartItems: [],
				totalQty: 0,
				totalPrice: 0
			};
		}

		return this.cart;
	}

  	constructor() { 
		this.getCart();
	}
}
