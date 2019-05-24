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
		console.log(addedMovie);
		console.log(quantity);

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

	changeQuantity(changedMovie:ICartItem){
		for(let i = 0; i < this.cart.cartItems.length; i++){
			if(this.cart.cartItems[i].movie.id === changedMovie.movie.id){
				this.cart.cartItems[i].quantity = changedMovie.quantity;
				this.cart.cartItems[i].quantityPrice = this.cart.cartItems[i].quantity * this.cart.cartItems[i].movie.price;
			}
		}
		this.calculateCartSum();
	}

	calculateCartSum(){
		let sum = 0;
		for(let i = 0; i < this.cart.cartItems.length; i++){
			// sum += this.cart.cartItems[i].movie.price * this.cart.cartItems[i].quantity; 
			sum += this.cart.cartItems[i].quantityPrice;
		}
		this.cart.totalPrice = sum;
		console.log(sum);
		this.saveCart();
	}

	// calculateQuantitySum(movie, quantity){
	// 	let cartMovie = this.cart.cartItems.find(item => item.movie.id === movie.id);
	// 	console.log(movie.price * (cartMovie.quantity + quantity));
	// 	return movie.price * (cartMovie.quantity + quantity);
	// }

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
