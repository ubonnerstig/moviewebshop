import { Component } from '@angular/core';
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

	constructor(scrollService: BodyScrollService) {
		scrollService.toggleScroll$.subscribe(
			bodyScroll => {
				this.bodyScroll = bodyScroll;
		});
	}
}
