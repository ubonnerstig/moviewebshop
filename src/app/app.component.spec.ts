import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CartComponent } from './cart/cart.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrintCartItemComponent } from './print-cart-item/print-cart-item.component';
import { HttpClientModule } from '@angular/common/http';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
		RouterTestingModule,
		FormsModule,
		ReactiveFormsModule,
		HttpClientModule,
		RouterTestingModule
      ],
      declarations: [
		AppComponent,
		NavbarComponent,
		CartComponent,
		PrintCartItemComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it('bodyScroll should be falsy on load', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
	expect(app.bodyScroll).toBeFalsy();

  });
});
