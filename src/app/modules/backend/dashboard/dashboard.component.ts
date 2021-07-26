import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { fadeInAnimation } from "../../../common/animations/fadein-animation";

import { UserInterface } from "../../../interfaces/user-interface";

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
	userData: UserInterface;

	constructor(
		private authService: AuthService
	) { }

	ngOnInit(): void {

		if( this.authService.isLoggedIn() ) {
			let session = localStorage.getItem('currentUser');
			if( session ) {
				let parsedUser = JSON.parse(session);
				this.loggedinUserId = parsedUser.user._id;
				this.userData = parsedUser.user;
			}
		}
	}


}
