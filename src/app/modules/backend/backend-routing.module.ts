import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddressBookComponent } from './address-book/address-book.component';

import { DashboardComponent } from "./dashboard/dashboard.component";
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { MyWishlistComponent } from './my-wishlist/my-wishlist.component';
import { ProfileComponent } from './profile/profile.component';
import { AddressBookListComponent } from "./address-book-list/address-book-list.component";

const routes: Routes = [
    {
        path: '',
        redirectTo: 'dashboard'
    },
    {
        path: 'dashboard',
        component: DashboardComponent
    },
    {
        path: 'profile/:userId',
        component: ProfileComponent
    },
    {
        path: 'address-book-list',
        component: AddressBookListComponent
    },
    {
        path: 'address-book/user/:userId/addr',
        component: AddressBookComponent
    },
    {
        path: 'address-book/user/:userId/addr/:addrId',
        component: AddressBookComponent
    },
    {
        path: 'my-orders',
        component: MyOrdersComponent
    },
    {
        path: 'my-wishlist',
        component: MyWishlistComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BackendRoutingModule { }
