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
		this.updateOrders();
	}

	updateOrders(){
		this.http.getOrders().subscribe(orders => {
			this.orders = orders;
		});
	}
	
	removeOrder(order: IOrder){
		this.http.deleteOrder(order.id).subscribe((response)=>{
			this.updateOrders();
		},(error)=>{
			alert("Something went wrong, try again later");
		});
	}
}
