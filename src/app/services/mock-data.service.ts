import { Injectable } from '@angular/core';
import { IMovie } from '../interfaces/IMovie';
import { IDataService } from '../interfaces/IDataService';
import { Observable, of } from 'rxjs';
import { IOrder } from '../interfaces/IOrder';
import { ICategory } from '../interfaces/ICategory';
import { ICategoryList } from '../interfaces/ICategoryList';

@Injectable({
  providedIn: 'root'
})
export class MockDataService implements IDataService {

	savedCategories: ICategoryList[];

	constructor() { 
		this.categoryLists(this.movies, this.categories);
	}

	movies: IMovie[] = [
		{
			id: 1,
			name: "One",
			description: "Description One",
			price: 199,
			imageUrl: "https://fashionjitsudotcom.files.wordpress.com/2017/10/screen-shot-2017-09-25-at-2-52-46-pm.png",
			year: 1999,
			added: "datum",
			productCategory:[{
				categoryId: 5
			}]
		},
		{
			id: 2,
			name: "Two",
			description: "Description One",
			price: 199,
			imageUrl: "https://fashionjitsudotcom.files.wordpress.com/2017/10/screen-shot-2017-09-25-at-2-52-46-pm.png",
			year: 1999,
			added: "datum",
			productCategory:[{
				categoryId: 6
			}]
		},
		{
			id: 3,
			name: "Three",
			description: "Description One",
			price: 199,
			imageUrl: "https://fashionjitsudotcom.files.wordpress.com/2017/10/screen-shot-2017-09-25-at-2-52-46-pm.png",
			year: 1999,
			added: "datum",
			productCategory:[{
				categoryId: 7
			}]
		},
		{
			id: 4,
			name: "Four",
			description: "Description One",
			price: 199,
			imageUrl: "https://fashionjitsudotcom.files.wordpress.com/2017/10/screen-shot-2017-09-25-at-2-52-46-pm.png",
			year: 1999,
			added: "datum",
			productCategory:[{
				categoryId: 8
			}]
		},
	];

	orders: IOrder[] = [
		{
			id: 1,
			companyId: 8,
			created: "2019-04-01T00:00:00",
			createdBy: "hej",
			paymentMethod: "userChoice",
			totalPrice: 1021,
			status: 0,
			orderRows: []
		},
		{
			id:2,
			companyId: 8,
			created: "2019-04-01T00:00:00",
			createdBy: "hej",
			paymentMethod: "userChoice",
			totalPrice: 1021,
			status: 0,
			orderRows: []
		},
		{
			id:3,
			companyId: 8,
			created: "2019-04-01T00:00:00",
			createdBy: "hej",
			paymentMethod: "userChoice",
			totalPrice: 1021,
			status: 0,
			orderRows: []
		},
		{
			id:4,
			companyId: 8,
			created: "2019-04-01T00:00:00",
			createdBy: "hej",
			paymentMethod: "userChoice",
			totalPrice: 1021,
			status: 0,
			orderRows: []
		}
	];

	categories: ICategory[] = [
		{
			id:5,
			name:"Action"
		},
		{
			id:6,
			name:"Thriller"
		},
		{
			id:7,
			name:"Comedy"
		},
		{
			id:8,
			name:"Sci-fi"
		}
	];

	searchedMovies: IMovie[] = [];

	getData(): Observable<IMovie[]>{
		return of(this.movies);
	}

	categoryLists(movies: IMovie[], categories: ICategory[]){
		this.savedCategories = [];
		for(let i = 0; i < categories.length; i++){
			this.savedCategories.push({id: categories[i].id, movies: []});
			for(let j = 0; j < movies.length; j++){
				for(let k = 0; k < movies[j].productCategory.length; k++){
					if(movies[j].productCategory[k].categoryId === categories[i].id){
						this.savedCategories[i].movies.push(movies[j]);
					}
				}
			}
		}
	}
	
	getSearch(searchString: string): Observable<IMovie[]>{
		for(let i = 0; i < this.movies.length; i++) {
			if(this.movies[i].name.indexOf(searchString) >= 0) {
				this.searchedMovies.push(this.movies[i]);
			}
		}
		return of(this.searchedMovies);
	}

	getCategories(): Observable<ICategory[]>{
		return of(this.categories);
	}

	getMoviesFromCategory(id: string){
		if(id === "All"){
			return this.movies;
		}else{
			for(let i = 0; i < this.savedCategories.length; i++){
				if(this.savedCategories[i].id === +id){
					return this.savedCategories[i].movies;
				}
			}
		}
	}

	getOrders(): Observable<IOrder[]>{
		return of(this.orders);
	}

	postOrder(order: IOrder): Observable<any>{
		return of(this.orders.push(order));
	}

	deleteOrder(orderId: number): Observable<IOrder>{
		return;
	}
  	
}
