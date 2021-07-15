import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { BackendRoutingModule } from './backend-routing.module';
import { DashboardComponent } from "./dashboard/dashboard.component";
import { AddressBookComponent } from './address-book/address-book.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { MyWishlistComponent } from './my-wishlist/my-wishlist.component';
import { DashboardNavComponent } from "../../common/dashboard-nav/dashboard-nav.component";
import { ProfileComponent } from './profile/profile.component';
import { AddressBookListComponent } from './address-book-list/address-book-list.component';


@NgModule({
  declarations: [
    DashboardComponent,
    AddressBookComponent,
    MyOrdersComponent,
    MyWishlistComponent,
    DashboardNavComponent,
    ProfileComponent,
    AddressBookListComponent
  ],
  imports: [
    CommonModule,
    BackendRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class BackendModule { }
