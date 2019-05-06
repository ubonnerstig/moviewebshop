import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
 	providedIn: 'root'
})
export class BodyScrollService {

	private bodyScrollSource = new Subject<boolean>();

	toggleScroll$ = this.bodyScrollSource.asObservable();

	toggleScroll(scroll: boolean) {
		this.bodyScrollSource.next(scroll);
	}
	
  	constructor() { }
}
