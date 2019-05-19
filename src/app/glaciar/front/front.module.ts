/**
 * Copyright (C) 2019 Pablo Ezequiel Inchausti
 * http://www.glaciar.org
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
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
