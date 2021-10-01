import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class RazorpayService {

	public apiEndPoint!: string;
	public data: any;
	
	constructor(
		private httpClient: HttpClient
	) {
		this.apiEndPoint = '';
	}

	getOrderId(): Observable<any> {

		let in_data = {
			amount:500,
			currency:'INR',
			receipt:'receipt'
		};
		let url = `http://localhost:3000/razorpay/order`;
		return this.httpClient
			.post(url, in_data)
			.pipe(
				map((e: any) => e),
				catchError((e: Response) => throwError(e))
		);
	}

	isPaymentSuccessfull( transaction_detail: any ): Observable<any> {

		let url = `http://localhost:3000/razorpay/is-payment-successfull`;
		return this.httpClient
			.post(url, transaction_detail)
			.pipe(
				map((e: any) => e),
				catchError((e: Response) => throwError(e))
		);
	}
}
