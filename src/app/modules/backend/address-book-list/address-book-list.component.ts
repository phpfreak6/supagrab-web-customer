import { Component, OnInit } from '@angular/core';
import { fadeInAnimation } from 'src/app/common/animations/fadein-animation';

@Component({
  selector: 'app-address-book-list',
  templateUrl: './address-book-list.component.html',
  styleUrls: ['./address-book-list.component.css'],
	animations: [
		fadeInAnimation
	]
})
export class AddressBookListComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
