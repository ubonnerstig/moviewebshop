import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { PrintMovieComponent } from './print-movie/print-movie.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PrintCartItemComponent } from './print-cart-item/print-cart-item.component';
import { OrderCompleteComponent } from './order-complete/order-complete.component';
import { PrintOrderItemComponent } from './print-order-item/print-order-item.component';
import { AdminComponent } from './admin/admin.component';
import { PrintOrderComponent } from './print-order/print-order.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PrintMovieComponent,
	MovieDetailsComponent,
	NavbarComponent,
	CartComponent,
	CheckoutComponent,
	PageNotFoundComponent,
	PrintCartItemComponent,
	OrderCompleteComponent,
	PrintOrderItemComponent,
	AdminComponent,
	PrintOrderComponent
  ],
  imports: [
    BrowserModule,
	AppRoutingModule,
	HttpClientModule,
	FormsModule,
	ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
