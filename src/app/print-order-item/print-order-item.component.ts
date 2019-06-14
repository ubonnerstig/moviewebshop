import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ICartItem } from '../interfaces/ICartItem';

@Component({
	selector: 'app-print-order-item',
	templateUrl: './print-order-item.component.html',
	styleUrls: ['./print-order-item.component.css']
})
export class PrintOrderItemComponent implements OnInit {
	@Input() cartItem: ICartItem;
	@Output() removeItem = new EventEmitter<ICartItem>();
	@Output() changeItemQuantity = new EventEmitter<ICartItem>();

	constructor(){ }

	ngOnInit(){
	}

	removeFromCart(){
		this.removeItem.emit(this.cartItem);
	}

	changeQuantity(quantity: number){
		this.cartItem.quantity = +quantity;
		if(this.cartItem.quantity > 0){
			this.changeItemQuantity.emit(this.cartItem);
		}else{
			this.removeFromCart();
		}
	}
}