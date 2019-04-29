import { Component, OnInit } from '@angular/core';
import { IMovie } from '../interfaces/IMovie';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
	movies: IMovie[];

	constructor() { }

	ngOnInit() {
	}

}
