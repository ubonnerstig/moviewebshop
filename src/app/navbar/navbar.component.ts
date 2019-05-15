import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { SearchService } from '../services/search.service';
import { delay } from 'q';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
	cartVisibility: boolean = false;
	searchForm: FormGroup = this.fb.group({
		movieName:['']
	});

	constructor(private fb: FormBuilder, private searchService: SearchService) {}

	ngOnInit() {

	}

	get movieName(){
		return this.searchForm.get('movieName') as FormControl; 
	}

	movieSearch(){
		this.searchService.searchThis(this.movieName.value);
	}

	// delay(ms: number) {
	// 	return new Promise( resolve => setTimeout(resolve, ms) );
	// }

	async toggleCart(visibility){
		this.cartVisibility = visibility;

		// if(!visibility){
		// 	await delay(500);
		// 	this.cartVisibility = visibility;
		// }else{
		// 	await delay(5);
		// 	this.cartVisibility = visibility;
		// }
	}
}
