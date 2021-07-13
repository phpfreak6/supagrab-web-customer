import { Component, OnInit } from '@angular/core';
import { fadeInAnimation } from "../../../common/animations/fadein-animation";

@Component({
  selector: 'app-cancellation-policy',
  templateUrl: './cancellation-policy.component.html',
  styleUrls: ['./cancellation-policy.component.css'],
  animations: [
    fadeInAnimation
  ]
})
export class CancellationPolicyComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
