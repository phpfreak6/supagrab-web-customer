import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import { TosterService } from "../services/toster.service";
import { SocialAuthService } from 'angularx-social-login';

@Injectable({
	providedIn: 'root'
})
export class ConstantService {

	// public baseUrl: string = `http://localhost:3000`;
	// LIVE
	public baseUrl: string = `https://node.gutsyminds.com`;
	// LOCAL
	// public apiBaseUrl: string = `${this.baseUrl}/api/v1`;
	public apiBaseUrl: string = `${this.baseUrl}`;
	public appBaseUrl: string = `http://localhost:4200`;

	public userImageLink: string;
	public token!: string;
	public user!: string;
	public userProfilePic!: string;
	public itemImageLink: string;
	public paginationLimit: number;
	public stripe_Publishable_key: string;

	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private tosterService: TosterService,
		private socialAuthService: SocialAuthService
	) {
		// this.baseUrl = `http://localhost:3000/api1`;

		this.userImageLink = `${this.baseUrl}/deliveryapp/storage/images/`;
		this.itemImageLink = `${this.baseUrl}/deliveryapp/storage/images/`;
		this.paginationLimit = 10;
		this.stripe_Publishable_key = 'pk_live_83msQRRmSER3tzZr2aGAcQYj00zazhb49q';
	}

	setLocalStorage() {
		
    	let user = JSON.parse(localStorage.getItem('currentUser')!);
		this.user = user.user;
		this.token = user.token;
	}

	clearLocalStorage() {
		localStorage.removeItem('currentUser');
		localStorage.removeItem('token');
		this.socialAuthService.signOut();
	}

	handleResCode(obj: any) {

		this.tosterService.error();
		if (obj.resCode == 200) {
			
			this.tosterService.success();
			// Swal.fire(obj.msg, 'Success.', 'success');
			this.tosterService.toastMixin.fire(
				obj.msg
			);
		} else if (obj.resCode == 400) {

			// Swal.fire('Request Exception!', obj.msg, 'error');
			this.tosterService.toastMixin.fire(
				obj.msg
			);
		} else if (obj.resCode == 401) {

			// Swal.fire('Unauthorized Access!', obj.msg, 'error');
			this.tosterService.toastMixin.fire(
				obj.msg
			);

			this.clearLocalStorage();
			this.router.navigate(['/login']);
		}
	}

	// NO AUTH Content-Type starts
	getHttpJsonOptionsNoAuth() {

		let httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
			}),
		};
		return httpOptions;
	}
	// NO AUTH Content-Type ends

	// WITH AUTH Content-Type starts
	getHttpJsonOptions() {

		let user = JSON.parse(localStorage.getItem('currentUser')!);
		this.user = user.user;
		this.token = user.token;

		let httpOptions = {
			headers: new HttpHeaders({
				Authorization: `Bearer ${this.token}`,
				'Content-Type': 'application/json',
			}),
		};
		return httpOptions;
	}

	getHttpFormDataOptions() {

		let user = JSON.parse(localStorage.getItem('currentUser')!);
		this.user = user.user;
		this.token = user.token;
		
		let httpOptions = {
			headers: new HttpHeaders({
				Authorization: `Bearer ${this.token}`,
			}),
		};
		return httpOptions;
	}
	// WITH AUTH Content-Type ends
}