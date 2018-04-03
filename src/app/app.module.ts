import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ApplicationRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AccordionModule } from 'ng2-accordion';
import { ChartsModule } from 'ng2-charts';
import { PriceService } from './price.service';
import { HttpModule } from '@angular/http';
import {NgxCurrencyModule} from "ngx-currency";
import { CurrencyMaskConfig, CURRENCY_MASK_CONFIG } from "ngx-currency/src/currency-mask.config";

export const CustomCurrencyMaskConfig: CurrencyMaskConfig = {
  align: "right",
  allowNegative: true,
  allowZero: true,
  decimal: ",",
  precision: 2,
  prefix: "R$ ",
  suffix: "",
  thousands: "."
 };

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    AccordionModule,
    ChartsModule,
    NgxCurrencyModule,
    HttpModule
  ],
 providers: [PriceService,
 {provide: CURRENCY_MASK_CONFIG, useValue: CustomCurrencyMaskConfig} ],
 bootstrap: [AppComponent]
})

export class AppModule { }
