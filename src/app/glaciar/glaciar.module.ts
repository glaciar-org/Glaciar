import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { GlaciarRoutingModule } from './glaciar-routing.module'
import { GlaciarComponent } from './glaciar.component'
import { FrontModule } from './front/front.module'
import { LabsModule } from './front/labs/labs.module'
import { ThemeModule } from '../@theme/theme.module'
import { ComponentsModule } from '../glaciar/components/components.module'


@NgModule({
  declarations: [GlaciarComponent],
  imports: [
    ThemeModule,
    CommonModule,
    GlaciarRoutingModule,
    ComponentsModule,
    FrontModule,
    LabsModule
  ],
})

export class GlaciarModule { }
