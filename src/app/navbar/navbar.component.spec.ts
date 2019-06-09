import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarComponent } from './navbar.component';
import { CartComponent } from '../cart/cart.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrintCartItemComponent } from '../print-cart-item/print-cart-item.component';
import { DataService } from '../services/data.service';
import { MockDataService } from '../services/mock-data.service';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
	  declarations: [ NavbarComponent, CartComponent, PrintCartItemComponent ],
	  imports: [FormsModule, ReactiveFormsModule]
	})
	.overrideComponent(NavbarComponent, {set: { providers: 
		[
			{ provide: DataService, useClass: MockDataService}
		]}})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
	fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle cart visability', () => {
	// component.checkCartQty(0);
	// expect(component.cartVisibility).toBeFalsy();
	// component.toggleCart(true);
	// expect(component.cartVisibility).toBeTruthy();
  });
});
