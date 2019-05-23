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

	noMovies: boolean;

	constructor(private dataService: DataService, private scrollService: BodyScrollService, private searchService: SearchService) {
		this.handleSearch = this.handleSearch.bind(this);
	}

	ngOnInit() {
		this.dataService.getData().subscribe(movies => {
			this.movies = movies;
			this.modalMovie = this.movies[0];
		});

		this.searchService.searchedString$.subscribe(this.handleSearch);
	}

	handleSearch(movieSearch: string){	
		this.dataService.getSearch(movieSearch).subscribe(searchedMovies => {
			this.movies = searchedMovies;
			this.moviesFound(this.movies.length);
		});
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

	moviesFound(arrayLength){
		if(arrayLength == 0){
			this.noMovies = true;
		}else{
			this.noMovies = false;
		}
	}

}