import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  	providedIn: 'root'
})
export class SearchService {

	private searchSource = new Subject<string>();
	private categorySource = new Subject<string>();

	searchedString$ = this.searchSource.asObservable();
	chosenCategory$ = this.categorySource.asObservable();

	searchThis(movieName:string){
		this.searchSource.next(movieName);
	}

	getCategory(movieCategory:string){
		this.categorySource.next(movieCategory);
	}

  	constructor() { }
}
