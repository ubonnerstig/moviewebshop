import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IMovie } from '../interfaces/IMovie';
import { CartService } from '../services/cart.service';
import { ICartItem } from '../interfaces/ICartItem';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {
	@Input() modalMovie: IMovie;
	@Output() closeThisModal = new EventEmitter<boolean>();

	cartMovie: ICartItem;

	constructor(private cartService: CartService) { }

	ngOnInit() {
	}

	closeModal(){
		this.closeThisModal.emit();
	}

	addToCart(inputQuantity: number){
		this.cartMovie = {
			movie: this.modalMovie,
			quantity: +inputQuantity
		}
		this.cartService.addToCart(this.cartMovie);

		this.closeModal();
	}
}
