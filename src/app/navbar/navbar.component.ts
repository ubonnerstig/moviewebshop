import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { SearchService } from '../services/search.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
	cartVisibility: boolean = false;
	cartQty: number;
	cartQtyVisibility: boolean;
	searchForm: FormGroup = this.fb.group({
		movieName:['']
	});

	constructor(private fb: FormBuilder, private searchService: SearchService, private cartService: CartService) {}

	ngOnInit() {
		this.cartService.thisMovie$.subscribe(addedMovie => {
			this.cartQty = addedMovie.totalQty;
			this.checkCartQty(addedMovie.totalQty);
		});
		let qty = this.cartService.getCart();
		this.cartQty = qty.totalQty;
		this.checkCartQty(this.cartQty);
	}

	get movieName(){
		return this.searchForm.get('movieName') as FormControl; 
	}

	movieSearch(){
		this.searchService.searchThis(this.movieName.value);
	}

	toggleCart(visibility: boolean){
		this.cartVisibility = visibility;
	}

	checkCartQty(quantity: number){
		this.cartQty = quantity;
		if(quantity > 0){
			this.cartQtyVisibility = true;
		}else{
			this.cartQtyVisibility = false;
		}
	}
}
