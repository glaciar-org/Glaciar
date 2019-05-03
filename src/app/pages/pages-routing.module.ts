import { RouterModule, Routes } from '@angular/router'
import { NgModule } from '@angular/core'

import { PagesComponent } from './pages.component'
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component'
import { HomeComponent } from '../glaciar/front/home/home.component'
import { FaqComponent } from '../glaciar/front/faq/faq.component'
import { AboutComponent } from '../glaciar/front/about/about.component'
import { DataDashboardComponent } from '../glaciar/front/data-dashboard/data-dashboard.component'
import { ConfigComponent } from '../glaciar/front/config/config.component'
import { SetupComponent } from '../glaciar/front/config/setup/setup.component'
import { UmbralComponent } from '../glaciar/front/config/umbral/umbral.component'
import { Outlier } from '../glaciar/model/domainmodel'
import { OutlierComponent } from '../glaciar/front/config/outlier/outlier.component'
import { DebugComponent } from '../glaciar/components/util/debug/debug.component'
import { LabsComponent } from '../glaciar/front/labs/labs.component'
import { Amch4LaComponent } from '../glaciar/chartz-lab/amch4-la/amch4-la.component'
import { Amch4LbComponent } from '../glaciar/chartz-lab/amch4-lb/amch4-lb.component'
import { Amcharts4Component } from '../glaciar/chartz/amcharts4/amcharts4.component'

const routes: Routes = [{
  path: 'pages', component: PagesComponent,
  children: [
    // { path: 'glaciar',     loadChildren: '../glaciar/glaciar.module#GlaciarModule',  }, 
    { path: 'miscellaneous',  loadChildren: './miscellaneous/miscellaneous.module#MiscellaneousModule',}, 
    // { path: '',   redirectTo: 'dashboard', pathMatch: 'full', }, 
    { path: '**', component: NotFoundComponent, }
  ],
},


// { path:    'd/:dataset_id/q/:quality_id/p/:param_id',              component: DataDashboardComponent },
// { path: 'qz/d/:dataset_id/q/:quality_id/p/:param_id',              component: DataDashboardComponent },
// { path: 'qy/d/:dataset_id/q/:quality_id/p/:param_id',              component: DataDashboardComponent },
// { path: 'qx/d/:dataset_id/q/:quality_id/p/:param_id',              component: DataDashboardComponent },
// { path: 'qw/d/:dataset_id/q/:quality_id/p/:param_id',              component: DataDashboardComponent },
// { path: 'qv/d/:dataset_id/q/:quality_id/p/:param_id/x/:selector',  component: DataDashboardComponent },
  
// { path: 'lab/wip/f/configTab',    component: ConfigComponent },
// { path: 'lab/wip/f/setup',        component: SetupComponent },
// { path: 'lab/wip/f/umbral',       component: UmbralComponent },
// { path: 'lab/wip/f/valores',      component: OutlierComponent },

// { path: 'lab/wip/g/amch4/a',      component: Amch4LaComponent },
// { path: 'lab/wip/g/amch4/b',      component: Amch4LbComponent },
// { path: 'lab/wip/g/main/M',       component: Amcharts4Component },
// { path: 'lab/wip/w/icon-like',    component: DebugComponent },

// { path: 'lab/wip/info-environment',    component: LabsComponent },



]

export const Full_ROUTES: Routes = [

  // { path: 'full-layout', loadChildren: './pages/full-layout-page/full-pages.module#FullPagesModule'},
  { path: 'full-layout', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'faq',  component: FaqComponent },
  { path: 'about',  component: AboutComponent },

  { path:    'd/:dataset_id/q/:quality_id/p/:param_id',              component: DataDashboardComponent },
  { path: 'qz/d/:dataset_id/q/:quality_id/p/:param_id',              component: DataDashboardComponent },
  { path: 'qy/d/:dataset_id/q/:quality_id/p/:param_id',              component: DataDashboardComponent },
  { path: 'qx/d/:dataset_id/q/:quality_id/p/:param_id',              component: DataDashboardComponent },
  { path: 'qw/d/:dataset_id/q/:quality_id/p/:param_id',              component: DataDashboardComponent },
  { path: 'qv/d/:dataset_id/q/:quality_id/p/:param_id/x/:selector',  component: DataDashboardComponent },
    
  { path: 'lab/wip/f/configTab',    component: ConfigComponent },
  { path: 'lab/wip/f/setup',        component: SetupComponent },
  { path: 'lab/wip/f/umbral',       component: UmbralComponent },
  { path: 'lab/wip/f/valores',      component: OutlierComponent },

  { path: 'lab/wip/g/amch4/a',      component: Amch4LaComponent },
  { path: 'lab/wip/g/amch4/b',      component: Amch4LbComponent },
  { path: 'lab/wip/g/main/M',       component: Amcharts4Component },

  // { path: 'lab/wip/w/slider',       component: NouisliderComponent },
  // { path: 'lab/wip/w/toastr',       component: ToastrComponent },
  // { path: 'lab/wip/w/datepicker',   component: DatepickerComponent },
  { path: 'lab/wip/w/icon-like',    component: DebugComponent },

  { path: 'lab/wip/info-environment',    component: LabsComponent },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
