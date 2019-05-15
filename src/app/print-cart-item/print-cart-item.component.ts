import { Component, OnInit, Input } from '@angular/core';
import { ICartItem } from '../interfaces/ICartItem';

@Component({
  selector: 'app-print-cart-item',
  templateUrl: './print-cart-item.component.html',
  styleUrls: ['./print-cart-item.component.css']
})
export class PrintCartItemComponent implements OnInit {
	@Input() cartItem: ICartItem;

  constructor() { }

  ngOnInit() {
  }

}
