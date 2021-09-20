import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class CartCountService {

	public cart$ = new Subject();
  	public cartItems = 0;
	  
	constructor() {
		this.cart$.asObservable();
	}

	addItemToCart( cartData ) {

		this.cartItems = cartData.length;
		this.cart$.next( this.cartItems );
	}
}
