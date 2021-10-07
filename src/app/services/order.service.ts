import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { ConstantService } from './constant.service';

@Injectable({
	providedIn: 'root'
})
export class OrderService {

	public apiEndPoint: string;
	public data: any;

	constructor(
		private httpClient: HttpClient,
		private constantService: ConstantService
	) {
		this.apiEndPoint = this.constantService.apiBaseUrl;
	}

	orderPlaced(user_id, in_data): Observable<any> {

		return this.httpClient.post(
			`${this.apiEndPoint}/users/${user_id}/order`,
			in_data,
			// this.constantService.getHttpJsonOptionsNoAuth()
		)
		.pipe(
			map((e: Response) => e),
			catchError((e: Response) => throwError(e))
		);
	}

	updateOrderStatus(user_id, order_id): Observable<any> {

		return this.httpClient.patch(
			`${this.apiEndPoint}/users/${user_id}/order/${order_id}/status`,
			null,
			// this.constantService.getHttpJsonOptionsNoAuth()
		)
		.pipe(
			map((e: Response) => e),
			catchError((e: Response) => throwError(e))
		);
	}

	getOrderById(userId: any, orderId: any): Observable<any> {
		let url = `${this.apiEndPoint}/users/${userId}/order/${orderId}`;
		return this.httpClient
			.get(url, this.constantService.getHttpJsonOptions())
			.pipe(
				map((e: any) => e),
				catchError((e: Response) => throwError(e))
			);
	}

	getOrderByUser(userId: any, orderId: any): Observable<any> {
		let url = `${this.apiEndPoint}/users/${userId}/order/${orderId}`;
		return this.httpClient
			.get(url, this.constantService.getHttpJsonOptions())
			.pipe(
				map((e: any) => e),
				catchError((e: Response) => throwError(e))
			);
	}
}
