import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

@Component({
	selector: 'app-dashboard-nav',
	templateUrl: './dashboard-nav.component.html',
	styleUrls: ['./dashboard-nav.component.css']
})
export class DashboardNavComponent implements OnInit {

	public openSideBarClass = '';
	public dashboardNav: string = 'active';
	public addressBookListNav: string = '';
	public myOrdersNav: string = '';
	public myWishlist: string = '';

	constructor(
		private activatedRoute: ActivatedRoute,
    	private router: Router,
	) {

		this.dashboardNav = '';
		this.addressBookListNav = '';
		this.myOrdersNav = '';
		this.myWishlist = '';

		
		this.router.events.subscribe((ev) => {

			this.router.url == '/dashboard' || this.router.url == '/profile' ? this.dashboardNav = 'active' : '';
			this.router.url == '/address-book-list' ? this.addressBookListNav = 'active' : '';
			this.router.url == '/my-orders' ? this.myOrdersNav = 'active' : '';
			this.router.url == '/my-wishlist' ? this.myWishlist = 'active' : '';

			if (ev instanceof NavigationEnd) { /* Your code goes here on every router change */
			  window.scrollTo(0, 0);
			}
		});
	}

	ngOnInit(): void {
	}

	openSideBar() {
		console.log('inside openSideBar');
		this.openSideBarClass = 'show-customer-sidebar';
	}

	closeSideBar() {
		this.openSideBarClass = '';
	}
}
