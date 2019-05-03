import { NgModule } from '@angular/core'
import { AgmCoreModule } from '@agm/core'
import { CommonModule } from '@angular/common'
import { FrontRoutingModule } from './front-routing.module'
import { HomeComponent } from './home/home.component'
import { FaqComponent } from './faq/faq.component'
import { DataDashboardModule } from './data-dashboard/data-dashboard.module'
import { AboutComponent } from './about/about.component'
import { ThemeModule } from '../../@theme/theme.module'

@NgModule({
  declarations: [HomeComponent, FaqComponent, AboutComponent],
  imports: [
    CommonModule,
    FrontRoutingModule,
    DataDashboardModule,
    ThemeModule,
    AgmCoreModule,
  ],
})
export class FrontModule { }
