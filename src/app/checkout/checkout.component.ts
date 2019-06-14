import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { ICart } from '../interfaces/ICart';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IOrder } from '../interfaces/IOrder';
import { DataService } from '../services/data.service';
import { IOrderItem } from '../interfaces/IOrderItem';
import { ICartItem } from '../interfaces/ICartItem';
import * as moment from 'moment';
import { Router, NavigationEnd } from '@angular/router';
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

	constructor(private cartService: CartService, private fb: FormBuilder, private http: DataService, private router: Router, private completeOrder: OrderCompleteService){ }

	ngOnInit(){
		this.cartService.thisMovie$.subscribe(addedMovie => {
			this.cartContent = addedMovie;
			this.checkContentLength(this.cartContent.cartItems.length);
		});
		this.cartContent = this.cartService.getCart();
		this.checkContentLength(this.cartContent.cartItems.length);

		this.cartToOrder = this.mapCart();

		this.router.events.subscribe((evt) => {
			if (!(evt instanceof NavigationEnd)) {
				return;
			}
			window.scrollTo(0, 0)
		});
	}

	mapCart(): IOrderItem[]{
		return this.cartContent.cartItems.map((item: ICartItem) => {
			return { 
				productId: item.movie.id, 
				amount: item.quantity
			};
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
		this.cartService.removeFromCart(cartItem);
	}

	changeQuantity(cartItem: ICartItem){
		this.cartService.changeQuantity(cartItem);
	}

	validateOrder(){
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
		this.order = {
			id: 0,
			companyId: 8,
			created: this.date,
			createdBy: this.orderDetails.value.firstName,
			paymentMethod: this.orderDetails.value.paymentMethod,
			totalPrice: this.cartContent.totalPrice,
			status: 0,
			orderRows: this.cartToOrder
		}
		
		// {
		// 	firstName: this.orderDetails.value.firstName,
		// 	lastName:  this.orderDetails.value.lastName,
		// 	address: {
		// 		street: this.orderDetails.value.street,
		// 		postal: this.orderDetails.value.postal,
		// 		city: this.orderDetails.value.city
		// 	},
		// 	email:  this.orderDetails.value.email
		// },
		// this.http.postOrder(this.order).subscribe();

		this.http.postOrder(this.order).subscribe(
			(response)=>{
			this.completeOrder.placeOrder(response);
			this.cartService.clearCart();
			this.router.navigate(["/ordercomplete"]);
			
			},(error)=>{
				alert("Something went wrong, please try again");
			}
		)
	}
}
