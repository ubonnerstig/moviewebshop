import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieDetailsComponent } from './movie-details.component';
import { IMovie } from '../interfaces/IMovie';
import { Component } from '@angular/core';

describe('MovieDetailsComponent', () => {
	let testComponent: TestHostComponent;
	let testFixture: ComponentFixture<TestHostComponent>;
//   let component: MovieDetailsComponent;
//   let fixture: ComponentFixture<MovieDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
	  declarations: [ MovieDetailsComponent, TestHostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
	testFixture = TestBed.createComponent(TestHostComponent);
	testComponent = testFixture.componentInstance;
	testFixture.detectChanges();

    // fixture = TestBed.createComponent(MovieDetailsComponent);
    // component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(testComponent).toBeTruthy();
  });

  it('should set value to inputdecorator', () => {
		testComponent.setInput({ id: 1, name: 'Batcat the cat bat', description: 'lol', price: 122,imageUrl: 'https://fashionjitsudotcom.files.wordpress.com/2017/10/screen-shot-2017-09-25-at-2-52-46-pm.png',year: 1999,added: 'datum',productCategory:[]});
		testFixture.detectChanges();
    	expect(testComponent.modalMovie.name).toBe('Batcat the cat bat');
  });

  @Component({
		selector: `host-component`,
		template: `<app-movie-details [class.display_modal]="modalVisability" [modalMovie]="{ id: 1, name: 'Batcat the cat bat', description: 'lol', price: 122,imageUrl: 'https://fashionjitsudotcom.files.wordpress.com/2017/10/screen-shot-2017-09-25-at-2-52-46-pm.png',year: 1999,added: 'datum',productCategory:[]}" (click)="toggleModal()"></app-movie-details>`
		//template: `<app-movie-details [modalMovie]="movie"></app-movie-details>`
	})
	class TestHostComponent {
		modalMovie: IMovie;

		setInput(movie: IMovie) {
			this.modalMovie = movie;

		}
	}
});
