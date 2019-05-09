import { Component, Inject, HostListener } from '@angular/core';
import { BodyScrollService } from './services/body-scroll.service';

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

	constructor(scrollService: BodyScrollService) {
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

	@HostListener('window:scroll', ['$event']) onScrollEvent($event){
		// console.log($event);
		// console.log($event.path[1].scrollY);
		if ($event.path[1].scrollY >= 175){
			this.fixUnfixNavbar(true);
		} else if($event.path[1].scrollY <= 175) {
			this.fixUnfixNavbar(false);
		}

	  }

}
