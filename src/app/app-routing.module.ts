import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AdminComponent } from './admin/admin.component';
import { OrderCompleteComponent } from './order-complete/order-complete.component';

const routes: Routes = [
	{ path:'', component: HomeComponent },
	{ path:'checkout', component: CheckoutComponent },
	{ path:'ordercomplete', component: OrderCompleteComponent },
	{ path:'admin', component: AdminComponent },
	{ path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
