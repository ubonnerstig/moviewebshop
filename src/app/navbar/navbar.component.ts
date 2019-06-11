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
		// this.router.events.subscribe((val) => {
		// 	console.log(val);
		// });
		this.router.events.forEach((event) => {
			if(event instanceof NavigationEnd) {
				console.log(event.url);
				// console.log(event.url.replace("/",""));
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

	@HostListener('window:scroll', ['$event']) onScrollEvent($event){
		// console.log($event.path[1].scrollY);
		if ($event.path[1].scrollY >= 170){
			this.miniLogo = true;
			if(!this.hideShowNav){
				document.getElementById("homeControls").style.flex = "80%";
			}
			// console.log(document.getElementById("mini_logo").style);
			// console.log(document.getElementsByClassName("home_controls")[0].clientWidth);
			// document.getElementsByClassName("home_controls")[0].clientWidth
			// console.log(document.getElementById("homeControls").style);

			// console.log($event.path[1].scrollY - 170);
		}else if($event.path[1].scrollY <= 170) {
			this.miniLogo = false;
			// console.log(document.getElementById("mini_logo").style.width);
		}
	}
}
