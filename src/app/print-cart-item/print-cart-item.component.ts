import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ICartItem } from '../interfaces/ICartItem';

@Component({
  selector: 'app-print-cart-item',
  templateUrl: './print-cart-item.component.html',
  styleUrls: ['./print-cart-item.component.css']
})
export class PrintCartItemComponent implements OnInit {
	@Input() cartItem: ICartItem;
	@Output() removeItem = new EventEmitter<ICartItem>();

	constructor() { }

	ngOnInit() {
	}

	removeFromCart(){
		this.removeItem.emit(this.cartItem);
	}
}
