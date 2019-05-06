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

	closeModal(){
		this.closeThisModal.emit();
		//console.log(closeIt);
	}
	constructor() { }

	ngOnInit() {
	}

}
