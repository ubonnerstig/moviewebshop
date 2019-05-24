import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ICartItem } from '../interfaces/ICartItem';
import { CartService } from '../services/cart.service';
import { ICart } from '../interfaces/ICart';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
	@Input() cartExpanded: boolean;
	@Output() closeThisCart = new EventEmitter<boolean>();

	cartMovie: ICartItem;
	cartContent: ICart;
	emptyCart: boolean = true;

	constructor(private cartService: CartService) {
	}

	ngOnInit() {

		this.cartService.thisMovie$.subscribe(addedMovie => {
			this.cartContent = addedMovie;
			this.checkContentLength(this.cartContent.cartItems.length);
		});
		this.cartContent = this.cartService.getCart();

		// this.cartService.thisBoolean$.subscribe(value => {
		// 	this.emptyCart = value;
		// });
		// this.emptyCart = this.cartService.checkCartLength();
	 	// this.emptyCart = this.cartService.checkCartLength();
		console.log(this.cartContent);
		this.checkContentLength(this.cartContent.cartItems.length);
	}

	checkContentLength(contentLength: number){
		if(contentLength > 0){
			this.emptyCart = false;
		}else{
			this.emptyCart = true;
		}
	}

	getBottomOffset(event){
		// console.log(event);
	}

	toggleCart(bool: boolean){
		this.closeThisCart.emit(bool);
	}

	// addToCart(cartItem: ICartItem){
	// 	this.cartService.addToCart(cartItem);
	// 	this.checkContentLength(this.cartContent.cartItems.length);
	// }

	removeFromCart(cartItem: ICartItem){
		this.cartService.removeFromCart(cartItem);
		// this.checkContentLength(this.cartContent.cartItems.length);
	}

}
