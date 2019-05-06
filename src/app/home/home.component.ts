import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { IMovie } from '../interfaces/IMovie';
import { DataService } from '../services/data.service';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
	@Output() bodyScrollEmit = new EventEmitter<boolean>();

	movies: IMovie[];
	modalVisability: boolean = true;
	modalMovie: IMovie;

	constructor(dataService: DataService) {
		dataService.getData().subscribe(movies =>  {
			this.movies = movies;
			this.modalMovie = this.movies[0];
		});
	}

	ngOnInit() {
	}

	toggleModal(){
		this.modalVisability = !this.modalVisability;

		if(this.modalVisability){
			console.log(this.modalVisability);
			this.bodyScrollEmit.emit(false);
		}else{
			console.log(this.modalVisability);
			this.bodyScrollEmit.emit(true);
		}
	}

	movieInfo(movie: IMovie){
		this.toggleModal();
		this.modalMovie = movie;
	}

}