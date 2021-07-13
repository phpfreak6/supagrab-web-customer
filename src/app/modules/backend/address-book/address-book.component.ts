import { Component, OnInit } from '@angular/core';
import { fadeInAnimation } from "../../../common/animations/fadein-animation";

@Component({
  selector: 'app-address-book',
  templateUrl: './address-book.component.html',
  styleUrls: ['./address-book.component.css'],
	animations: [
		fadeInAnimation
	]
})
export class AddressBookComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
