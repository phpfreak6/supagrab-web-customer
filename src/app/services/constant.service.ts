import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2';

@Injectable({
	providedIn: 'root'
})
export class ConstantService {

	public baseUrl: string = `http://localhost:3000`;
	// public baseUrl: string = `http://www.jobsarina.com/local`;
	// public apiBaseUrl: string = `${this.baseUrl}/api/v1`;
	public apiBaseUrl: string = `${this.baseUrl}`;
	// LIVE
	// public appBaseUrl: string = `http://jobsarina.com/adminlte`;
	// LOCAL
	public appBaseUrl: string = `http://localhost:4200`;

	public userImageLink: string;
	public token!: string;
	public user!: string;
	public userProfilePic!: string;
	public itemImageLink: string;
	public paginationLimit: number;
	public stripe_Publishable_key: string;

	constructor(private router: Router, private route: ActivatedRoute) {
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
	}

	handleResCode(obj: any) {
		if (obj.resCode == 200) {
			Swal.fire(obj.msg, 'Success.', 'success');
		} else if (obj.resCode == 400) {
			Swal.fire('Request Exception!', obj.msg, 'error');
		} else if (obj.resCode == 401) {
			Swal.fire('Unauthorized Access!', obj.msg, 'error');

			this.clearLocalStorage();
			this.router.navigate(['/login']);
		}
	}

	getHttpJsonOptions() {
		let httpOptions = {
			headers: new HttpHeaders({
				Authorization: `Bearer ${this.token}`,
				'Content-Type': 'application/json',
			}),
		};
		return httpOptions;
	}

	getHttpFormDataOptions() {
		let httpOptions = {
			headers: new HttpHeaders({
				Authorization: `Bearer ${this.token}`,
			}),
		};
		return httpOptions;
	}
}