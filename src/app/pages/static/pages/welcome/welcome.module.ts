import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WelcomeRoutingModule } from './welcome-routing.module';
import { WelcomeComponent } from './welcome.component';
import { HttpClientModule } from '@angular/common/http';
import { FooterModule } from '@app/components/footer/footer.module';


@NgModule({
  declarations: [
    WelcomeComponent
  ],
  imports: [
    CommonModule,
    WelcomeRoutingModule,
    HttpClientModule,
    FooterModule
  ]
})
export class WelcomeModule { }
