import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChartzLabRoutingModule } from './chartz-lab-routing.module';
import { Amch4LaComponent } from './amch4-la/amch4-la.component';
import { Amch4LbComponent } from './amch4-lb/amch4-lb.component';

@NgModule({
  declarations: [Amch4LaComponent, Amch4LbComponent],
  imports: [
    CommonModule,
    ChartzLabRoutingModule
  ]
})
export class ChartzLabModule { }
