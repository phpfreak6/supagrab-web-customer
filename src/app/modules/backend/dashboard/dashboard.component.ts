import { Component, OnInit } from '@angular/core';
import { fadeInAnimation } from "../../../common/animations/fadein-animation";

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.css'],
	animations: [
		fadeInAnimation
	]
})
export class DashboardComponent implements OnInit {

	loggedinUserId: string;

	constructor() { }

	ngOnInit(): void {
		let session = localStorage.getItem('currentUser');
		if( session ) {
			let parsedUser = JSON.parse(session);
			this.loggedinUserId = parsedUser.user._id;
		}
	}


}
