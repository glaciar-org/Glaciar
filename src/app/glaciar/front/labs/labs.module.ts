import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { LabsRoutingModule } from './labs-routing.module'
import { LabsComponent } from './labs.component'
import { ThemeModule } from '../../../@theme/theme.module';


@NgModule({
  declarations: [LabsComponent],
  imports: [
    CommonModule,
    LabsRoutingModule,
    ThemeModule
  ],
  exports: [
    LabsComponent
  ]
})
export class LabsModule { }
