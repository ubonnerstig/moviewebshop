import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { PrintMovieComponent } from '../print-movie/print-movie.component';
import { DataService } from '../services/data.service';
import { MockDataService } from '../services/mock-data.service';

describe('HomeComponent', () => {
	let component: HomeComponent;
	let fixture: ComponentFixture<HomeComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
		declarations: [ HomeComponent, PrintMovieComponent ]
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

});
