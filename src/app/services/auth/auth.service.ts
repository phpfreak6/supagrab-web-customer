import { Injectable } from '@angular/core';
import { ConstantService } from "../constant.service";
import { UserService } from "../user.service";

@Injectable({
	providedIn: 'root'
})
export class AuthService {

	constructor(
		private constantService: ConstantService,
		private userService: UserService
	) {}

	isLoggedIn() {

		return !!localStorage.getItem('token');
	}

	async getLocalUser() {

		if( !!localStorage.getItem('currentUser') ) 
		{
			let session = localStorage.getItem('currentUser');
			let parsedSession = JSON.parse( session );
			let currentUser = parsedSession.user;

			return currentUser;
		} else {
			return null;
		}
	}

	async getLocalToken() {

		if( !!localStorage.getItem('currentUser') ) 
		{
			let token = localStorage.getItem('token');
			return token;
		} else {
			return null;
		}
	}

	async setLocalUser() {

		let token = await this.getLocalToken();
		let currUsr = await this.getLocalUser();
		let userId = currUsr._id;

		this.userService.getUserById(userId).subscribe(
			async (result) => {
				await localStorage.clear();
				localStorage.setItem(
					'currentUser',
					JSON.stringify({
						token: token,
						user: result.data.user,
					})
				);
				localStorage.setItem(
					'token',
					result.data.token
				);
		
				this.constantService.setLocalStorage();
				
			},
			async (err) => {
				console.log('err setLocalUser auth.service.ts-42', err);
			}
		);

		return true;
	}
}
