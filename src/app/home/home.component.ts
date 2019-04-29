import { Component, OnInit } from '@angular/core';
import { IMovie } from '../interfaces/IMovie';
import { DataService } from '../services/data.service';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
	movies: IMovie[];
	modalVisability: boolean;

	constructor(dataService: DataService) {
		dataService.getData().subscribe(movies => this.movies = movies);
	 }

	ngOnInit() {
	}

	toggleModal(){
		this.modalVisability = !this.modalVisability;

		if(this.modalVisability){

		}else{
			
		}
	}

}