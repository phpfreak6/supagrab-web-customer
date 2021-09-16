import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ConstantService } from './constant.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  public apiEndPoint: string;
	public data: any;

	constructor(
		private httpClient: HttpClient,
		private constantService: ConstantService
	) {
		this.apiEndPoint = this.constantService.apiBaseUrl;
	}

	addToCart( userId, productId ): Observable<any> {

		return this.httpClient.post( 
			`${this.apiEndPoint}/users/${userId}/product/${productId}/cart`, 
			null,
			this.constantService.getHttpJsonOptions()
			)
			.pipe(
			  map((e:Response)=> e),
			  catchError((e:Response)=> throwError(e))
		);
	}

	getCartByUserId( userId ): Observable<any> {

		let url = `${this.apiEndPoint}/users/${userId}/cart`;
		return this.httpClient
			.get(url, this.constantService.getHttpJsonOptions())
			.pipe(
				map((e: any) => e),
				catchError((e: Response) => throwError(e))
		);
	}

	delCartByCartId( userId, cartId ): Observable<any> {

		let url = `${this.apiEndPoint}/users/${userId}/cart/${cartId}`;
		return this.httpClient
			.delete(url, this.constantService.getHttpJsonOptions())
			.pipe(
				map((e: Response) => e),
				catchError((e: Response) => throwError(e))
			);
	}
}
