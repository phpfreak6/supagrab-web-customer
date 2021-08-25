import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { ConstantService } from './constant.service';

@Injectable({
	providedIn: 'root'
})
export class ProductService {

	public apiEndPoint: string;
	public data;
	public productImageLink;

	constructor(
		private httpClient: HttpClient,
		private constantService: ConstantService
	) {
		this.apiEndPoint = this.constantService.apiBaseUrl + '/products';
	}

	getProductBySlug( in_slug ) {

		let url = `${this.apiEndPoint}/slug/${in_slug}`;
		return this.httpClient
			.get(url, this.constantService.getHttpJsonOptionsNoAuth())
			.pipe(
				map((e: any) => e),
				catchError((e: Response) => throwError(e))
		);
	}
}
