import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { IMovie } from '../interfaces/IMovie';
import { DataService } from '../services/data.service';
import { BodyScrollService } from '../services/body-scroll.service';
import { SearchService } from '../services/search.service';
import { Router, NavigationEnd } from '@angular/router';

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

	constructor(private dataService: DataService, private scrollService: BodyScrollService, private searchService: SearchService, private router: Router) {
		this.handleSearch = this.handleSearch.bind(this);
		this.handleCategory = this.handleCategory.bind(this);
	}

	ngOnInit() {
		this.dataService.getData().subscribe(movies => {
			this.movies = movies;
			this.modalMovie = this.movies[0];
		});
		this.searchService.chosenCategory$.subscribe(this.handleCategory);
		this.searchService.searchedString$.subscribe(this.handleSearch);

		this.router.events.subscribe((evt) => {
			if (!(evt instanceof NavigationEnd)) {
				return;
			}
			window.scrollTo(0, 0)
		});
	}

	handleSearch(movieSearch: string){	
		this.dataService.getSearch(movieSearch).subscribe(searchedMovies => {
			this.movies = searchedMovies;
			this.moviesFound(this.movies.length);
		});
	}

	handleCategory(category: string){
		this.movies = this.dataService.getMoviesFromCategory(category);
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