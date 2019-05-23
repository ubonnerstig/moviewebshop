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

	constructor() { }

	ngOnInit() {
	}

}
