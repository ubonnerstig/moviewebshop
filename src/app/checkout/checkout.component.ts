import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { ICart } from '../interfaces/ICart';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { IOrder } from '../interfaces/IOrder';
import { DataService } from '../services/data.service';
import { Observable } from 'rxjs';
import { IOrderItem } from '../interfaces/IOrderItem';
import { IMovie } from '../interfaces/IMovie';
import { ICartItem } from '../interfaces/ICartItem';

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
	orderForm: FormGroup = this.fb.group({
		firstName:[''],
		lastName:[''],
		address:[''],
		postal:[''],
		city:[''],
		email:[''],
		paymentMethod:['']
	});

	constructor(private cartService: CartService, private fb: FormBuilder, private http: DataService) { }

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
			return { productId: item.movie.id, amount: item.quantity};
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
		console.log(cartItem);
		this.cartService.removeFromCart(cartItem);
		// this.checkContentLength(this.cartContent.cartItems.length);
	}

	changeQuantity(cartItem: ICartItem){
		console.log(cartItem);
		this.cartService.changeQuantity(cartItem);
	}

	placeOrder(){
		this.order = {
			orderContent:this.cartToOrder,
			user: this.orderDetails.value,
			total: this.cartContent.totalPrice
		}
		console.log(this.order);
		this.http.postOrder(this.order);

		this.http.postOrder(this.order).subscribe((response)=>{
			console.log('response from post data is ', response);
		  },(error)=>{
			console.log('error during post is ', error)
		  })
	}

}
