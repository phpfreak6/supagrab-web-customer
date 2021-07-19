import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { ConstantService } from './constant.service';

@Injectable({
	providedIn: 'root'
})
export class WishlistService {

	public apiEndPoint: string;
	public data: any;

	constructor(
		private httpClient: HttpClient,
		private constantService: ConstantService
	) {
		this.apiEndPoint = this.constantService.apiBaseUrl;
	}

	addToWishList( in_data, userId ): Observable<any> {

		return this.httpClient.post( 
			`${this.apiEndPoint}/users/${userId}/wishlists`, 
			in_data,
			this.constantService.getHttpJsonOptions()
			)
			.pipe(
			  map((e:Response)=> e),
			  catchError((e:Response)=> throwError(e))
		);
	}

	getAllWishListByUserId( userId ): Observable<any> {

		let url = `${this.apiEndPoint}/users/${userId}/wishlists`;
		return this.httpClient
			.get(url, this.constantService.getHttpJsonOptions())
			.pipe(
				map((e: any) => e),
				catchError((e: Response) => throwError(e))
		);
	}

	delWishListByWishListId( userId, wishListId ): Observable<any> {

		let url = `${this.apiEndPoint}/users/${userId}/wishlists/${wishListId}`;
		return this.httpClient
			.delete(url, this.constantService.getHttpJsonOptions())
			.pipe(
				map((e: Response) => e),
				catchError((e: Response) => throwError(e))
			);
	}
}
