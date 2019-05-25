import { Injectable } from '@angular/core';
import { IMovie } from '../interfaces/IMovie';
import { IDataService } from '../interfaces/IDataService';
import { Observable, of } from 'rxjs';
import { IOrder } from '../interfaces/IOrder';

@Injectable({
  providedIn: 'root'
})
export class MockDataService implements IDataService {

	movies: IMovie[] = [
		{
			id: 1,
			name: "One",
			description: "Description One",
			price: 199,
			imageUrl: "https://fashionjitsudotcom.files.wordpress.com/2017/10/screen-shot-2017-09-25-at-2-52-46-pm.png",
			year: 1999,
			added: "datum",
			productCategory:[]
		},
		{
			id: 2,
			name: "Two",
			description: "Description One",
			price: 199,
			imageUrl: "https://fashionjitsudotcom.files.wordpress.com/2017/10/screen-shot-2017-09-25-at-2-52-46-pm.png",
			year: 1999,
			added: "datum",
			productCategory:[]
		},
		{
			id: 3,
			name: "Three",
			description: "Description One",
			price: 199,
			imageUrl: "https://fashionjitsudotcom.files.wordpress.com/2017/10/screen-shot-2017-09-25-at-2-52-46-pm.png",
			year: 1999,
			added: "datum",
			productCategory:[]
		},
		{
			id: 4,
			name: "Four",
			description: "Description One",
			price: 199,
			imageUrl: "https://fashionjitsudotcom.files.wordpress.com/2017/10/screen-shot-2017-09-25-at-2-52-46-pm.png",
			year: 1999,
			added: "datum",
			productCategory:[]
		},
	];

	orders: IOrder[] = [
		{
			id: 1,
			companyId: 8,
			created: "2019-04-01T00:00:00",
			createdBy: "",
			paymentMethod: "userChoice",
			totalPrice: 1021,
			status: 0,
			orderRows: []
		},
		{
			id:2,
			companyId: 8,
			created: "2019-04-01T00:00:00",
			createdBy: "",
			paymentMethod: "userChoice",
			totalPrice: 1021,
			status: 0,
			orderRows: []
		},
		{
			id:3,
			companyId: 8,
			created: "2019-04-01T00:00:00",
			createdBy: "",
			paymentMethod: "userChoice",
			totalPrice: 1021,
			status: 0,
			orderRows: []
		},
		{
			id:4,
			companyId: 8,
			created: "2019-04-01T00:00:00",
			createdBy: "",
			paymentMethod: "userChoice",
			totalPrice: 1021,
			status: 0,
			orderRows: []
		}
	]

	searchedMovies: IMovie[] = [];

	getData(): Observable<IMovie[]>{
		return of(this.movies);
	}

	getSearch(searchString: string): Observable<IMovie[]>{
		for(let i = 0; i < this.movies.length; i++) {
			if(this.movies[i].name.indexOf(searchString) >= 0) {
				this.searchedMovies.push(this.movies[i]);
			}
		}
		return of(this.searchedMovies);
	}

	getOrders(): Observable<any>{
		return of(this.orders);
	}

	postOrder(order: IOrder): Observable<any>{
		return of(this.orders.push(
			{
				id: 1,
				companyId: 8,
				created: "2019-04-01T00:00:00",
				createdBy: order.createdBy,
				paymentMethod: "userChoice",
				totalPrice: order.totalPrice,
				status: 0,
				orderRows: order.orderRows
			}
		));
	}
  	constructor() { }
}
