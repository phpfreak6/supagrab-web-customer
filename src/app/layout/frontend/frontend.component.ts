import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-frontend',
  templateUrl: './frontend.component.html',
  styleUrls: ['./frontend.component.css']
})
export class FrontendComponent implements OnInit, OnDestroy {

  constructor() { }

  ngOnInit(): void {
  }

  public ngOnDestroy(): void {}

}
