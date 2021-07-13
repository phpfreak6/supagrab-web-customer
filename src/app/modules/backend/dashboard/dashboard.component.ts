import { Component, OnInit } from '@angular/core';
import { fadeInAnimation } from "../../../common/animations/fadein-animation";

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.css'],
	animations: [
		fadeInAnimation
	]
})
export class DashboardComponent implements OnInit {

	constructor() { }

	ngOnInit(): void {
	}

}
