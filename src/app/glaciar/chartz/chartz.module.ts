import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChartzRoutingModule } from './chartz-routing.module';
import { Amcharts4Component } from './amcharts4/amcharts4.component';
import { ComponentsModule } from '../../glaciar/components/components.module'

@NgModule({
  declarations: [Amcharts4Component],
  imports: [
    CommonModule,
    ComponentsModule,
    ChartzRoutingModule
  ],
  exports: [
    Amcharts4Component
  ]
})
export class ChartzModule { }
