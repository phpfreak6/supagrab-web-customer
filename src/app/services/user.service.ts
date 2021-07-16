import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { ConstantService } from './constant.service';

@Injectable({
	providedIn: 'root'
})
export class UserService {

	public apiEndPoint: string;
	public data: any;
	public userImageLink;

	constructor(
		private httpClient: HttpClient,
		private constantService: ConstantService
	) {
		this.apiEndPoint = this.constantService.apiBaseUrl;
		this.userImageLink = this.constantService.userImageLink;
	}

	signInWithGoogle(in_data: any): Observable<any> {

		console.log('signInWithGoogle service in_data', in_data);
		return this.httpClient
			.post(
				`${this.apiEndPoint}/auth/social-sign-in`,
				in_data,
				this.constantService.getHttpJsonOptions()
			)
			.pipe(
				map((e: any) => e),
				catchError((e: Response) => throwError(e))
			);
	}

	getUserById(userId: any): Observable<any> {
		let url = `${this.apiEndPoint}/users/${userId}`;
		return this.httpClient
			.get(url, this.constantService.getHttpJsonOptions())
			.pipe(
				map((e: any) => e),
				catchError((e: Response) => throwError(e))
			);
	}

	updateUser(in_data, userId): Observable<any> {
		return this.httpClient
			.patch(
				`${this.apiEndPoint}/users/${userId}`,
				in_data,
				this.constantService.getHttpJsonOptions()
			)
			.pipe(
				map((e: Response) => e),
				catchError((e: Response) => throwError(e))
		);
	}

	insertUserAddress( in_data, userId ): Observable<any> {

		return this.httpClient.post( 
			`${this.apiEndPoint}/users/${userId}/addresses`, 
			in_data,
			this.constantService.getHttpJsonOptions()
			)
			.pipe(
			  map((e:Response)=> e),
			  catchError((e:Response)=> throwError(e))
		);
	}

	getAllAddressesByUserId( userId ): Observable<any> {

		let url = `${this.apiEndPoint}/users/${userId}`;
		return this.httpClient
			.get(url, this.constantService.getHttpJsonOptions())
			.pipe(
				map((e: any) => e),
				catchError((e: Response) => throwError(e))
		);
	}

	// PENDING
	getAddressByUserIdAddressId( userId, addrId ): Observable<any> {

		let url = `${this.apiEndPoint}/users/${userId}/addresses/${addrId}`;
		return this.httpClient
			.get(url, this.constantService.getHttpJsonOptions())
			.pipe(
				map((e: any) => e),
				catchError((e: Response) => throwError(e))
		);
	}
}
