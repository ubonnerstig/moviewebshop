import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ICartItem } from '../interfaces/ICartItem';
import { ICart } from '../interfaces/ICart';

@Injectable({
  providedIn: 'root'
})
export class CartService {

	private cart: ICart;
	private cartSource = new Subject<ICart>();

	thisMovie$ = this.cartSource.asObservable();

	addToCart(addedMovie:ICartItem){
		let foundMovie = false;

		for(let i = 0; i < this.cart.cartItems.length; i++){
			if(this.cart.cartItems[i].movie.id === addedMovie.movie.id){
				this.cart.cartItems[i].quantity += addedMovie.quantity;
				
				foundMovie = true;
			}
		}

		if (!foundMovie) {
			this.cart.cartItems.push(addedMovie);
		}
		this.calculateCartSum();
	}

	removeFromCart(removedMovie:ICartItem){
		for(let i = 0; i < this.cart.cartItems.length; i++){

			if(this.cart.cartItems[i].movie.id === removedMovie.movie.id){
				this.cart.cartItems.splice(i, 1);
			}
		}
		this.calculateCartSum();
	}

	calculateCartSum(){
		let sum = 0;
		for(let i = 0; i < this.cart.cartItems.length; i++){
			sum += this.cart.cartItems[i].movie.price * this.cart.cartItems[i].quantity; 
		}
		this.cart.totalPrice = sum;
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
				totalPrice: 0
			};
		}

		return this.cart;
	}

  	constructor() { 
		this.getCart();
	}
}
