import { Component } from '@angular/core';

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

	toggleScroll(toggleOnOff:boolean){
		console.log("app comopnent" , toggleOnOff);
		this.bodyScroll = toggleOnOff;
	}
}
