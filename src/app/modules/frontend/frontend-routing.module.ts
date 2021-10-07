import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './about-us/about-us.component';
import { CancellationPolicyComponent } from './cancellation-policy/cancellation-policy.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { FaqsComponent } from './faqs/faqs.component';

import { HomeComponent } from "./home/home.component";
import { LoginComponent } from './login/login.component';
import { OrderPlacedComponent } from './order-placed/order-placed.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { ProductByCategoryComponent } from './product-by-category/product-by-category.component';
import { ProductViewComponent } from './product-view/product-view.component';
import { TermsAndConditionsComponent } from './terms-and-conditions/terms-and-conditions.component';
import { ViewCartComponent } from './view-cart/view-cart.component';
import { ViewWishlistComponent } from './view-wishlist/view-wishlist.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'home'
    },
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'about-us',
        component: AboutUsComponent
    },
    {
        path: 'contact-us',
        component: ContactUsComponent
    },
    {
        path: 'privacy-policy',
        component: PrivacyPolicyComponent
    },
    {
        path: 'terms-and-conditions',
        component: TermsAndConditionsComponent
    },
    {
        path: 'cancellation-policy',
        component: CancellationPolicyComponent
    },
    {
        path: 'faq',
        component: FaqsComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'category/:catgSlug',
        component: ProductByCategoryComponent
    },
    {
        path: 'product/view/:prodSlug',
        component: ProductViewComponent
    },
    {
        path: 'view/cart',
        component: ViewCartComponent
    },
    {
        path: 'view/wish-list',
        component: ViewWishlistComponent
    },
    {
        path: 'checkout',
        component: CheckoutComponent
    },
    {
        path: 'order-placed/:orderId',
        component: OrderPlacedComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FrontendRoutingModule { }
