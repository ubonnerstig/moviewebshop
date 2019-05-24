import { Injectable } from '@angular/core';
import { IDataService } from '../interfaces/IDataService';
import { Observable } from 'rxjs';
import { IMovie } from '../interfaces/IMovie';
import { HttpClient } from '@angular/common/http';
import { IOrder } from '../interfaces/IOrder';

@Injectable({
  providedIn: 'root'
})
export class DataService implements IDataService {
	movies: IMovie[];
	searchedMovies: IMovie[];
	orders: IOrder[];

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

	getOrders(): Observable<IOrder[]>{
		return this.httpClient.get<IOrder[]>('https://medieinstitutet-wie-products.azurewebsites.net/api/orders?companyId=8');
	}

	postOrder(order: IOrder): Observable<IOrder>{
		return this.httpClient.post<IOrder>('https://medieinstitutet-wie-products.azurewebsites.net/api/orders', {'companyId':8, 'created':'2019-04-01T00:00:00', 'createdBy':order.user.email, 'paymentMethod':order.user.paymentMethod, 'totalPrice':order.total, 'status':0, 'orderRows':order.orderContent});
	}

	deleteOrder(orderId: number): Observable<IOrder>{
		return this.httpClient.delete<IOrder>('https://medieinstitutet-wie-products.azurewebsites.net/api/orders/'+orderId);
	}

}
