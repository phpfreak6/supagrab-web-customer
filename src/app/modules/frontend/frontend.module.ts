import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { FrontendRoutingModule } from './frontend-routing.module';
import { LoginComponent } from './login/login.component';
import { ProductViewComponent } from './product-view/product-view.component';
import { ProductByCategoryComponent } from './product-by-category/product-by-category.component';
import { ViewCartComponent } from './view-cart/view-cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { OrderPlacedComponent } from './order-placed/order-placed.component';
import { ViewWishlistComponent } from './view-wishlist/view-wishlist.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { TermsAndConditionsComponent } from './terms-and-conditions/terms-and-conditions.component';
import { CancellationPolicyComponent } from './cancellation-policy/cancellation-policy.component';
import { FaqsComponent } from './faqs/faqs.component';

import {IvyCarouselModule} from 'angular-responsive-carousel';
import { CountdownModule } from 'ngx-countdown';
import { RatingModule } from 'ng-starrating';

@NgModule({
  declarations: [
    LoginComponent,
    ProductViewComponent,
    ProductByCategoryComponent,
    ViewCartComponent,
    CheckoutComponent,
    OrderPlacedComponent,
    ViewWishlistComponent,
    AboutUsComponent,
    ContactUsComponent,
    PrivacyPolicyComponent,
    TermsAndConditionsComponent,
    CancellationPolicyComponent,
    FaqsComponent
  ],
  imports: [
    CommonModule,
    FrontendRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    IvyCarouselModule,
    CountdownModule,
    RatingModule
  ]
})
export class FrontendModule { }
