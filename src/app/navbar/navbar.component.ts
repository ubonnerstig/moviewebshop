import { Component, OnInit, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { SearchService } from '../services/search.service';
import { CartService } from '../services/cart.service';
import { Data, Router, NavigationEnd } from '@angular/router';
import { DataService } from '../services/data.service';
import { ICategory } from '../interfaces/ICategory';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
	cartVisibility: boolean = false;
	cartQty: number;
	cartQtyVisibility: boolean;
	categories: ICategory[];
	miniLogo: boolean;
	hideShowNav: boolean;
	href: string;

	selectedCategory = new FormControl('All');

	constructor(private fb: FormBuilder, private searchService: SearchService, private cartService: CartService, private dataService: DataService, private router:Router) {}

	ngOnInit() {
		this.dataService.getCategories().subscribe(categories => {
			this.categories = categories;
		});
		
		this.cartService.thisMovie$.subscribe(addedMovie => {
			this.cartQty = addedMovie.totalQty;
			this.checkCartQty(addedMovie.totalQty);
		});
		let qty = this.cartService.getCart();
		this.cartQty = qty.totalQty;
		this.checkCartQty(this.cartQty);

		this.href = this.router.url;
		this.router.events.forEach((event) => {
			if(event instanceof NavigationEnd) {
				if(event.url === "/"){
					this.hideShowNav = false;
				}else{
					this.hideShowNav = true;
				}
			}
		});
	}

	get category(){
		return this.selectedCategory as FormControl; 
	}

	movieSearch(search: string){
		this.searchService.searchThis(search);
	}

	toggleCart(visibility: boolean){
		this.cartVisibility = visibility;
	}

	toggleCartMobile(){
		this.cartVisibility = !this.cartVisibility;
	}

	checkCartQty(quantity: number){
		this.cartQty = quantity;
		if(quantity > 0){
			this.cartQtyVisibility = true;
		}else{
			this.cartQtyVisibility = false;
		}
	}

	categorySearch(){
		this.searchService.getCategory(this.category.value);
	}

	@HostListener('window:scroll', ['$event']) onScrollEvent(event){
		if (event.target['scrollingElement'].scrollTop  >= 170){
			this.miniLogo = true;
			if(!this.hideShowNav){
				document.getElementById("homeControls").style.flex = "75%";
			}
		}else if(event.target['scrollingElement'].scrollTop <= 170) {
			this.miniLogo = false;
		}
	}
}
