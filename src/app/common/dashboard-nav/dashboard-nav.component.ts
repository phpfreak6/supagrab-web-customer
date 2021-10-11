import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

import Swal from 'sweetalert2';
import { ConstantService } from "src/app/services/constant.service";
import { SocialAuthService } from "angularx-social-login";
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-dashboard-nav',
	templateUrl: './dashboard-nav.component.html',
	styleUrls: ['./dashboard-nav.component.css']
})
export class DashboardNavComponent implements OnInit, OnDestroy {

	public openSideBarClass = '';
	public dashboardNav: string = 'active';
	public addressBookListNav: string = '';
	public myOrdersNav: string = '';
	public myWishlist: string = '';
	// private subscription: Subscription;

	constructor(
		private activatedRoute: ActivatedRoute,
    	private router: Router,
		private constantService: ConstantService,
		private socialAuthService: SocialAuthService,
	) {

		this.dashboardNav = '';
		this.addressBookListNav = '';
		this.myOrdersNav = '';
		this.myWishlist = '';

		let session = localStorage.getItem('currentUser');
		let loggedinUserId = '';
		if( session ) {
			let parsedUser = JSON.parse(session);
			loggedinUserId = parsedUser.user._id;
		}

		this.router.events.subscribe((ev) => {

			this.router.url == '/dashboard' || this.router.url == `/profile/${loggedinUserId}` ? this.dashboardNav = 'active' : '';
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

	ConfirmLogOut() {

		try {

			Swal.fire({
				title: 'Are you sure?',
				icon: 'question',
				iconHtml: '?',
				confirmButtonText: 'Yes',
				cancelButtonText: 'No',
				showCancelButton: true,
				showCloseButton: true,
			}).then((result) => {
				if (result.value) {
					this.logout();
				}
			});
		} catch (ex) {
			console.log('ex', ex);
			let obj = {
				resCode: 400,
				msg: ex.toString(),
			};
			this.constantService.handleResCode(obj);
		}
	}

	logout() {
		
		this.constantService.clearLocalStorage();
		this.socialAuthService.signOut();
		this.router.navigate(['/login']);
		let obj = {
			resCode: 200,
			msg: 'Logout Successfully!'
		};
		this.constantService.handleResCode(obj);
	}

	public ngOnDestroy(): void {

		// if (this.subscription) {
		//   	this.subscription.unsubscribe();
		// }
	}
}
