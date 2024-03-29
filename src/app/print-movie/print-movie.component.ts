import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IMovie } from '../interfaces/IMovie';
import { ICartItem } from '../interfaces/ICartItem';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-print-movie',
  templateUrl: './print-movie.component.html',
  styleUrls: ['./print-movie.component.css']
})
export class PrintMovieComponent implements OnInit {
	@Input() movie: IMovie;
	@Output() thisMovieInfo = new EventEmitter<IMovie>();

	cartMovie: ICartItem;

	getMovieInfo(){
		this.thisMovieInfo.emit(this.movie);
	}

	constructor(private cartService: CartService) { }

	ngOnInit() {
	}

	addToCart(event: Event){
		event.stopPropagation();
		this.cartService.addToCart(this.movie, 1);
	}

}
