import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarComponent } from './navbar.component';
import { CartComponent } from '../cart/cart.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrintCartItemComponent } from '../print-cart-item/print-cart-item.component';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
	  declarations: [ NavbarComponent, CartComponent, PrintCartItemComponent ],
	  imports: [FormsModule, ReactiveFormsModule]
    })
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

//   it('should toggle cart visability', () => {
// 	expect(component.cartVisibility).toBeFalsy();
// 	component.toggleCart();
// 	expect(component.cartVisibility).toBeTruthy();
//   });
});
