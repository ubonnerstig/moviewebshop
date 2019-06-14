import { Component, HostListener } from '@angular/core';
import { BodyScrollService } from './services/body-scroll.service';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';

@Component({
	selector: 'app-root, body',
	host: {
		"[class.no_scroll]":"bodyScroll"
	}, 
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	bodyScroll: boolean;
	fixedNavBar: boolean = false;
	hideShowNav: boolean;
	href: string;

	constructor(scrollService: BodyScrollService, private router:Router, private route:ActivatedRoute) {
		scrollService.toggleScroll$.subscribe(
			bodyScroll => {
				this.bodyScroll = bodyScroll;
		});
	}

	ngOnInit() {
	}

	fixUnfixNavbar(navbarBoolean: boolean){
		this.fixedNavBar = navbarBoolean;
	}

	@HostListener('window:scroll', ['$event']) 
		onScrollEvent(event){
			if (event.target['scrollingElement'].scrollTop >= 170){
				this.fixUnfixNavbar(true);
			} else if(event.target['scrollingElement'].scrollTop <= 170) {
				this.fixUnfixNavbar(false);
			}
	}
}
