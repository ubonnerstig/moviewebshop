import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { ICart } from '../interfaces/ICart';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
	cartContent: ICart;
	orderForm: FormGroup = this.fb.group({
		firstName:[''],
		lastName:[''],
		address:[''],
		postal:[''],
		city:[''],
		email:['']
	});

	constructor(private cartService: CartService, private fb: FormBuilder) { }

	ngOnInit() {
		this.cartContent =	this.cartService.getCart();
		this.cartService.thisMovie$.subscribe(addedMovie => {
			this.cartContent = addedMovie;
		});
	}

}
