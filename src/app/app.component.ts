import { Component } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { CartCountService } from "src/app/services/cart-count.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'supagrab-web-customer';
  cartCnt: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
		private cartCountService: CartCountService,
  ) {

    this.router.events.subscribe((ev) => {

      if (ev instanceof NavigationEnd) { /* Your code goes here on every router change */
        window.scrollTo(0, 0);
      }

      this.cartCountService.cart$.subscribe( (cnt:number) => {      
        this.cartCnt = cnt;
      } );
    });
  }

  loginWithGoogle() {}
}
