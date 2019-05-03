import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { GlaciarComponent } from './glaciar.component'
import { FaqComponent } from './front/faq/faq.component'
import { HomeComponent } from './front/home/home.component'
import { AboutComponent } from './front/about/about.component'
import { LabsComponent } from './front/labs/labs.component'
import { DataDashboardComponent } from './front/data-dashboard/data-dashboard.component'
import { DebugComponent } from './components/util/debug/debug.component'



// WIP
import { OutlierComponent } from './front/config/outlier/outlier.component'
import { ToastrComponent } from './components/extra/toastr/toastr.component'
import { NouisliderComponent } from './components/extra/nouislider/nouislider.component'
import { UmbralComponent } from './front/config/umbral/umbral.component'
import { InfoComponent } from './front/config/info/info.component'
import { ConfigTabComponent } from './front/config/config-tab/config-tab.component'
import { Amcharts4Component } from './chartz/amcharts4/amcharts4.component'
import { DatepickerComponent } from './components/extra/datepicker/datepicker.component'

//  #/page/glaciar/
//  #/page/glaciar/config
//  #/page/glaciar/config/info



// const routes: Routes = [{
//   path: '', component: PagesComponent,
//   children: [
//     // { path: 'glaciar',     loadChildren: '../glaciar/glaciar.module#GlaciarModule',  }, 
//     { path: 'miscellaneous',  loadChildren: './miscellaneous/miscellaneous.module#MiscellaneousModule',}, 
//     // { path: '',   redirectTo: 'dashboard', pathMatch: 'full', }, 
//     { path: '**', component: NotFoundComponent, }
//   ],
// },


const routes: Routes = [{
    path: '', component: GlaciarComponent,
    children: [
      { path: '',   component: HomeComponent,  },
    //  { path: '',   redirectTo: 'home', pathMatch: 'full', }, 
  // { path: 'glaciar',      loadChildren: './glaciar.module#GlaciarModule',  }, 
     { path: 'home',            component: HomeComponent,  },
     { path: 'dashboard',       component: DataDashboardComponent, },
 //  { path: 'data-dashboard',  component: DataDashboardComponent, },
     { path: 'faq',             component: FaqComponent,   },
     { path: 'about',           component: AboutComponent, },
     { path: 'debug',           component: DebugComponent, },
     { path: 'labs',            component: LabsComponent,  },
     { path: 'config',       loadChildren: './front/config/config.module#ConfigModule', },

     // #/qz/d/DS01/q/AIRQ/p/CO
     // #/qy/d/DS02/q/AIRQ/p/CO
     // #/qx/d/DS03/q/WATERQ/p/Temp
     // #/qw/d/DS04/q/WATERQ/p/Temp
     // #/qv/d/DS05/q/AIRQ/p/CO2/x/PAISES
     // #/qv/d/DS05/q/AIRQ/p/CO2/x/SECTORES

     { path:    'd/:dataset_id/q/:quality_id/p/:param_id',                           component: DataDashboardComponent },
     { path: 'qz/d/:dataset_id/q/:quality_id/p/:param_id',                           component: DataDashboardComponent },
     { path: 'qy/d/:dataset_id/q/:quality_id/p/:param_id',                           component: DataDashboardComponent },
     { path: 'qx/d/:dataset_id/q/:quality_id/p/:param_id',                           component: DataDashboardComponent },
     { path: 'qw/d/:dataset_id/q/:quality_id/p/:param_id',                           component: DataDashboardComponent },
     { path: 'qv/d/:dataset_id/q/:quality_id/p/:param_id/x/:selector',               component: DataDashboardComponent },

     { path: 'lab/wip/dashboard/d/:dataset_id/q/:quality_id/p/:param_id',            component: DataDashboardComponent },

     { path: 'lab/wip/amchart4/d/:dataset_id/q/:quality_id/p/:param_id',             component: Amcharts4Component     },
     { path: 'lab/wip/amchart4/d/:dataset_id/q/:quality_id/p/:param_id/x/:selector', component: Amcharts4Component     },

     { path: 'lab/wip/confgtab/d/:dataset_id/q/:quality_id/p/:param_id',             component: ConfigTabComponent     },
     { path: 'lab/wip/info/d/:dataset_id/q/:quality_id/p/:param_id',                 component: InfoComponent          },
     { path: 'lab/wip/umbral/d/:dataset_id/q/:quality_id/p/:param_id',               component: UmbralComponent        },
     { path: 'lab/wip/outlier/d/:dataset_id/q/:quality_id/p/:param_id',              component: OutlierComponent       },
     { path: 'lab/wip/toastr',                                                       component: ToastrComponent        },
     { path: 'lab/wip/slider',                                                       component: NouisliderComponent    },
     { path: 'lab/wip/datepicker',                                                   component: DatepickerComponent    },

    ],
}]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GlaciarRoutingModule { }

