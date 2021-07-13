import { Component, OnInit } from '@angular/core';
import { fadeInAnimation } from "../../../common/animations/fadein-animation";

import { SocialAuthService } from "angularx-social-login";
import { SocialUser } from "angularx-social-login";
import { GoogleLoginProvider } from "angularx-social-login";

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css'],
	animations: [
		fadeInAnimation
	]
})
export class LoginComponent implements OnInit {

	public user: SocialUser = new SocialUser;

	constructor(
		private authService: SocialAuthService
	) { }

	ngOnInit(): void {

		this.authService.authState.subscribe(user => {
			this.user = user;
			console.log(user);
		});
	}

	async signInWithGoogle() {
		try {

			let result = await this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
			console.log('result', result);
		} catch( ex ) {
			console.log('caught signInWithGoogle exception');
		}
	}

	public signOut(): void {
		this.authService.signOut();
	}

}
