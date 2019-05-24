import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IOrder } from '../interfaces/IOrder';

@Component({
  selector: 'app-print-order',
  templateUrl: './print-order.component.html',
  styleUrls: ['./print-order.component.css']
})
export class PrintOrderComponent implements OnInit {
	@Input() order: IOrder;
	@Output() removeThisOrder = new EventEmitter<IOrder>();

	constructor() { }

	ngOnInit() {
	}

	removeOrder(){
		this.removeThisOrder.emit(this.order);
	}

}
