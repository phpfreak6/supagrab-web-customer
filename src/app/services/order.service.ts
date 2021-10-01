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
}
