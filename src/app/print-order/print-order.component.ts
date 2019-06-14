import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IOrder } from '../interfaces/IOrder';
import * as moment from 'moment';
import { Constants } from '../interfaces/Constans';

@Component({
  selector: 'app-print-order',
  templateUrl: './print-order.component.html',
  styleUrls: ['./print-order.component.css']
})
export class PrintOrderComponent implements OnInit {
	@Input() order: IOrder; 
	@Output() removeThisOrder = new EventEmitter<IOrder>();

	status: string;
	payment: string;
	icon: string;
	date: string;
	constructor() { }

	ngOnInit() {
		this.setStatus(this.order.status);
		this.setPayment(this.order.paymentMethod);
		this.date = moment(this.order.created).format(new Constants().dateTimeFormat);
	}

	setStatus(numberStatus: number){
		if(numberStatus === 0){
			this.status = "Received";
		}else if(numberStatus === 1){
			this.status = "Sent";
		}
	}

	setPayment(orderPayment: string){
		if(orderPayment === "paypal"){
			this.payment = "PayPal";
			this.icon = "fab fa-paypal";
		}else if(orderPayment === "bitcoin"){
			this.payment = "Bitcoin";
			this.icon = "fab fa-bitcoin";
		}else if(orderPayment === "icecream"){
			this.payment = "Ice Cream";
			this.icon = "fas fa-ice-cream";
		}
	}

	removeOrder(){
		this.removeThisOrder.emit(this.order);
	}

}
