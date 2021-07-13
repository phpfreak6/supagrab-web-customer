import { Component } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'supagrab-web-customer';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) {

    this.router.events.subscribe((ev) => {

      if (ev instanceof NavigationEnd) { /* Your code goes here on every router change */
        window.scrollTo(0, 0);
      }
    });
  }

  loginWithGoogle() {}
}
