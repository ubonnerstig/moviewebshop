import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IMovie } from '../interfaces/IMovie';

@Component({
  selector: 'app-print-movie',
  templateUrl: './print-movie.component.html',
  styleUrls: ['./print-movie.component.css']
})
export class PrintMovieComponent implements OnInit {
	@Input() movie: IMovie;
	@Output() thisMovieInfo = new EventEmitter<IMovie>();

	getMovieInfo(){
		this.thisMovieInfo.emit(this.movie);
	}

	constructor() { }

	ngOnInit() {
	}

}
