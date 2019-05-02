import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintMovieComponent } from './print-movie.component';
import { Component } from '@angular/core';
import { IMovie } from '../interfaces/IMovie';

describe('PrintMovieComponent', () => {
	let testComponent: TestHostComponent;
	let testFixture: ComponentFixture<TestHostComponent>;
	//let component: PrintMovieComponent;
	//let fixture: ComponentFixture<PrintMovieComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
		declarations: [ PrintMovieComponent, TestHostComponent ]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		testFixture = TestBed.createComponent(TestHostComponent);
		testComponent = testFixture.componentInstance;
		testFixture.detectChanges();

		// fixture = TestBed.createComponent(PrintMovieComponent);
		// component = fixture.componentInstance;
		// fixture.detectChanges();
	});

	it('should create', () => {
		expect(testComponent).toBeTruthy();
	});

	it('should set value to inputdecorator', () => {
		testComponent.setInput({ id: 1, name: 'Batcat the cat bat', description: 'lol', price: 122,imageUrl: 'https://fashionjitsudotcom.files.wordpress.com/2017/10/screen-shot-2017-09-25-at-2-52-46-pm.png',year: 1999,added: 'datum',productCategory:[]});
		testFixture.detectChanges();
		expect(testComponent.movie.name).toBe('Batcat the cat bat');
	 	//expect(testFixture.nativeElement.querySelector('p').innerText).toEqual('Batcat the cat bat');
	 	//expect(testFixture.nativeElement.querySelector('div').innerHTML).toEqual(`<img _ngcontent-a-c10="" src="https://fashionjitsudotcom.files.wordpress.com/2017/10/screen-shot-2017-09-25-at-2-52-46-pm.png"><p _ngcontent-a-c10="" class="title"> Batcat the cat bat </p><button _ngcontent-a-c10="">Check</button>`);
	});

	// describe('movieInfo', () => {
	// 	it('should emit on click', () => {
	// 		const fixture = TestBed.createComponent(PrintMovieComponent);
	// 		const component = fixture.componentInstance; 
	// 		spyOn(component.thisMovieInfo, 'emit');
	
	// 		const nativeElement = testFixture.nativeElement;
	// 		const div = nativeElement.querySelector('div');
			
	// 		console.log(div);
	// 		div.dispatchEvent(new Event('click'));
	
	// 		//expect(component.thisMovieInfo.emit).toHaveBeenCalled();
	
	// 		// component.getMovieInfo();
	
	// 		// console.log(component.movieInfo);
	// 		// console.log(component.movie);
	
	
	// 		// console.log(component);
	// 		// // trigger the click
			
	
	// 		// console.log(div);
	
	// 		// //let movie = {id: 1, name: 'Batcat the cat bat', description: 'lol', price: 122, imageUrl: 'https://fashionjitsudotcom.files.wordpress.com/2017/10/screen-shot-2017-09-25-at-2-52-46-pm.png',year: 1999,added: 'datum',productCategory:[]};
	// 		// 
	// 		// testFixture.detectChanges();
		 
	// 		//expect(component.movieInfo.emit).toHaveBeenCalledWith({id: 1, name: 'Batcat the cat bat', description: 'lol', price: 122, imageUrl: 'https://fashionjitsudotcom.files.wordpress.com/2017/10/screen-shot-2017-09-25-at-2-52-46-pm.png',year: 1999,added: 'datum',productCategory:[]});
	// 	 });

	// });

	@Component({
		selector: `host-component`,
		template: `<app-print-movie [movie]="{ id: 1, name: 'Batcat the cat bat', description: 'lol', price: 122,imageUrl: 'https://fashionjitsudotcom.files.wordpress.com/2017/10/screen-shot-2017-09-25-at-2-52-46-pm.png',year: 1999,added: 'datum',productCategory:[]}" (thisMovieInfo)="movieInfo($event)"></app-print-movie>`
		//template: `<app-print-movie [movie]="theMovie"></app-print-movie>`
	})
	class TestHostComponent {
		movie: IMovie;

		setInput(theMovie: IMovie) {
			this.movie = theMovie;
			// console.log(this.movie.imageUrl);
			// console.log(this.movie.name);
		}

		// movieInfo(movie: IMovie){
		// 	//console.log(movie);
		// }

	}
});
