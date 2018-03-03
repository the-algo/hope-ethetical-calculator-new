import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ApplicationRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AccordionModule } from 'ng2-accordion';
import { ChartsModule } from 'ng2-charts';
import { PriceService } from './price.service';
import { HttpModule } from '@angular/http';

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
    HttpModule
  ],
  providers: [PriceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
