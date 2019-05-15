import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IMovie } from '../interfaces/IMovie';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {
	@Input() modalMovie: IMovie;
	@Output() closeThisModal = new EventEmitter<boolean>();

	constructor() { }

	ngOnInit() {
	}

	closeModal(){
		this.closeThisModal.emit();
	}

	addToCart(quantity){
		console.log(quantity);
		console.log(this.modalMovie);
		// this.searchService.searchThis(this.addedMovie.value);
	}

}
