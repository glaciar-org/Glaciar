import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { InfoComponent } from './info/info.component'
import { SetupComponent } from './setup/setup.component'
import { UmbralComponent } from './umbral/umbral.component'
import { OutlierComponent } from './outlier/outlier.component'
import { ConfigComponent } from './config.component'
import { DispersionComponent } from './dispersion/dispersion.component'
import { ConfigTabComponent } from './config-tab/config-tab.component'
// const routes: Routes = []

const routes:Routes = [{  
  path: '',  component: ConfigComponent,
  children: [
    { path: 'configTab',   component: ConfigTabComponent },
    { path: 'info',        component: InfoComponent, },
    { path: 'setup',       component: SetupComponent, },
    { path: 'umbral',      component: UmbralComponent, },
    { path: 'outlier',     component: OutlierComponent, },
    { path: 'dispersion',  component: DispersionComponent, }
  ],
}]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfigRoutingModule { }
