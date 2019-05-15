import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ICartItem } from '../interfaces/ICartItem';

@Injectable({
  providedIn: 'root'
})
export class AddToCartService {

	private cartSource = new Subject<ICartItem>();

	addedMovie$ = this.cartSource.asObservable();

	addThis(movieToCart:ICartItem){
		this.cartSource.next(movieToCart);
	}

  	constructor() { }
}
