import { ExtraOptions, RouterModule, Routes } from '@angular/router'
import { NgModule } from '@angular/core'
import {
  NbAuthComponent,
  NbLoginComponent,
  NbLogoutComponent,
  NbRegisterComponent,
  NbRequestPasswordComponent,
  NbResetPasswordComponent,
} from '@nebular/auth'

const routes: Routes = [
  // { path: '',         redirectTo: 'glaciar', pathMatch: 'full' },
  // { path: '**',       redirectTo: 'glaciar' },
  { path: '',         loadChildren: 'app/glaciar/glaciar.module#GlaciarModule' },
  { path: 'glaciar',  loadChildren: 'app/glaciar/glaciar.module#GlaciarModule' },
  
  // { path: '',      redirectTo: 'pages', pathMatch: 'full' },
  // { path: '**',    redirectTo: 'pages' },
  { path: 'pages',    loadChildren: 'app/pages/pages.module#PagesModule' },
  { path: 'auth',     component: NbAuthComponent,
    children: [
      { path: '',                  component: NbLoginComponent,           },
      { path: 'login',             component: NbLoginComponent,           },
      { path: 'register',          component: NbRegisterComponent,        },
      { path: 'logout',            component: NbLogoutComponent,          },
      { path: 'request-password',  component: NbRequestPasswordComponent, },
      { path: 'reset-password',    component: NbResetPasswordComponent,   },
    ],
  },


]

const config: ExtraOptions = {
  useHash: true,
}

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
