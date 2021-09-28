import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class AuthService {

	constructor() {}

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
}
