import { Component, OnInit } from '@angular/core';
import { fadeInAnimation } from "src/app/common/animations/fadein-animation";

import { NgxSpinnerService } from "ngx-spinner";

import { FaqService } from "src/app/services/faq.service";
import { ConstantService } from "src/app/services/constant.service";

@Component({
	selector: 'app-faqs',
	templateUrl: './faqs.component.html',
	styleUrls: ['./faqs.component.css'],
	animations: [
		fadeInAnimation
	]
})
export class FaqsComponent implements OnInit {

	faqList: any[];
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
			this.faqService.getAllFaqs().subscribe(
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
}
