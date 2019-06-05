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
	fixedNavBar: boolean;
	hideShowNav: boolean;
	href: string;

	constructor(scrollService: BodyScrollService, private router:Router, private route:ActivatedRoute) {
		scrollService.toggleScroll$.subscribe(
			bodyScroll => {
				this.bodyScroll = bodyScroll;
		});
	}

	ngOnInit() {
		// this.href = this.router.url;
		// console.log(this.href);	
		// console.log(this.router);
		// this.router.events.subscribe((val) => {
		// 	// console.log(val instanceof NavigationEnd) 
		// 	console.log(val);
		// 	// console.log(Event:NavigationEnd.url);
		// });
		// this.router.events.forEach((event) => {
		// 	if(event instanceof NavigationEnd) {
		// 		console.log(event.url);
		// 		// console.log(event.url.replace("/",""));
		// 		if(event.url === "/"){
		// 			this.hideShowNav = false;
		// 		}else{
		// 			this.hideShowNav = true;
		// 		}
		// 	}
		// });
	}

	fixUnfixNavbar(navbarBoolean: boolean){
		this.fixedNavBar = navbarBoolean;
	}

	@HostListener('window:scroll', ['$event']) onScrollEvent($event){
		if ($event.path[1].scrollY >= 170){
			this.fixUnfixNavbar(true);
		} else if($event.path[1].scrollY <= 170) {
			this.fixUnfixNavbar(false);
		}
	}

}
