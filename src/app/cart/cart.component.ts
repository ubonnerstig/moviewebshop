import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AddToCartService } from '../services/add-to-cart.service';
import { ICartItem } from '../interfaces/ICartItem';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
	@Input() cartExpanded: boolean;
	@Output() closeThisCart = new EventEmitter<boolean>();

	cartMovie: ICartItem;
	cartContent: ICartItem[];
	emptyCart: boolean = true;

	constructor(cartService: AddToCartService) {
		cartService.addedMovie$.subscribe(addedMovie => {
			this.cartMovie = addedMovie;
			
			this.addToCart(this.cartMovie);
		});
	}

	ngOnInit() {
		this.getFromLocalStorage();
	}

	toggleCart(bool){
		this.closeThisCart.emit(bool);
	}

	addToCart(cartItem: ICartItem){

		for(let i = 0; i < this.cartContent.length; i++){

			if(this.cartContent[i].movie.id === cartItem.movie.id){
				this.cartContent[i].quantity++;
				this.saveToLocalstorage(this.cartContent);
				return;
			}
		}
		this.cartContent.push(cartItem);
		this.saveToLocalstorage(this.cartContent);
	}

	saveToLocalstorage(cart){
		localStorage.setItem("cart", JSON.stringify(cart));
		this.getFromLocalStorage();
	}

	getFromLocalStorage(){
		this.cartContent = JSON.parse(localStorage.getItem("cart"));

		if(this.cartContent == null){
			this.cartContent = [];
		}

		if(this.cartContent.length > 0){
			this.emptyCart = false;
		}
	}
}
