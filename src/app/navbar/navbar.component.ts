import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { SearchService } from '../services/search.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
	cartVisability: boolean = false;
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

	toggleCart(){
		this.cartVisability = !this.cartVisability;
	}
}
