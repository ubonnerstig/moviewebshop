import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { PrintMovieComponent } from '../print-movie/print-movie.component';
import { DataService } from '../services/data.service';
import { MockDataService } from '../services/mock-data.service';
import { MovieDetailsComponent } from '../movie-details/movie-details.component';

describe('HomeComponent', () => {
	let component: HomeComponent;
	let fixture: ComponentFixture<HomeComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
		declarations: [ HomeComponent, PrintMovieComponent, MovieDetailsComponent ]
		})
		.overrideComponent(HomeComponent, {set: { providers: [{ provide:
		DataService, useClass: MockDataService}]}})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(HomeComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should be an array with four objects', () =>{
		expect(component.movies.length).toBe(4);
	});

	it('should toggle modal visability', () => {
		expect(component.modalVisability).toBeTruthy();
		expect(component.bodyScroll).toBeFalsy();
		component.toggleModal();
		expect(component.modalVisability).toBeFalsy();
		expect(component.bodyScroll).toBeTruthy();
	});

	it('should recieve movie from child', () => {
		component.movieInfo({ id: 1, name: 'Batcat the cat bat', description: 'lol', price: 122,imageUrl: 'https://fashionjitsudotcom.files.wordpress.com/2017/10/screen-shot-2017-09-25-at-2-52-46-pm.png',year: 1999,added: 'datum',productCategory:[]});
		expect(component.modalMovie.name).toBe('Batcat the cat bat');
	});

});
