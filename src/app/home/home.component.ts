import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { IMovie } from '../interfaces/IMovie';
import { DataService } from '../services/data.service';
import { BodyScrollService } from '../services/body-scroll.service';
import { SearchService } from '../services/search.service';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

	movies: IMovie[];
	modalVisability: boolean = true;
	modalMovie: IMovie;

	bodyScroll: boolean;

	movieSearch: string;
	movieSearchResult: IMovie[];

	constructor(private dataService: DataService, private scrollService: BodyScrollService, searchService: SearchService) {
		dataService.getData().subscribe(movies => {
			this.movies = movies;
			this.modalMovie = this.movies[0];
		});

		searchService.searchedString$.subscribe(
			movieSearch => {
				this.movieSearch = movieSearch;

				this.dataService.getSearch(this.movieSearch).subscribe(
					searchedMovies => {
						this.movies = searchedMovies;
						console.log(this.movieSearch);
						console.log(this.movieSearchResult);
					});


			}
		);

	}

	ngOnInit() {

	}

	toggleModal(){
		this.modalVisability = !this.modalVisability;

		if(this.modalVisability){
			this.bodyScroll = false;
			this.scrollService.toggleScroll(this.bodyScroll);
		}else{
			this.bodyScroll = true;
			this.scrollService.toggleScroll(this.bodyScroll);
		}
	}

	movieInfo(movie: IMovie){
		this.toggleModal();
		this.modalMovie = movie;
	}

}