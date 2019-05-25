import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { ICart } from '../interfaces/ICart';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { IOrder } from '../interfaces/IOrder';
import { DataService } from '../services/data.service';
import { Observable } from 'rxjs';
import { IOrderItem } from '../interfaces/IOrderItem';
import { IMovie } from '../interfaces/IMovie';
import { ICartItem } from '../interfaces/ICartItem';

import * as moment from 'moment';
import { Constants } from '../interfaces/Constans';
import { Router } from '@angular/router';
import { OrderCompleteService } from '../services/order-complete.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
	cartContent: ICart;
	emptyCart: boolean = true;
	order: IOrder;
	cartToOrder: IOrderItem[];
	date = moment().format();
	invalidName: boolean = false;
	invalidPayment: boolean = false;

	orderForm: FormGroup = this.fb.group({
		firstName:['', Validators.required],
		lastName:[''],
		address: this.fb.group({
			street:[''],
			postal:[''],
			city:['']
		}),
		email:[''],
		paymentMethod:['', Validators.required]
	});


	constructor(private cartService: CartService, private fb: FormBuilder, private http: DataService, private router: Router, private completeOrder: OrderCompleteService) { }

	ngOnInit() {
		this.cartContent = this.cartService.getCart();
		this.cartService.thisMovie$.subscribe(addedMovie => {
			this.cartContent = addedMovie;
			this.checkContentLength(this.cartContent.cartItems.length);
		});
		this.checkContentLength(this.cartContent.cartItems.length);

		this.cartToOrder = this.mapCart();
	}

	mapCart(){
		return this.cartContent.cartItems.map((item: ICartItem) => {
			console.log(item.movie.id);
			return { productId: item.movie.id, product: {name: item.movie.name, price: item.movie.price }, amount: item.quantity};
		});
	}

	checkContentLength(contentLength: number){
		if(contentLength > 0){
			this.emptyCart = false;
		}else{
			this.emptyCart = true;
		}
	}

	get orderDetails(){
		return this.orderForm as FormGroup; 
	}

	removeFromCart(cartItem: ICartItem){
		// console.log(cartItem.movie);
		this.cartService.removeFromCart(cartItem);
		// this.checkContentLength(this.cartContent.cartItems.length);
	}

	changeQuantity(cartItem: ICartItem){
		// console.log(cartItem);
		this.cartService.changeQuantity(cartItem);
	}

	validateOrder(){
		console.log(this.orderForm);
		console.log(this.orderForm.controls.firstName.valid);
		console.log(this.orderForm.controls.paymentMethod.valid);
		if(this.orderForm.controls.firstName.valid && this.orderForm.controls.paymentMethod.valid){
			this.invalidName = !this.orderForm.controls.firstName.valid;
			this.invalidPayment = !this.orderForm.controls.paymentMethod.valid;
			this.placeOrder();
		}else{
			this.invalidName = !this.orderForm.controls.firstName.valid;
			this.invalidPayment = !this.orderForm.controls.paymentMethod.valid;
		}
	}

	placeOrder(){
		console.log("yay");
		this.order = {
			id: 0,
			companyId: 8,
			created: this.date,
			orderRows: this.cartToOrder,
			createdBy: this.orderDetails.value.firstName,
			paymentMethod: this.orderDetails.value.paymentMethod,
			status: 0,
			totalPrice: this.cartContent.totalPrice
		}
		console.log(this.cartToOrder);

				// firstName: string;this.date,
		// lastName: string;
		// address: {
		// 	street: string;
		// 	postal: number;
		// 	city: string;
		// };
		// email: string;

		// console.log(this.order);
		// this.http.postOrder(this.order);

		// this.http.postOrder(this.order).subscribe(
		// 	(response)=>{
		// 	console.log('response from post data is ', response);
		// 	console.log('username', response.createdBy);
		// 	console.log('ordernumber', response.id);

		// 	this.completeOrder.placeOrder(response);
		// 	this.cartService.clearCart();
		// 	this.router.navigate(["/ordercomplete"]);
			
		//   },(error)=>{
		// 	console.log('error during post is ', error.status)//400
		// 	alert("Something went wrong, please try again");
		//   }
		// )
	}

}
