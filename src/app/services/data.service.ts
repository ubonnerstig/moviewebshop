import { Injectable } from '@angular/core';
import { IDataService } from '../interfaces/IDataService';
import { Observable } from 'rxjs';
import { IMovie } from '../interfaces/IMovie';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService implements IDataService {
	movies: IMovie[];
	searchedMovies: IMovie[];
	orders

	constructor(private httpClient: HttpClient) { }

	getData(): Observable<IMovie[]>{
		return this.httpClient.get<IMovie[]>('https://medieinstitutet-wie-products.azurewebsites.net/api/products');
	}

	getSearch(searchString: string): Observable<IMovie[]>{
		if(searchString === "" || searchString === null || searchString === undefined){
			return this.getData();
		}else{
			return this.httpClient.get<IMovie[]>('https://medieinstitutet-wie-products.azurewebsites.net/api/search?searchText='+searchString);
		}
	}


}
