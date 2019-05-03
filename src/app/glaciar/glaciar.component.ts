import { Component, OnInit } from '@angular/core'

import { MENU_ITEMS } from './glaciar-menu'

// @Component({
//   selector: 'gcr-glaciar',
//   template: `
//     <router-outlet></router-outlet>
//   `,
// })
@Component({
  selector: 'gcr-glaciar',
  styleUrls: ['glaciar.component.scss'],
  template: `
    <ngx-sample-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-sample-layout>
  `,
})
export class GlaciarComponent implements OnInit {

  menu = MENU_ITEMS

  constructor() { }

  ngOnInit() {
  }

}
