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
