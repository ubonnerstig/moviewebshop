import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  	providedIn: 'root'
})
export class SearchService {

	private searchSource = new Subject<string>();

	searchedString$ = this.searchSource.asObservable();

	searchThis(movieName:string){
		this.searchSource.next(movieName);
	}

  	constructor() { }
}
