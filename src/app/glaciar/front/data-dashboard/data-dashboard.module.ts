import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { DataDashboardRoutingModule } from './data-dashboard-routing.module'
import { DataDashboardComponent } from './data-dashboard.component'
import { ConfigModule } from '../config/config.module'
import { ThemeModule } from '../../../@theme/theme.module'
import { ChartzModule } from '../../chartz/chartz.module'
import { ComponentsModule } from '../../components/components.module'

@NgModule({
  declarations: [DataDashboardComponent],
  imports: [
    CommonModule,
    ConfigModule,
    DataDashboardRoutingModule,
    ThemeModule,
    ChartzModule,
    ComponentsModule
  ],
})
export class DataDashboardModule { }
