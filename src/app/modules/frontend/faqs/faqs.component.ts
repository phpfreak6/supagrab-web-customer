import { Component, OnDestroy, OnInit } from '@angular/core';
import { fadeInAnimation } from "src/app/common/animations/fadein-animation";

import { NgxSpinnerService } from "ngx-spinner";

import { FaqService } from "src/app/services/faq.service";
import { ConstantService } from "src/app/services/constant.service";
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-faqs',
	templateUrl: './faqs.component.html',
	styleUrls: ['./faqs.component.css'],
	animations: [
		fadeInAnimation
	]
})
export class FaqsComponent implements OnInit, OnDestroy {

	faqList: any[];
	private faqSubscription: Subscription;

	constructor(
		private ngxSpinnerService: NgxSpinnerService,
		private constantService: ConstantService,
		private faqService: FaqService
	) { }

	ngOnInit(): void {
		this.getAllFaqs();
	}

	getAllFaqs() {

		try {

			this.ngxSpinnerService.show();
			this.faqSubscription = this.faqService.getAllFaqs().subscribe(
				async (result) => {

                    if (result.success) {
						this.faqList = result.data.faq;
                    } else {
                        this.constantService.handleResCode(result);
                    }
				},
				async (error) => {
					this.ngxSpinnerService.hide();
                    console.log(error.message);
                    let obj = {
                        resCode: 400,
                        msg: error.message.toString(),
                    };
                    this.constantService.handleResCode(obj);
				},
				() => {
					// inside complete
					this.ngxSpinnerService.hide();
				}
			);
		} catch( ex ) {
			this.ngxSpinnerService.hide();
			let obj = {
				resCode: 400,
				msg: ex.toString(),
			};
			this.constantService.handleResCode(obj);
		}
	}

	identify(index, item){
		return item?.question; 
	}

	public ngOnDestroy(): void {
        
        if (this.faqSubscription) {
            this.faqSubscription.unsubscribe();
        }
    }
}
