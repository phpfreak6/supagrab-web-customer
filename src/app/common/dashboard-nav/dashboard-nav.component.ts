import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-dashboard-nav',
	templateUrl: './dashboard-nav.component.html',
	styleUrls: ['./dashboard-nav.component.css']
})
export class DashboardNavComponent implements OnInit {

	public openSideBarClass:string = '';

	constructor() { }

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
