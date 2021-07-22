import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { ConstantService } from './constant.service';

@Injectable({
	providedIn: 'root'
})
export class CmsService {

	public apiEndPoint: string;
	public data: any;
	
	constructor(
		private httpClient: HttpClient,
		private constantService: ConstantService
	) {
		this.apiEndPoint = this.constantService.apiBaseUrl;
	}

	getCmsByKey( cms_key: any): Observable<any> {
		let url = `${this.apiEndPoint}/cms/key/${cms_key}`;
		return this.httpClient
			.get(url, this.constantService.getHttpJsonOptionsNoAuth())
			.pipe(
				map((e: any) => e),
				catchError((e: Response) => throwError(e))
			);
	}
}
