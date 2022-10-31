import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProductDetailComponent} from "./product-detail.component";
import {ProductDetailRoutingModule} from "./product-detail-routing.module";
import {FormsModule} from "@angular/forms";
import {SlickCarouselModule} from "ngx-slick-carousel";

@NgModule({
  declarations: [
    ProductDetailComponent
  ],
  imports: [
    CommonModule,
    ProductDetailRoutingModule,
    FormsModule,
    SlickCarouselModule,
  ]
})
export class ProductDetailModule {
}
