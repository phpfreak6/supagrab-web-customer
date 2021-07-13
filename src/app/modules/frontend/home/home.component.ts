import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { fadeInAnimation } from "../../../common/animations/fadein-animation";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    fadeInAnimation
  ]
})
export class HomeComponent implements OnInit {

  addActiveClassToCosmetics : any = 'active default add-display-block';
  addActiveClassToBracelets : any = '';
  addActiveClassToEarrings : any = '';

  constructor(
    public activatedRoute: ActivatedRoute, 
    public router: Router
  ) { }

  ngOnInit(): void {
  }

  exclusiveProducts( selected: any ) {

    if( selected == 'cosmetics' ) {

      this.addActiveClassToCosmetics = 'active default add-display-block';
      this.addActiveClassToBracelets = '';
      this.addActiveClassToEarrings = '';

    } else if( selected == 'bracelets' ) {

      this.addActiveClassToCosmetics = '';
      this.addActiveClassToBracelets = 'active default add-display-block';
      this.addActiveClassToEarrings = '';

    } else if( selected == 'earrings' ) {

      this.addActiveClassToCosmetics = '';
      this.addActiveClassToBracelets = '';
      this.addActiveClassToEarrings = 'active default add-display-block';

    }
  }
}
