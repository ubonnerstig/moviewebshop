import { Component, OnInit, Input } from '@angular/core';
import { IMovie } from '../interfaces/IMovie';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {
	@Input() modalMovie: IMovie;

	constructor() { }

	ngOnInit() {
	}

}
