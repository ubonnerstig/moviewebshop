import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { IOrder } from '../interfaces/IOrder';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
	orders: IOrder[];

  	constructor(private http: DataService) { }

  	ngOnInit() {
	  	this.http.getOrders().subscribe(orders => {
			this.orders = orders;
			console.log(this.orders);
		});
	}

	
	removeOrder(order){
		console.log(order.id);
		this.http.deleteOrder(order.id);

		this.http.deleteOrder(order.id).subscribe((response)=>{
				console.log('response from post data is ', response);
			  },(error)=>{
				console.log('error during post is ', error)
			  })
	}

}
