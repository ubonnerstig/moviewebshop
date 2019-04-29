import { Injectable } from '@angular/core';
import { IDataService } from '../interfaces/IDataService';
import { Observable } from 'rxjs';
import { IMovie } from '../interfaces/IMovie';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService implements IDataService {
	movies: IMovie[]

	constructor(private httpClient: HttpClient, service: DataService) { }

	getData(): Observable<IMovie[]>{
		return this.httpClient.get<IMovie[]>('https://medieinstitutet-wie-products.azurewebsites.net/api/products');
	}

	// ngOnInit(){
	// 	this.movies = this.service.getData();
	// }
}
