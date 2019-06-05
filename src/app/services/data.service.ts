import { Injectable } from '@angular/core';
import { IDataService } from '../interfaces/IDataService';
import { Observable } from 'rxjs';
import { IMovie } from '../interfaces/IMovie';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
		// let user = JSON.stringify(order.createdBy);
		// let orderRows = JSON.stringify(order.orderRows);
		// console.log(user);
		// console.log(typeof(orderRows));

		// let objectRows = JSON.parse(orderRows);
		// console.log(typeof(objectRows));
		// return;
		let headers = new HttpHeaders();
		headers = headers.set('Content-Type', 'application/json; charset=utf-8');
		return this.httpClient.post<IOrder>('https://medieinstitutet-wie-products.azurewebsites.net/api/orders',  JSON.stringify(order), {headers: headers});
		//return this.httpClient.post<IOrder>('https://medieinstitutet-wie-products.azurewebsites.net/api/orders/',  {"companyId":order.companyId,"created":order.created,"createdBy":order.createdBy.firstName,"paymentMethod":order.paymentMethod,"totalPrice":order.totalPrice,"status":order.status,"orderRows":[{"productId":1337, "product":{"name":"Förlåt för alla filmer", "imageUrl":"https://fashionjitsudotcom.files.wordpress.com/2017/10/screen-shot-2017-09-25-at-2-52-46-pm.png"}, "amount":1}]});
		//{"companyId":order.companyId,"created":order.created,"createdBy":{},"paymentMethod":order.paymentMethod,"totalPrice":order.totalPrice,"status":order.status,"orderRows":order.orderRows});
	}

	deleteOrder(orderId: number): Observable<IOrder>{
		return this.httpClient.delete<IOrder>('https://medieinstitutet-wie-products.azurewebsites.net/api/orders/'+orderId);
	}

}
