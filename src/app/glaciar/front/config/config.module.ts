import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { AgmCoreModule } from '@agm/core'
import { ReactiveFormsModule } from '@angular/forms'
import { UiSwitchModule } from 'ngx-ui-switch'
import { NouisliderModule } from 'ng2-nouislider'
import { ConfigRoutingModule } from './config-routing.module'
import { ConfigComponent } from './config.component'
import { InfoComponent } from './info/info.component'
import { UmbralComponent } from './umbral/umbral.component'
import { SetupComponent } from './setup/setup.component'
import { SwitchTextPipe } from './setup/setup.component'
import { ConfigTabComponent } from './config-tab/config-tab.component'
import { DispersionComponent } from './dispersion/dispersion.component'
import { OutlierComponent } from './outlier/outlier.component'
import { ThemeModule } from '../../../@theme/theme.module'
import { ComponentsModule } from '../../../glaciar/components/components.module'

@NgModule({
  declarations: [
  	ConfigComponent, 
    InfoComponent, 
    UmbralComponent, 
    SetupComponent, 
    OutlierComponent, 
    DispersionComponent, 
    ConfigTabComponent,
    SwitchTextPipe,
  ],
  imports: [
    AgmCoreModule,
    ThemeModule,
    CommonModule,
    UiSwitchModule,
    ConfigRoutingModule,
    ReactiveFormsModule,
    ComponentsModule,
    NouisliderModule,
    NgbModule
  ],
  exports: [
    ConfigTabComponent
  ]
})
export class ConfigModule { }
