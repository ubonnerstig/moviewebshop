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
	});

	it('should create', () => {
		expect(testComponent).toBeTruthy();
	});

	it('should set value to inputdecorator', () => {
		testComponent.setInput({ id: 1, name: 'Batcat the cat bat', description: 'lol', price: 122,imageUrl: 'https://fashionjitsudotcom.files.wordpress.com/2017/10/screen-shot-2017-09-25-at-2-52-46-pm.png',year: 1999,added: 'datum',productCategory:[{categoryId: 8}]});
		testFixture.detectChanges();
		expect(testComponent.movie.name).toBe('Batcat the cat bat');
	});

	@Component({
		selector: `host-component`,
		template: `<app-print-movie [movie]="{ id: 1, name: 'Batcat the cat bat', description: 'lol', price: 122,imageUrl: 'https://fashionjitsudotcom.files.wordpress.com/2017/10/screen-shot-2017-09-25-at-2-52-46-pm.png',year: 1999,added: 'datum',productCategory:[{categoryId: 1}]}" (thisMovieInfo)="movieInfo($event)"></app-print-movie>`
	})
	class TestHostComponent {
		movie: IMovie;

		setInput(theMovie: IMovie) {
			this.movie = theMovie;
		}
	}
});
