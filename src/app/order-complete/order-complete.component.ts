import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderCompleteService } from '../services/order-complete.service';
import { IOrder } from '../interfaces/IOrder';

@Component({
  selector: 'app-order-complete',
  templateUrl: './order-complete.component.html',
  styleUrls: ['./order-complete.component.css']
})
export class OrderCompleteComponent implements OnInit {
	order: IOrder;
	constructor(private orderComplete: OrderCompleteService, private router: Router) { }

	ngOnInit() {
		this.orderComplete.thisOrder$.subscribe(order => {
			this.order = order;
		});
		this.order = this.orderComplete.getOrder();
		this.checkOrder(this.order);
	}

	checkOrder(order: IOrder){
		if(order === undefined){
			this.router.navigate([""]);
		}
	}
}
