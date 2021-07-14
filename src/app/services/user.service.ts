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
}
