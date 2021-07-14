import { Component, OnInit } from '@angular/core';
import { fadeInAnimation } from "../../../common/animations/fadein-animation";

import { SocialAuthService } from "angularx-social-login";
import { SocialUser } from "angularx-social-login";
import { GoogleLoginProvider } from "angularx-social-login";

import { NgxSpinnerService } from "ngx-spinner";

import { UserService } from "../../../services/user.service";
import { ConstantService } from "../../../services/constant.service";

import { Router } from '@angular/router';
import Swal from 'sweetalert2';

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
		private router: Router,
		private authService: SocialAuthService,
		private ngxSpinnerService: NgxSpinnerService,
		private userService: UserService,
		private constantService: ConstantService
	) { }

	ngOnInit(): void {

		this.authService.authState.subscribe(user => {
			this.user = user;
			console.log(user);
		});
	}

	async signInWithGoogle() {

		try {

			this.ngxSpinnerService.show();
			let googleUser = await this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
			let stringyfyUser = JSON.stringify(googleUser);
			let in_data = {
				social_flag: 'gmail',
				token: googleUser.id,
				social_user_detail: stringyfyUser
			};
			await this.saveGoogleuserData(in_data);
			
		} catch (ex) {
			this.ngxSpinnerService.hide();
			let obj = {
				resCode: 400,
				msg: ex.toString(),
			};
			this.constantService.handleResCode(obj);
		}
	}

	async saveGoogleuserData( in_data: any ) {

		try {
			
			this.userService.signInWithGoogle(in_data).subscribe( 
				async (result) => {

					console.log('result', result);

                    if (result.success) {
                        localStorage.setItem(
                            'currentUser',
                            JSON.stringify({
                                token: result.data.token,
                                user: result.data.user,
                            })
                        );

                        this.constantService.setLocalStorage();
                        this.router.navigate(['/dashboard']);
                        Swal.fire(
                            'Authentication Successfull!',
                            'Login successfull.',
                            'success'
                        );
                    } else {
                        this.constantService.handleResCode(result);
                    }
				},
				async (error) => {
					this.ngxSpinnerService.hide();
                    console.log(error.message);
                    let obj = {
                        resCode: 400,
                        msg: error.message.toString(),
                    };
                    this.constantService.handleResCode(obj);
				},
				() => {
					// inside complete
					this.ngxSpinnerService.hide();
				}
			);
		} catch (ex) {
			this.ngxSpinnerService.hide();
			let obj = {
				resCode: 400,
				msg: ex.toString(),
			};
			this.constantService.handleResCode(obj);
		}
	}

	public signOut(): void {
		this.authService.signOut();
	}

}
