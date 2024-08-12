import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { RevenueComponent } from './revenue/revenue.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    UserRoutingModule,
    RevenueComponent
    
  ]
})
export class UserModule { }
