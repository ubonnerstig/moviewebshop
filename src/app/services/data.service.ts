import { Injectable } from '@angular/core';
import { IDataService } from '../interfaces/IDataService';
import { Observable, forkJoin } from 'rxjs';
import { IMovie } from '../interfaces/IMovie';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IOrder } from '../interfaces/IOrder';
import { ICategory } from '../interfaces/ICategory';
import { ICategoryList } from '../interfaces/ICategoryList';

@Injectable({
  	providedIn: 'root'
})
export class DataService implements IDataService {
	movies:IMovie[];
	searchedMovies: IMovie[];
	orders: IOrder[];
	categories: ICategory[];
	savedCategories: ICategoryList[];
	categoryMovies: IMovie[];

	constructor(private httpClient: HttpClient) { 
		forkJoin([this.getData(), this.getCategories()]).subscribe(results => {
			this.categoryLists(results[0], results[1]);
			this.movies = results[0];
		});
	}

	getData(): Observable<IMovie[]>{
		return this.httpClient.get<IMovie[]>('https://medieinstitutet-wie-products.azurewebsites.net/api/products');
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
		if(searchString === "" || searchString === null || searchString === undefined){
			return this.getData();
		}else{
			return this.httpClient.get<IMovie[]>('https://medieinstitutet-wie-products.azurewebsites.net/api/search?searchText='+searchString);
		}
	}

	getCategories(): Observable<ICategory[]>{
		return this.httpClient.get<ICategory[]>('https://medieinstitutet-wie-products.azurewebsites.net/api/categories');
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
		return this.httpClient.get<IOrder[]>('https://medieinstitutet-wie-products.azurewebsites.net/api/orders?companyId=8');
	}

	postOrder(order: IOrder): Observable<IOrder>{
		let headers = new HttpHeaders();
		headers = headers.set('Content-Type', 'application/json; charset=utf-8');
		return this.httpClient.post<IOrder>('https://medieinstitutet-wie-products.azurewebsites.net/api/orders',  JSON.stringify(order), {headers: headers});
	}

	deleteOrder(orderId: number): Observable<IOrder>{
		return this.httpClient.delete<IOrder>('https://medieinstitutet-wie-products.azurewebsites.net/api/orders/'+orderId);
	}

}
