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
import { NbMenuItem } from '@nebular/theme'
import * as Global from './model/global'

function item(title, icon, path): any { 
  return {
    title: title, icon: icon, link: path
  }
}

export const MENU_ITEMS: NbMenuItem[] = getMENU_ITEMS()

function getMENU_ITEMS():  NbMenuItem[] {

  let MENU_ITEMS:  NbMenuItem[] =  [

    { title: 'home',      icon: 'nb-home',           link: '/glaciar/home',  },
    { title: 'dashboard', icon: 'nb-keypad',
      children: [
  
        item('Buenos Aires',    'nb-chevron-right',  Global.getDatasetHome(Global.DS.DS01) ),
        item('Bahía Blanca',    'nb-chevron-right',  Global.getDatasetHome(Global.DS.DS02) ),
        item('Charles River',   'nb-chevron-right',  Global.getDatasetHome(Global.DS.DS03) ),
        item('BDHI',            'nb-chevron-right',  Global.getDatasetHome(Global.DS.DS04) ),
  
        { title: 'Emisiones de CO2',   icon: '',
          children: [
            item('Por País',    'nb-chevron-right',  Global.getDatasetHome(Global.DS.DS05a) ),
            item('Por Sector',  'nb-chevron-right',  Global.getDatasetHome(Global.DS.DS05b) ),
          ],
        },
      ],
    },
  
    { title: 'faq',       icon: 'nb-help',           link: '/glaciar/faq',   },
    { title: 'about',     icon: 'nb-loop',           link: '/glaciar/about', },
  ]

  let isOn = Global.isHost_Local() || Global.isHost_Dev()

  if (isOn) {
      MENU_ITEMS.unshift(itemWIP()  )  // al principio
      MENU_ITEMS.push   (itemLabs() )  // al final
  }

  return MENU_ITEMS
}


function itemWIP():  NbMenuItem {

  return { title: 'WIP', icon: 'nb-arrow-retweet',  
      children: [
        { title: 'datepicker',  icon: 'nb-arrow-dropright',     link: '/lab/wip/datepicker',   },
        { title: 'toastr',      icon: 'nb-arrow-dropright',     link: '/lab/wip/toastr',       },
      ],
    }
}

function itemLabs():  NbMenuItem {

  return { title: 'Labs',      icon: 'nb-lightbulb',
    children: [
      { title: 'Widget',    icon: 'nb-roller-shades',
        children: [
          { title: 'icons',       icon: 'nb-grid-b-outline',     link: '/glaciar/labs',         },
          { title: 'toastr',      icon: 'nb-audio',              link: '/lab/wip/toastr',       },
          { title: 'slider',      icon: 'nb-menu',               link: '/lab/wip/slider',       },
          { title: 'datepicker',  icon: 'nb-e-commerce',         link: '/lab/wip/datepicker',   },
          { title: 'debug',       icon: 'nb-rainy',              link: '/glaciar/debug',        },
        ],
      },
      {
        title: 'Front UI',  icon: 'nb-layout-default',
        children: [
          { title: 'tabs',          icon: 'nb-compose',          link: '/lab/wip/confgtab/d/DS01/q/AIRQ/p/CO',   },
          { title: '- Info',        icon: 'nb-list',             link: '/lab/wip/info/d/DS01/q/AIRQ/p/CO',       },
          { title: '- umbral',      icon: 'nb-shuffle',          link: '/lab/wip/umbral/d/DS01/q/AIRQ/p/CO',     },
          { title: '- outlier',     icon: 'nb-paper-plane',      link: '/lab/wip/outlier/d/DS01/q/AIRQ/p/CO',    },
          { title: '- setup',       icon: 'nb-arrow-retweet',    link: '/config/setup',                          },
          { title: '- dispersion',  icon: 'nb-loop-circled',     link: '/config/dispersion', },
        ],
      },
      {
        title: 'Charts',  icon: 'nb-bar-chart',
        children: [
          { title: 'DataDash',      icon: 'nb-arrow-right',      link: '/lab/wip/dashboard/d/DS01/q/AIRQ/p/CO',             },
          { title: '- DS01 (BA.)',  icon: 'nb-chevron-right',    link: '/lab/wip/amchart4/d/DS01/q/AIRQ/p/CO',              },
          { title: '- DS02 (BB.)',  icon: 'nb-chevron-right',    link: '/lab/wip/amchart4/d/DS02/q/AIRQ/p/CO',              },
          { title: '- DS03 (CH.)',  icon: 'nb-chevron-right',    link: '/lab/wip/amchart4/d/DS03/q/WATERQ/p/Temp',          },
          { title: '- DS04 (BDHI)', icon: 'nb-chevron-right',    link: '/lab/wip/amchart4/d/DS04/q/WATERQ/p/Temp',          },
          { title: '- DS05 (a)',    icon: 'nb-chevron-right',    link: '/lab/wip/amchart4/d/DS05/q/AIRQ/p/CO2/x/PAISES',    },
          { title: '- DS05 (b)',    icon: 'nb-chevron-right',    link: '/lab/wip/amchart4/d/DS05/q/AIRQ/p/CO2/x/SECTORES',  },
        ],
      },
      {
        title: 'Graph',  icon: 'nb-bar-chart',
        children: [
          { title: 'Graph [a]',     icon: 'nb-arrow-right',      link: '/glaciar/labs', },
          { title: 'Graph [b]',     icon: 'nb-arrow-right',      link: '/glaciar/labs', },
          { title: 'Graph [M]',     icon: 'nb-arrow-right',      link: '/glaciar/labs', },
        ],
      },
      { title: 'environment',       icon: 'nb-gear',             link: '/glaciar/labs', },
    ],
  }
}

