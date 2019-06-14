import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { IOrder } from '../interfaces/IOrder';

@Injectable({
  providedIn: 'root'
})
export class OrderCompleteService {

	private order: IOrder;
	private orderSource = new Subject<IOrder>();

	thisOrder$ = this.orderSource.asObservable();

	placeOrder(order: IOrder){
		this.order = order;
		this.orderSource.next(order);
	}

	getOrder(){
		return this.order;
	}

  constructor() { }
}
