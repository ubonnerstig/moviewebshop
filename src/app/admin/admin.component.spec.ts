import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminComponent } from './admin.component';
import { PrintOrderComponent } from '../print-order/print-order.component';
import { DataService } from '../services/data.service';
import { MockDataService } from '../services/mock-data.service';

describe('AdminComponent', () => {
	let component: AdminComponent;
	let fixture: ComponentFixture<AdminComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
		declarations: [ AdminComponent, PrintOrderComponent ]
		})
		.overrideComponent(AdminComponent, {set: { providers: 
			[
				{ provide: DataService, useClass: MockDataService}
			]}})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(AdminComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
